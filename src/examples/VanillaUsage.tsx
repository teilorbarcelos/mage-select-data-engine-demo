import { useState } from 'react';
import { createMageSelectEngine } from 'mage-select-data-engine';
import { VanillaMageSelect } from '../components/VanillaMageSelect';
import { engineConfig, memoryOptimizedConfig } from '../mock/users';
import type { User } from '../mock/users';

export function VanillaCreateForm() {
  const [selection, setSelection] = useState<string[]>([]);

  const handleManualSubmit = () => {
    alert('🚀 Vanilla Create Success!\n\nManual state capture:\n' + JSON.stringify(selection, null, 2));
  };

  return (
    <div className="form-card vanilla">
      <div className="form-header">
        <h2>Vanilla Create</h2>
        <span className="badge warning">No Form Manager</span>
      </div>
      <p style={{ fontSize: 13, opacity: 0.8, marginBottom: 16 }}>
        Using <code>useMageSelect</code> directly for full control.
      </p>
      <div className="form-group" style={{ marginBottom: 20 }}>
        <label>Select Participants</label>
        <VanillaMageSelect
          engineConfig={engineConfig}
          multiple={true}
          onSelectionChange={setSelection}
          placeholder="Directly using engine..."
          renderItem={(u: User) => (
            <div>
              <div style={{ color: '#fff' }}>{u.name}</div>
              <div style={{ fontSize: 12, opacity: 0.7 }}>{u.email}</div>
            </div>
          )}
          renderSelection={(items: User[]) => items.map(i => i.name).join(', ')}
        />
      </div>
      <button type="button" className="btn-submit" onClick={handleManualSubmit}>Log Current State</button>
    </div>
  );
}

export function VanillaEditForm({ initialIds }: { initialIds: string[] }) {
  const [engine] = useState(() => createMageSelectEngine({
    ...engineConfig,
    initialSelectedIds: initialIds
  }));

  const handleManualUpdate = () => {
    const selectedIds = engine.getState().selectedItems.map(i => engine.getId(i));
    alert('🔄 Vanilla Edit Success!\n\nCaptured IDs from engine:\n' + JSON.stringify(selectedIds, null, 2));
  };

  return (
    <div className="form-card vanilla">
      <div className="form-header">
        <h2>Vanilla Edit</h2>
        <span className="badge warning">Direct Hydration</span>
      </div>
      <p style={{ fontSize: 13, opacity: 0.8, marginBottom: 16 }}>
        Engine hydration via manual <code>engine.setValue()</code>.
      </p>
      <div className="form-group" style={{ marginBottom: 20 }}>
        <label>Selected Members</label>
        <VanillaMageSelect
          engine={engine}
          engineConfig={engineConfig}
          placeholder="Hydrating manually..."
          renderItem={(u: User) => (
            <div>
              <div style={{ color: '#fff' }}>{u.name}</div>
              <div style={{ fontSize: 12, opacity: 0.7 }}>{u.email}</div>
            </div>
          )}
          renderSelection={(items: User[]) => items.map(i => i.name).join(', ')}
        />
      </div>
      <button type="button" className="btn-submit" onClick={handleManualUpdate}>Capture Engine Data</button>
    </div>
  );
}

export function MemoryOptimizedVanillaForm() {
  const [selection, setSelection] = useState<string[]>([]);

  return (
    <div className="form-card vanilla memory-optimized">
      <div className="form-header">
        <h2>Bi-Directional Vanilla</h2>
        <span className="badge info">Direct Engine</span>
      </div>
      <p style={{ fontSize: 13, opacity: 0.8, marginBottom: 16 }}>
        Using <code>VanillaMageSelect</code> with memory optimization.
      </p>
      <div className="form-group" style={{ marginBottom: 20 }}>
        <label>Select Participants</label>
        <VanillaMageSelect
          engineConfig={memoryOptimizedConfig}
          multiple={true}
          onSelectionChange={setSelection}
          placeholder="Scroll and select..."
          renderItem={(u: User) => (
            <div>
              <div style={{ color: '#fff' }}>{u.name}</div>
              <div style={{ fontSize: 12, opacity: 0.7 }}>{u.email}</div>
            </div>
          )}
          renderSelection={(items: User[]) => items.map(i => i.name).join(', ')}
        />
      </div>
      <button type="button" className="btn-submit" onClick={() => alert(JSON.stringify(selection))}>Log Selection</button>
    </div>
  );
}
