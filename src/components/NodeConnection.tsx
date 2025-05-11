'use client';

import { useState, useRef, useEffect } from 'react';

interface NodeConnectionProps {
  nodeContent: {
    title: string;
    paragraphs: string[];
  };
  options: string[];
}

export default function NodeConnection({ nodeContent, options }: NodeConnectionProps) {
  const [selectedOption, setSelectedOption] = useState<string | null>(null);
  const [lineCoords, setLineCoords] = useState<{ startX: number; startY: number; endX: number; endY: number } | null>(null);
  const nodeRef = useRef<HTMLDivElement>(null);
  const optionsRef = useRef<HTMLDivElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);

  const updateLineCoords = () => {
    if (!selectedOption || !nodeRef.current || !optionsRef.current || !containerRef.current) return;

    const containerRect = containerRef.current.getBoundingClientRect();
    const nodeRect = nodeRef.current.getBoundingClientRect();
    const selectedOptionElement = optionsRef.current.querySelector(`[data-option="${selectedOption}"]`);
    if (!selectedOptionElement) return;

    const optionRect = selectedOptionElement.getBoundingClientRect();
    setLineCoords({
      startX: nodeRect.left + nodeRect.width / 2 - containerRect.left,
      startY: nodeRect.bottom - containerRect.top,
      endX: optionRect.left + optionRect.width / 2 - containerRect.left,
      endY: optionRect.top - containerRect.top,
    });
  };

  useEffect(() => {
    updateLineCoords();
    
    const handleResize = () => updateLineCoords();
    const handleScroll = () => updateLineCoords();

    window.addEventListener('resize', handleResize);
    if (optionsRef.current) {
      optionsRef.current.addEventListener('scroll', handleScroll);
    }

    return () => {
      window.removeEventListener('resize', handleResize);
      if (optionsRef.current) {
        optionsRef.current.removeEventListener('scroll', handleScroll);
      }
    };
  }, [selectedOption]);

  return (
    <div ref={containerRef} className="relative z-10 mb-6">
      <div className="grid grid-cols-1 gap-6">
        {/* Node */}
        <div ref={nodeRef} className="p-6 border-1 border-neutral-600 bg-black/30">
          <h2 className="text-white text-xl font-semibold mb-4">{nodeContent.title}</h2>
          {nodeContent.paragraphs.map((paragraph, index) => (
            <p key={index} className="text-gray-400">{paragraph}</p>
          ))}
        </div>

        {/* Connection Line */}
        {lineCoords && (
          <svg className="absolute pointer-events-none" style={{ top: 0, left: 0, width: '100%', height: '100%', zIndex: 5 }}>
            <path
              d={`M ${lineCoords.startX} ${lineCoords.startY} 
                  C ${lineCoords.startX} ${lineCoords.startY + (lineCoords.endY - lineCoords.startY) / 2},
                    ${lineCoords.endX} ${lineCoords.startY + (lineCoords.endY - lineCoords.startY) / 2},
                    ${lineCoords.endX} ${lineCoords.endY}`}
              stroke="#525252"
              strokeWidth="1"
              fill="none"
            />
          </svg>
        )}

        {/* Options */}
        <div ref={optionsRef} className="flex justify-start md:justify-center gap-4 overflow-x-auto scrollbar-hide whitespace-nowrap">
          {options.map((option) => (
            <div
              key={option}
              data-option={option}
              onClick={() => setSelectedOption(option)}
              className="p-6 rounded-full border-1 border-neutral-600 bg-black flex-shrink-0 cursor-pointer"
            >
              <span className="text-white text-lg">{option}</span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
} 