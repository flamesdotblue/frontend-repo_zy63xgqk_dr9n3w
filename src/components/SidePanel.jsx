import React from 'react';

export default function SidePanel({ objects, selectedId, onSelect, onPatch }) {
  const selected = objects.find((o) => o.id === selectedId);

  return (
    <aside className="flex h-[70vh] w-full flex-col gap-3 rounded-xl border border-neutral-800 bg-neutral-950 p-3 text-neutral-200">
      <div className="flex items-center justify-between">
        <h3 className="text-sm font-semibold text-white">Layers</h3>
      </div>
      <div className="flex-1 space-y-1 overflow-auto">
        {objects.map((o, idx) => (
          <button
            key={o.id}
            onClick={() => onSelect(o.id)}
            className={`flex w-full items-center justify-between rounded-md px-2 py-1 text-left text-sm transition ${
              selectedId === o.id ? 'bg-emerald-500/10 text-emerald-300' : 'hover:bg-white/5'
            }`}
          >
            <span className="truncate">{o.meta.name || o.type} #{idx + 1}</span>
            <span className="text-xs text-white/40">z{o.properties.zIndex}</span>
          </button>
        ))}
      </div>

      <div className="mt-3 border-t border-white/10 pt-3">
        <h3 className="mb-2 text-sm font-semibold text-white">Properties</h3>
        {selected ? (
          <div className="grid grid-cols-2 gap-2 text-sm">
            <LabeledInput label="X" value={Math.round(selected.properties.x)} onChange={(v) => onPatch(selected.id, { x: parseFloat(v) || 0 })} />
            <LabeledInput label="Y" value={Math.round(selected.properties.y)} onChange={(v) => onPatch(selected.id, { y: parseFloat(v) || 0 })} />
            <LabeledInput label="W" value={Math.round(selected.properties.width)} onChange={(v) => onPatch(selected.id, { width: Math.max(1, parseFloat(v) || 0) })} />
            <LabeledInput label="H" value={Math.round(selected.properties.height)} onChange={(v) => onPatch(selected.id, { height: Math.max(1, parseFloat(v) || 0) })} />
            <LabeledInput label="Rotate" value={selected.properties.rotation} onChange={(v) => onPatch(selected.id, { rotation: parseFloat(v) || 0 })} />
            <LabeledInput label="Opacity" value={selected.properties.opacity} onChange={(v) => onPatch(selected.id, { opacity: Math.max(0, Math.min(1, parseFloat(v) || 0)) })} />
            <LabeledInput label="Fill" type="color" value={selected.properties.fill} onChange={(v) => onPatch(selected.id, { fill: v })} />
            <LabeledInput label="Stroke" type="color" value={selected.properties.stroke} onChange={(v) => onPatch(selected.id, { stroke: v })} />
          </div>
        ) : (
          <p className="text-sm text-white/50">Select a layer to edit its properties.</p>
        )}
      </div>
    </aside>
  );
}

function LabeledInput({ label, type = 'number', value, onChange }) {
  return (
    <label className="flex items-center justify-between gap-2 rounded-md border border-white/10 bg-black/40 px-2 py-1">
      <span className="text-xs text-white/60">{label}</span>
      <input
        className="w-24 rounded bg-transparent text-right text-white outline-none [appearance:textfield] [&::-webkit-outer-spin-button]:appearance-none [&::-webkit-inner-spin-button]:appearance-none"
        type={type}
        value={value}
        onChange={(e) => onChange(e.target.value)}
        step={type === 'number' ? '1' : undefined}
      />
    </label>
  );
}
