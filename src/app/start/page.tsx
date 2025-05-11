'use client';

import NodeConnection from '@/components/NodeConnection';

export default function Home() {
  const nodeContent = [{
    title: "Box 1",
    paragraphs: [
      "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.",
      "Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur.",
      "Nam libero tempore, cum soluta nobis est eligendi optio cumque nihil impedit quo minus id quod maxime placeat.",
      "Temporibus autem quibusdam et aut officiis debitis aut rerum necessitatibus saepe eveniet ut et voluptates."
    ],
    options: ['Remember', 'Pay', 'Buy', 'What is this?']
  }, {
    title: "Box 2",
    paragraphs: [
      "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.",
      "Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur.",
    ],
    options: ['Remember', 'Pay', 'Buy', 'What is this?']
  }];

  return (
    <div className="min-h-screen bg-black relative">
      {/* Background pattern */}
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,_rgba(255,255,255,0.1)_1.5px,_transparent_1.5px)] bg-[length:15px_15px]"></div>

      {/* Content */}
      <div className="container mx-auto px-4 py-12">
        <NodeConnection nodeContent={nodeContent[0]} options={nodeContent[0].options} />
        <NodeConnection nodeContent={nodeContent[1]} options={nodeContent[1].options} />
      </div>
    </div>
  );
}
