import React from 'react';
import { MousePointer, Square, Circle, Type, Image as ImageIcon, LineChart, Hand, Eraser, Shapes } from 'lucide-react';

const tools = [
  { id: 'select', label: 'Select', icon: MousePointer },
  { id: 'pan', label: 'Pan', icon: Hand },
  { id: 'rect', label: 'Rect', icon: Square },
  { id: 'ellipse', label: 'Ellipse', icon: Circle },
  { id: 'line', label: 'Line', icon: LineChart },
  { id: 'text', label: 'Text', icon: Type },
  { id: 'image', label: 'Image', icon: ImageIcon },
  { id: 'erase', label: 'Erase', icon: Eraser },
  { id: 'shape', label: 'More', icon: Shapes },
];

export default function Toolbar({ activeTool, onChangeTool, onZoomIn, onZoomOut }) {
  return (
    <div className="flex items-center justify-between gap-3 rounded-xl border border-neutral-800 bg-neutral-950/70 p-2 text-neutral-200 backdrop-blur">
      <div className="flex items-center gap-1">
        {tools.map(({ id, label, icon: Icon }) => (
          <button
            key={id}
            onClick={() => onChangeTool(id)}
            className={`group inline-flex items-center gap-2 rounded-md px-2.5 py-2 text-sm transition ${
              activeTool === id
                ? 'bg-emerald-500 text-black'
                : 'hover:bg-white/10 hover:text-white'
            }`}
            title={label}
          >
            <Icon className="h-4 w-4" />
            <span className="hidden sm:block">{label}</span>
          </button>
        ))}
      </div>
      <div className="flex items-center gap-2">
        <button onClick={onZoomOut} className="rounded-md border border-white/10 px-2 py-1 hover:bg-white/10">-</button>
        <button onClick={onZoomIn} className="rounded-md border border-white/10 px-2 py-1 hover:bg-white/10">+</button>
      </div>
    </div>
  );
}
