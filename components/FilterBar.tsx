import React from 'react';

interface FilterBarProps {
  activeFilter: string;
  onFilterChange: (filter: string) => void;
  resultCount: number;
}

const FilterBar: React.FC<FilterBarProps> = ({ activeFilter, onFilterChange, resultCount }) => {
  const tabs = [
    { id: 'all', label: 'All orders' },
    { id: 'dispatch', label: 'Dispatch' },
    { id: 'pending', label: 'Pending' },
    { id: 'completed', label: 'Completed' },
  ];

  return (
    <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-5 gap-4 animate-fadeInUp" style={{ animationDelay: '0.1s' }}>
      <div className="flex flex-wrap gap-1.5">
        {tabs.map(tab => {
          const isActive = activeFilter === tab.id;
          return (
            <button
              key={tab.id}
              onClick={() => onFilterChange(tab.id)}
              className={`
                relative px-4 py-2 rounded-xl text-sm font-medium transition-all duration-300 overflow-hidden group
                ${isActive 
                  ? 'bg-primary text-white scale-105 shadow-lg shadow-primary/30' 
                  : 'text-text-light hover:text-primary hover:-translate-y-0.5 hover:shadow-md'
                }
              `}
            >
              {/* White glow on active */}
              {isActive && (
                <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent animate-[whiteGlow_3s_infinite]" />
              )}
              
              {/* Hover background for inactive */}
              {!isActive && (
                 <div className="absolute inset-0 bg-primary/10 scale-0 group-hover:scale-100 transition-transform duration-300 rounded-xl" />
              )}

              <span className="relative z-10">{tab.label}</span>
            </button>
          );
        })}
      </div>
      
      <div className="text-sm text-text-light px-4 py-2 bg-white rounded-xl shadow-sm hover:shadow-md hover:text-primary hover:-translate-y-0.5 transition-all">
        {resultCount} orders found
      </div>
    </div>
  );
};

export default FilterBar;
