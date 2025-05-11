'use client';

import { useState, useRef, useEffect } from 'react';

export default function Home() {
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
    <div className="min-h-screen bg-black relative">
      {/* Background pattern */}
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,_rgba(255,255,255,0.1)_1.5px,_transparent_1.5px)] bg-[length:15px_15px]"></div>

      {/* Content */}
      <div ref={containerRef} className="relative z-10 container mx-auto px-4 py-12">
        <div className="grid grid-cols-1 gap-6">
          {/* Node */}
          <div ref={nodeRef} className="p-6 border-1 border-neutral-600 bg-black/30">
            <h2 className="text-white text-xl font-semibold mb-4">Box 1</h2>
            <p className="text-gray-400">Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.</p>
            <p className="text-gray-400">Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur.</p>
            <p className="text-gray-400">Nam libero tempore, cum soluta nobis est eligendi optio cumque nihil impedit quo minus id quod maxime placeat.</p>
            <p className="text-gray-400">Temporibus autem quibusdam et aut officiis debitis aut rerum necessitatibus saepe eveniet ut et voluptates.</p>
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
            {['Remember', 'Pay', 'Buy', 'What is this?'].map((option) => (
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
    </div>
  );
}
