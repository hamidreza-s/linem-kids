'use client';

import React, { useCallback, useMemo } from 'react';
import ReactFlow, {
  Background,
  useNodesState,
  BackgroundVariant,
  NodeProps,
  Node,
} from 'reactflow';
import { Camera, Dices } from 'lucide-react';
import 'reactflow/dist/style.css';

type CircleNodeData = {
  label: React.ReactNode;
  onClick?: () => void;
};

type SquareNodeData = {
  content: React.ReactNode;
};

type CustomNodeData = CircleNodeData | SquareNodeData;

const CircleNode = ({ data, id }: NodeProps<CircleNodeData>) => {
  const [isHovered, setIsHovered] = React.useState(false);

  return (
    <div
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      style={{
        width: 40,
        height: 40,
        borderRadius: '50%',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: '#fff',
        border: '1.5px solid #1a192b',
        color: '#1a192b',
        cursor: 'pointer',
        transition: 'all 0.2s ease',
        transform: isHovered ? 'scale(1.1)' : 'scale(1)',
        boxShadow: isHovered ? '0 4px 8px rgba(0,0,0,0.1)' : 'none',
        zIndex: 1000,
      }}
    >
      {data.label}
    </div>
  );
};

const SquareNode = ({ data }: NodeProps<SquareNodeData>) => {
  return (
    <div
      style={{
        width: 200,
        minHeight: 100,
        padding: '12px',
        backgroundColor: '#fff',
        border: '1.5px solid #1a192b',
        borderRadius: '8px',
        boxShadow: '0 2px 4px rgba(0,0,0,0.1)',
      }}
    >
      {data.content}
    </div>
  );
};

const nodeTypes = {
  circle: CircleNode,
  square: SquareNode,
};

const initialNodes: Node<CustomNodeData>[] = [
  {
    id: '1',
    type: 'circle',
    data: { 
      label: <Dices strokeWidth={1.5} size={28} />
    },
    position: { x: 0, y: 0 },
    connectable: false,
    draggable: false
  },
  {
    id: '2',
    type: 'circle',
    data: { 
      label: <Camera strokeWidth={1.5} size={28} />
    },
    position: { x: 50, y: 0 },
    connectable: false,
    draggable: false
  },
  {
    id: '3',
    type: 'square',
    data: {
      content: (
        <div style={{ color: '#1a192b' }}>
          <h3 style={{ margin: '0 0 8px 0', fontSize: '16px' }}>Custom Content</h3>
          <p style={{ margin: 0, fontSize: '14px' }}>
            This is a square node that can contain any HTML/CSS content.
          </p>
          <div style={{ 
            marginTop: '12px',
            padding: '8px',
            backgroundColor: '#f5f5f5',
            borderRadius: '4px',
            fontSize: '12px'
          }}>
            You can add buttons, forms, or any other components here.
          </div>
        </div>
      )
    },
    position: { x: 0, y: 50 },
    connectable: false,
    draggable: false
  }
];

export default function Flow() {
  const [nodes, setNodes, onNodesChange] = useNodesState(initialNodes);
  const memoizedNodeTypes = useMemo(() => nodeTypes, []);

  const onNodeClick = useCallback((event: React.MouseEvent, node: Node) => {
    console.log('Node clicked:', node.id);
  }, []);

  return (
    <div style={{ width: '100vw', height: '100vh' }}>
      <ReactFlow
        nodes={nodes}
        onNodesChange={onNodesChange}
        onNodeClick={onNodeClick}
        nodeTypes={memoizedNodeTypes}
        fitView
        panOnDrag={false}
        zoomOnScroll={false}
        connectOnClick={false}
        nodesDraggable={false}
        edgesUpdatable={false}
        nodesConnectable={false}
        elementsSelectable={false}
      >
        <Background variant={BackgroundVariant.Lines} gap={12} size={1} />
      </ReactFlow>
    </div>
  );
} 