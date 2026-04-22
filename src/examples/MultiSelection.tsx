import { useForm } from 'react-hook-form';
import { MageSelect } from '../components/MageSelect';
import { engineConfig, memoryOptimizedConfig } from '../mock/users';
import type { User } from '../mock/users';

interface FormValues {
  users: User[] | string[];
}

export function CreateForm() {
  const { control, handleSubmit } = useForm<FormValues>({
    defaultValues: { users: [] },
    mode: 'all',
  });

  const onSubmit = (data: FormValues) => {
    alert('✅ Create Success!\n\nPayload sent to React Hook Form:\n' + JSON.stringify(data, null, 2));
  };

  return (
    <div className="form-card">
      <div className="form-header">
        <h2>Create Flow</h2>
        <span className="badge">RHF Managed</span>
      </div>
      <p style={{ fontSize: 13, opacity: 0.8, marginBottom: 16 }}>
        This form demonstrates mandatory selection using RHF <code>rules</code>.
      </p>
      <form onSubmit={handleSubmit(onSubmit)}>
        <div className="form-group">
          <label>Assign Users *</label>
          <MageSelect
            name="users"
            control={control}
            multiple
            rules={{ 
              required: 'Select at least one user to proceed',
              validate: (val: User[] | string[]) => val.length <= 3 || 'Maximum 3 users allowed for this role'
            }}
            engineOrConfig={engineConfig}
            placeholder="Search and select users..."
            renderItem={(u: User) => (
              <div>
                <div style={{ color: '#fff' }}>{u.name}</div>
                <div style={{ fontSize: 12, opacity: 0.7 }}>{u.email}</div>
              </div>
            )}
            renderSelection={(items: User[]) => items.map((i) => i.name).join(', ')}
          />
        </div>
        <button className="btn-submit" type="submit">Submit Form</button>
      </form>
    </div>
  );
}

export function EditForm({ initialIds }: { initialIds: string[] }) {
  const { control, handleSubmit } = useForm<FormValues>({
    defaultValues: { users: initialIds },
    mode: 'all',
  });

  const onSubmit = (data: FormValues) => {
    alert('✅ Edit Success!\n\nSynchronized Data:\n' + JSON.stringify(data, null, 2));
  };

  return (
    <div className="form-card">
      <div className="form-header">
        <h2>Edit Flow</h2>
        <span className="badge">RHF Hydrated</span>
      </div>
      <p style={{ fontSize: 13, opacity: 0.8, marginBottom: 12 }}>
        Demonstrating automatic hydration of IDs into full objects.
      </p>
      <form onSubmit={handleSubmit(onSubmit)}>
        <div className="form-group">
          <label>Assigned Users</label>
          <MageSelect
            name="users"
            control={control}
            multiple
            rules={{ 
              required: 'Select at least one user to proceed',
            }}
            engineOrConfig={engineConfig}
            placeholder="Search and select users..."
            renderItem={(u: User) => (
              <div>
                <div style={{ color: '#fff' }}>{u.name}</div>
                <div style={{ fontSize: 12, opacity: 0.7 }}>{u.email}</div>
              </div>
            )}
            renderSelection={(items: User[]) => items.map((i) => i.name).join(', ')}
          />
        </div>
        <button className="btn-submit" type="submit">Submit Update</button>
      </form>
    </div>
  );
}

export function MemoryOptimizedMultiForm() {
  const { control, handleSubmit } = useForm<FormValues>({
    defaultValues: { users: [] },
  });

  const onSubmit = (data: FormValues) => {
    alert('✅ Memory Optimized Multi Success!\n' + JSON.stringify(data, null, 2));
  };

  return (
    <div className="form-card memory-optimized">
      <div className="form-header">
        <h2>Bi-Directional Multi</h2>
        <span className="badge info">Memory Optimized</span>
      </div>
      <p style={{ fontSize: 13, opacity: 0.8, marginBottom: 16 }}>
        Starting at page 1 with <code>biDirectionalRechargeable</code> enabled. Scroll down!
      </p>
      <form onSubmit={handleSubmit(onSubmit)}>
        <div className="form-group">
          <label>Assign Users</label>
          <MageSelect
            name="users"
            control={control}
            multiple
            engineOrConfig={memoryOptimizedConfig}
            placeholder="Scroll up or down..."
            renderItem={(u: User) => (
              <div>
                <div style={{ color: '#fff' }}>{u.name}</div>
                <div style={{ fontSize: 12, opacity: 0.7 }}>{u.email}</div>
              </div>
            )}
            renderSelection={(items: User[]) => items.map((i) => i.name).join(', ')}
          />
        </div>
        <button className="btn-submit" type="submit">Submit Form</button>
      </form>
    </div>
  );
}
