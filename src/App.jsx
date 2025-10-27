import React, { useMemo, useState } from 'react';
import HeroCover from './components/HeroCover';
import Toolbar from './components/Toolbar';
import CanvasStage, { createRect, createEllipse } from './components/CanvasStage';
import SidePanel from './components/SidePanel';

export default function App() {
  const [activeTool, setActiveTool] = useState('select');
  const [zoom, setZoom] = useState(1);
  const [objects, setObjects] = useState([]);
  const [selectedId, setSelectedId] = useState(null);

  const selected = useMemo(() => objects.find((o) => o.id === selectedId) || null, [objects, selectedId]);

  const handleAddObject = (obj) => {
    setObjects((prev) => [...prev, obj]);
  };

  const handleUpdateObject = (id, patch) => {
    setObjects((prev) =>
      prev.map((o) => (o.id === id ? { ...o, properties: { ...o.properties, ...patch } } : o))
    );
  };

  const handleSelect = (id) => {
    setSelectedId(id);
  };

  const addByTool = () => {
    if (activeTool === 'rect') handleAddObject(createRect({ x: 200 + Math.random() * 120, y: 140 + Math.random() * 120 }));
    if (activeTool === 'ellipse') handleAddObject(createEllipse({ x: 220 + Math.random() * 120, y: 120 + Math.random() * 120 }));
  };

  return (
    <div className="min-h-screen w-full bg-black text-white">
      <HeroCover />

      <main className="mx-auto mt-8 max-w-6xl px-6" id="overview">
        <section className="mb-4 flex items-start justify-between gap-4">
          <Toolbar
            activeTool={activeTool}
            onChangeTool={(t) => {
              setActiveTool(t);
              if (t === 'rect' || t === 'ellipse') addByTool();
            }}
            onZoomIn={() => setZoom((z) => Math.min(2, parseFloat((z + 0.1).toFixed(2))))}
            onZoomOut={() => setZoom((z) => Math.max(0.2, parseFloat((z - 0.1).toFixed(2))))}
          />
          <div className="text-sm text-white/60">Zoom: {(zoom * 100).toFixed(0)}%</div>
        </section>

        <section className="grid grid-cols-1 gap-4 md:grid-cols-[1fr_320px]">
          <CanvasStage
            activeTool={activeTool}
            zoom={zoom}
            objects={objects}
            selectedId={selectedId}
            onSelect={handleSelect}
            onUpdateObject={handleUpdateObject}
            onAddObject={handleAddObject}
          />
          <SidePanel
            objects={objects}
            selectedId={selectedId}
            onSelect={handleSelect}
            onPatch={(id, patch) => handleUpdateObject(id, patch)}
          />
        </section>

        <section className="mt-8 grid grid-cols-1 gap-4 rounded-xl border border-neutral-800 bg-neutral-950 p-6 md:grid-cols-3">
          <InfoCard title="Command Pattern" desc="Encapsulated actions enable reliable undo/redo and history replay." />
          <InfoCard title="Singleton Engine" desc="Single canvas context and socket keep state consistent." />
          <InfoCard title="Repository Layer" desc="Storage abstracted from logic for easy persistence swaps." />
        </section>
      </main>

      <footer className="mx-auto mt-12 max-w-6xl px-6 py-10 text-center text-sm text-white/50">
        Built with React, Tailwind, and a Spline-powered hero. This is a visual preview of the collaborative canvas editor architecture.
      </footer>
    </div>
  );
}

function InfoCard({ title, desc }) {
  return (
    <div className="rounded-lg border border-white/10 bg-black/40 p-4">
      <h4 className="text-base font-semibold text-white">{title}</h4>
      <p className="mt-1 text-sm text-white/70">{desc}</p>
    </div>
  );
}
