import { useState } from 'react';

/**
 * Component Selector Panel
 * Shows all components and allows filtering/selection
 */
const ComponentSelector = ({ components = [], onSelectComponent, selectedComponent }) => {
  const [isOpen, setIsOpen] = useState(false);
  const [filter, setFilter] = useState('all');

  const categories = {
    all: { name: 'All', icon: '🏭', color: 'cyan' },
    production: { name: 'Production', icon: '⚙️', color: 'blue' },
    utilities: { name: 'Utilities', icon: '🔥', color: 'orange' },
    storage: { name: 'Storage', icon: '🛢️', color: 'purple' },
    control: { name: 'Control', icon: '🎛️', color: 'green' }
  };

  const filteredComponents = filter === 'all' 
    ? components 
    : components.filter(c => c.category === filter);

  return (
    <>
      {/* Toggle Button */}
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="absolute top-4 right-4 z-10 px-4 py-3 bg-zinc-900/95 backdrop-blur-xl border-2 border-purple-500/50 rounded-xl text-purple-400 font-bold shadow-2xl hover:bg-zinc-800 transition-all"
      >
        <div className="flex items-center gap-2">
          <span className="text-xl">📋</span>
          <span>Components ({components.length})</span>
          <span className={`transition-transform ${isOpen ? 'rotate-180' : ''}`}>▼</span>
        </div>
      </button>

      {/* Selector Panel */}
      {isOpen && (
        <div className="absolute top-20 right-4 z-10 bg-zinc-900/98 backdrop-blur-xl border-2 border-purple-500 rounded-2xl p-6 shadow-2xl" style={{ width: '400px', maxHeight: '70vh', overflowY: 'auto' }}>
          <h3 className="text-2xl font-bold text-purple-400 mb-4 flex items-center gap-2">
            <span className="w-4 h-4 bg-purple-400 rounded-full animate-pulse"></span>
            Equipment List
          </h3>

          {/* Category Filter */}
          <div className="mb-4 flex gap-2 flex-wrap">
            {Object.entries(categories).map(([key, cat]) => (
              <button
                key={key}
                onClick={() => setFilter(key)}
                className={`px-3 py-1.5 rounded-lg text-xs font-semibold transition-all ${
                  filter === key
                    ? `bg-${cat.color}-500 text-white shadow-lg`
                    : 'bg-zinc-800 text-zinc-400 hover:bg-zinc-700'
                }`}
              >
                <span className="mr-1">{cat.icon}</span>
                {cat.name}
              </button>
            ))}
          </div>

          {/* Component List */}
          <div className="space-y-2">
            {filteredComponents.map((component, index) => (
              <button
                key={index}
                onClick={() => {
                  onSelectComponent?.(component.name);
                  setIsOpen(false);
                }}
                className={`w-full text-left p-3 rounded-xl transition-all ${
                  selectedComponent === component.name
                    ? 'bg-purple-500/30 border-2 border-purple-500'
                    : 'bg-zinc-800/50 border-2 border-zinc-700 hover:border-purple-500/50'
                }`}
              >
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <span className="text-2xl">{component.icon || '⚙️'}</span>
                    <div>
                      <div className="text-white font-semibold text-sm">{component.name}</div>
                      <div className="text-zinc-400 text-xs">{component.type}</div>
                    </div>
                  </div>
                  <div className={`px-2 py-1 rounded-lg text-xs font-semibold ${
                    component.status === 'Operational' ? 'bg-green-500/20 text-green-400' :
                    component.status === 'Warning' ? 'bg-yellow-500/20 text-yellow-400' :
                    'bg-red-500/20 text-red-400'
                  }`}>
                    {component.status}
                  </div>
                </div>
              </button>
            ))}
          </div>

          {filteredComponents.length === 0 && (
            <div className="text-center py-8 text-zinc-500">
              No components in this category
            </div>
          )}
        </div>
      )}
    </>
  );
};

export default ComponentSelector;
