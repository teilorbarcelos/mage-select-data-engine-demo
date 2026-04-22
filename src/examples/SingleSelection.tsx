import { useForm } from 'react-hook-form';
import { MageSelect } from '../components/MageSelect';
import { engineConfig, memoryOptimizedConfig } from '../mock/users';
import type { User } from '../mock/users';

interface SimpleFormValues {
  user: User | string | null;
}

export function SimpleCreateForm() {
  const { control, handleSubmit } = useForm<SimpleFormValues>({
    defaultValues: { user: null },
    mode: 'all',
  });

  const onSubmit = (data: SimpleFormValues) => {
    alert('✅ Simple Create Success!\n\nPayload sent to React Hook Form:\n' + JSON.stringify(data, null, 2));
  };

  return (
    <div className="form-card">
      <div className="form-header">
        <h2>Simple Create</h2>
        <span className="badge">Single Mode</span>
      </div>
      <p style={{ fontSize: 13, opacity: 0.8, marginBottom: 16 }}>
        Single selection implementation with <code>multiple={"{false}"}</code>.
      </p>
      <form onSubmit={handleSubmit(onSubmit)}>
        <div className="form-group">
          <label>Select Manager *</label>
          <MageSelect
            name="user"
            control={control}
            multiple={false}
            rules={{ required: 'Choosing a manager is required' }}
            engineOrConfig={engineConfig}
            placeholder="Select a manager..."
            renderItem={(u: User) => (
              <div>
                <div style={{ color: '#fff' }}>{u.name}</div>
                <div style={{ fontSize: 12, opacity: 0.7 }}>{u.email}</div>
              </div>
            )}
            renderSelection={(items: User[]) => items[0]?.name || ''}
          />
        </div>
        <button className="btn-submit" type="submit">Hire Manager</button>
      </form>
    </div>
  );
}

export function SimpleEditForm({ initialId }: { initialId: string }) {
  const { control, handleSubmit } = useForm<SimpleFormValues>({
    defaultValues: { user: initialId },
    mode: 'all',
  });

  const onSubmit = (data: SimpleFormValues) => {
    alert('✅ Simple Edit Success!\n\nPayload sent to React Hook Form:\n' + JSON.stringify(data, null, 2));
  };

  return (
    <div className="form-card">
      <div className="form-header">
        <h2>Simple Edit</h2>
        <span className="badge">Hydration Mode</span>
      </div>
      <p style={{ fontSize: 13, opacity: 0.8, marginBottom: 16 }}>
        Automatic hydration for a single ID selection.
      </p>
      <form onSubmit={handleSubmit(onSubmit)}>
        <div className="form-group">
          <label>Assign to Team</label>
          <MageSelect
            name="user"
            control={control}
            multiple={false}
            engineOrConfig={engineConfig}
            placeholder="Select a user..."
            renderItem={(u: User) => (
              <div>
                <div style={{ color: '#fff' }}>{u.name}</div>
                <div style={{ fontSize: 12, opacity: 0.7 }}>{u.email}</div>
              </div>
            )}
            renderSelection={(items: User[]) => items[0]?.name || ''}
          />
        </div>
        <button className="btn-submit" type="submit">Update Team</button>
      </form>
    </div>
  );
}

export function MemoryOptimizedSingleForm() {
  const { control, handleSubmit } = useForm<SimpleFormValues>({
    defaultValues: { user: null },
  });

  const onSubmit = (data: SimpleFormValues) => {
    alert('✅ Memory Optimized Single Success!\n' + JSON.stringify(data, null, 2));
  };

  return (
    <div className="form-card memory-optimized">
      <div className="form-header">
        <h2>Bi-Directional Single</h2>
        <span className="badge info">Memory Optimized</span>
      </div>
      <p style={{ fontSize: 13, opacity: 0.8, marginBottom: 16 }}>
        Memory management enabled for single selection mode.
      </p>
      <form onSubmit={handleSubmit(onSubmit)}>
        <div className="form-group">
          <label>Select User</label>
          <MageSelect
            name="user"
            control={control}
            multiple={false}
            engineOrConfig={memoryOptimizedConfig}
            placeholder="Search users..."
            renderItem={(u: User) => (
              <div>
                <div style={{ color: '#fff' }}>{u.name}</div>
                <div style={{ fontSize: 12, opacity: 0.7 }}>{u.email}</div>
              </div>
            )}
            renderSelection={(items: User[]) => items[0]?.name || ''}
          />
        </div>
        <button className="btn-submit" type="submit">Submit Form</button>
      </form>
    </div>
  );
}
