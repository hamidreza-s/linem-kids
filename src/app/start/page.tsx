'use client';

import { useState } from 'react';
import NodeConnection from '@/components/NodeConnection';

interface NodeContent {
  title: string;
  paragraphs: string[];
  options: string[];
}

interface TreeNode {
  content: NodeContent;
  children: { [key: string]: TreeNode };
}

export default function Home() {
  const [tree, setTree] = useState<TreeNode>({
    content: {
      title: "Box 1",
      paragraphs: [
        "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.",
        "Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur.",
        "Nam libero tempore, cum soluta nobis est eligendi optio cumque nihil impedit quo minus id quod maxime placeat.",
        "Temporibus autem quibusdam et aut officiis debitis aut rerum necessitatibus saepe eveniet ut et voluptates."
      ],
      options: ['Remember', 'Pay', 'Buy', 'What is this?']
    },
    children: {}
  });

  const handleOptionSelect = (option: string, parentNode: NodeContent, parentPath: string[] = []) => {
    setTree(prevTree => {
      const newTree = { ...prevTree };
      let current = newTree;
      
      // Navigate to the correct node in the tree
      for (const path of parentPath) {
        current = current.children[path];
      }

      // Create a new child node
      current.children[option] = {
        content: {
          title: `Box ${parentPath.length + 2}`,
          paragraphs: [
            "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.",
            "Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur.",
          ],
          options: ['Remember', 'Pay', 'Buy', 'What is this?']
        },
        children: {}
      };

      return newTree;
    });
  };

  const renderNode = (node: TreeNode, parentPath: string[] = []) => {
    const hasChildren = Object.keys(node.children).length > 0;

    return (
      <div key={parentPath.join('-')} className="flex flex-col">
        <NodeConnection
          nodeContent={node.content}
          onOptionSelect={(option) => handleOptionSelect(option, node.content, parentPath)}
          isChild={parentPath.length > 0}
        />
        {hasChildren && (
          <div className="overflow-x-auto scrollbar-hide">
            <div className="flex flex-row gap-8 mt-4 min-w-max">
              {Object.entries(node.children).map(([option, childNode]) => (
                <div key={option}>
                  {renderNode(childNode, [...parentPath, option])}
                </div>
              ))}
            </div>
          </div>
        )}
      </div>
    );
  };

  return (
    <div className="min-h-screen bg-black relative">
      {/* Background pattern */}
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,_rgba(255,255,255,0.1)_1.5px,_transparent_1.5px)] bg-[length:15px_15px]"></div>

      {/* Content */}
      <div className="container mx-auto px-4 py-12">
        {renderNode(tree)}
      </div>
    </div>
  );
}
