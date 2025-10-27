import React, { useEffect, useRef, useState } from 'react';

// Simple object factories for demo preview
const createRect = (overrides = {}) => ({
  id: crypto.randomUUID(),
  type: 'rect',
  properties: {
    x: 120,
    y: 120,
    width: 140,
    height: 90,
    rotation: 0,
    fill: '#10b981',
    stroke: '#0ea5e9',
    strokeWidth: 2,
    opacity: 1,
    zIndex: 1,
    ...overrides,
  },
  meta: {
    name: 'Rectangle',
    locked: false,
    hidden: false,
    createdBy: 'local',
    createdAt: new Date().toISOString(),
  },
});

const createEllipse = (overrides = {}) => ({
  id: crypto.randomUUID(),
  type: 'ellipse',
  properties: {
    x: 360,
    y: 200,
    width: 120,
    height: 120,
    rotation: 0,
    fill: '#334155',
    stroke: '#64748b',
    strokeWidth: 2,
    opacity: 1,
    zIndex: 2,
    ...overrides,
  },
  meta: {
    name: 'Ellipse',
    locked: false,
    hidden: false,
    createdBy: 'local',
    createdAt: new Date().toISOString(),
  },
});

export { createRect, createEllipse };

export default function CanvasStage({ activeTool, zoom, objects, onSelect, selectedId, onUpdateObject, onAddObject }) {
  const containerRef = useRef(null);
  const [isPanning, setIsPanning] = useState(false);
  const [pan, setPan] = useState({ x: 0, y: 0 });
  const [drag, setDrag] = useState(null); // {id, offsetX, offsetY}

  // Create demo objects on mount
  useEffect(() => {
    if (!objects || objects.length === 0) {
      onAddObject(createRect({ x: 140, y: 160 }));
      onAddObject(createEllipse({ x: 360, y: 240 }));
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const handlePointerDown = (e) => {
    const target = e.target.closest('[data-obj-id]');
    const stage = containerRef.current;

    if (activeTool === 'pan') {
      setIsPanning(true);
      stage.style.cursor = 'grabbing';
      return;
    }

    if (target) {
      const id = target.getAttribute('data-obj-id');
      const rect = target.getBoundingClientRect();
      const offsetX = (e.clientX - rect.left) / zoom;
      const offsetY = (e.clientY - rect.top) / zoom;
      setDrag({ id, offsetX, offsetY });
      onSelect(id);
    } else {
      onSelect(null);
    }
  };

  const handlePointerMove = (e) => {
    const stage = containerRef.current;
    if (isPanning) {
      setPan((p) => ({ x: p.x + e.movementX, y: p.y + e.movementY }));
      return;
    }
    if (drag) {
      const board = stage.getBoundingClientRect();
      const x = (e.clientX - board.left) / zoom - drag.offsetX;
      const y = (e.clientY - board.top) / zoom - drag.offsetY;
      onUpdateObject(drag.id, { x: Math.max(0, x), y: Math.max(0, y) });
    }
  };

  const handlePointerUp = () => {
    setIsPanning(false);
    setDrag(null);
    if (containerRef.current) containerRef.current.style.cursor = 'default';
  };

  // Render helpers
  const renderObject = (obj) => {
    if (obj.meta.hidden) return null;
    const { id, type, properties } = obj;
    const isSelected = id === selectedId;
    const common = {
      transform: `translate(${properties.x}px, ${properties.y}px) rotate(${properties.rotation}deg)`,
      opacity: properties.opacity,
      border: `${properties.strokeWidth}px solid ${properties.stroke}`,
      boxShadow: isSelected ? '0 0 0 2px rgba(16,185,129,0.7)' : 'none',
    };

    if (type === 'rect') {
      return (
        <div
          key={id}
          data-obj-id={id}
          className="absolute"
          style={{ ...common, width: properties.width, height: properties.height, background: properties.fill, borderRadius: 8 }}
        />
      );
    }
    if (type === 'ellipse') {
      return (
        <div
          key={id}
          data-obj-id={id}
          className="absolute"
          style={{ ...common, width: properties.width, height: properties.height, background: properties.fill, borderRadius: '9999px' }}
        />
      );
    }
    return null;
  };

  return (
    <div
      id="editor"
      ref={containerRef}
      className="relative h-[70vh] w-full select-none overflow-hidden rounded-xl border border-neutral-800 bg-neutral-950"
      onMouseDown={handlePointerDown}
      onMouseMove={handlePointerMove}
      onMouseUp={handlePointerUp}
      onMouseLeave={handlePointerUp}
    >
      {/* Grid background */}
      <div
        className="absolute inset-0"
        style={{
          backgroundImage:
            'linear-gradient(to right, rgba(255,255,255,0.06) 1px, transparent 1px), linear-gradient(to bottom, rgba(255,255,255,0.06) 1px, transparent 1px)',
          backgroundSize: '24px 24px',
          transform: `translate(${pan.x}px, ${pan.y}px)`,
        }}
      />

      {/* Content layer with zoom & pan */}
      <div
        className="absolute left-0 top-0 origin-top-left"
        style={{ transform: `translate(${pan.x}px, ${pan.y}px) scale(${zoom})` }}
      >
        {objects.sort((a, b) => a.properties.zIndex - b.properties.zIndex).map(renderObject)}
      </div>

      {/* Hint */}
      <div className="pointer-events-none absolute bottom-3 left-3 rounded-md bg-black/50 px-2 py-1 text-xs text-white">
        {activeTool === 'pan' ? 'Drag to pan' : 'Drag shapes to move • Click empty space to deselect'}
      </div>
    </div>
  );
}
