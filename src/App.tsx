import { useQuery, QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { useState } from 'react';
import { delay } from './mock/users';

// Examples
import { CreateForm, EditForm, MemoryOptimizedMultiForm } from './examples/MultiSelection';
import { SimpleCreateForm, SimpleEditForm, MemoryOptimizedSingleForm } from './examples/SingleSelection';
import { VanillaCreateForm, VanillaEditForm, MemoryOptimizedVanillaForm } from './examples/VanillaUsage';

const queryClient = new QueryClient();

function AppContent() {
  const [activeTab, setActiveTab] = useState<'multi' | 'single' | 'vanilla'>('multi');

  // Simulate initial data fetching for edit flows
  const { data: demoIds } = useQuery({
    queryKey: ['demo-users'],
    queryFn: async () => {
      await delay(1000);
      return ["2", "3"];
    },
    staleTime: Infinity,
  });

  return (
    <div className="app-container">
      <header style={{ textAlign: 'center', marginBottom: 40 }}>
        <h1 style={{ fontSize: '2.5rem', marginBottom: 12, background: 'linear-gradient(90deg, #6366f1, #a855f7)', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent' }}>
          Mage Select Engine
        </h1>
        <p style={{ opacity: 0.7, fontSize: 16 }}>Enterprise-grade full-stack select solution Demo</p>
      </header>
      
      <nav className="mage-tabs-nav">
        <button 
          className={`mage-tab-item ${activeTab === 'multi' ? 'active' : ''}`}
          onClick={() => setActiveTab('multi')}
        >
          Multi-Selection (RHF)
        </button>
        <button 
          className={`mage-tab-item ${activeTab === 'single' ? 'active' : ''}`}
          onClick={() => setActiveTab('single')}
        >
          Single-Selection (RHF)
        </button>
        <button 
          className={`mage-tab-item ${activeTab === 'vanilla' ? 'active' : ''}`}
          onClick={() => setActiveTab('vanilla')}
        >
          Direct Engine (Vanilla)
        </button>
      </nav>

      <div className="tab-content" key={activeTab}>
        {activeTab === 'multi' && (
          <section>
            <h2 className="section-title">Multi-Selection Examples</h2>
            <div className="forms-grid">
              <CreateForm />
              {demoIds ? (
                <EditForm initialIds={demoIds} />
              ) : (
                <div className="form-card loading">
                  <h2>Edit Flow</h2>
                  <p>Hydrating data...</p>
                </div>
              )}
              <MemoryOptimizedMultiForm />
            </div>
          </section>
        )}

        {activeTab === 'single' && (
          <section>
            <h2 className="section-title">Single-Selection Examples</h2>
            <div className="forms-grid">
              <SimpleCreateForm />
              {demoIds ? (
                <SimpleEditForm initialId={demoIds[0]} />
              ) : (
                <div className="form-card loading">
                  <h2>Simple Edit</h2>
                  <p>Hydrating data...</p>
                </div>
              )}
              <MemoryOptimizedSingleForm />
            </div>
          </section>
        )}

        {activeTab === 'vanilla' && (
          <section>
            <h2 className="section-title">Direct Engine Usage (Vanilla React)</h2>
            <div className="forms-grid">
              <VanillaCreateForm />
              {demoIds ? (
                <VanillaEditForm initialIds={demoIds} />
              ) : (
                <div className="form-card loading">
                  <h2>Vanilla Edit</h2>
                  <p>Loading IDs...</p>
                </div>
              )}
              <MemoryOptimizedVanillaForm />
            </div>
          </section>
        )}
      </div>

      <section className="about-section" style={{ 
        maxWidth: 800, 
        margin: '60px auto 0', 
        padding: '24px', 
        background: 'rgba(255, 255, 255, 0.03)', 
        borderRadius: '16px', 
        border: '1px solid rgba(255, 255, 255, 0.05)',
        textAlign: 'center'
      }}>
        <h2 style={{ fontSize: 18, marginBottom: 16, color: '#a855f7' }}>About the Library</h2>
        <p style={{ fontSize: 14, opacity: 0.8, lineHeight: 1.6, marginBottom: 20 }}>
          The Mage Select ecosystem provides a powerful engine to handle complex selection states, 
          server-side pagination, and memory-optimized infinite lists. It's designed to be 
          highly flexible, supporting both <strong>Vanilla React</strong> and <strong>React Hook Form</strong>.
        </p>
        <div style={{ display: 'flex', gap: '12px', justifyContent: 'center', flexWrap: 'wrap' }}>
          <a href="https://www.npmjs.com/package/mage-select-data-engine" target="_blank" rel="noreferrer" className="badge-link">mage-select-data-engine</a>
          <a href="https://www.npmjs.com/package/mage-select-data-react" target="_blank" rel="noreferrer" className="badge-link">mage-select-data-react</a>
          <a href="https://www.npmjs.com/package/mage-select-data-react-hook-form" target="_blank" rel="noreferrer" className="badge-link">mage-select-data-rhf</a>
        </div>
      </section>
    </div>
  );
}

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <AppContent />
    </QueryClientProvider>
  );
}

export default App;
