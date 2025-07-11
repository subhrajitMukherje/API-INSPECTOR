import React from 'react';
import { X, Plus, Circle } from 'lucide-react';
import { useAPIStore } from '../store/apiStore';

const TabBar: React.FC = () => {
  const { tabs, activeTabId, setActiveTab, closeTab, addTab } = useAPIStore();

  const getMethodColor = (method: string) => {
    const colors = {
      GET: 'text-green-600',
      POST: 'text-blue-600',
      PUT: 'text-orange-600',
      DELETE: 'text-red-600',
      PATCH: 'text-purple-600',
      HEAD: 'text-gray-600',
      OPTIONS: 'text-yellow-600',
    };
    return colors[method as keyof typeof colors] || 'text-gray-600';
  };

  return (
    <div className="bg-white border-b border-gray-200 flex items-center overflow-x-auto" role="tablist" aria-label="Request tabs">
      <div className="flex-1 flex items-center overflow-x-auto">
        {tabs.map((tab) => (
          <div
            key={tab.id}
            className={`flex items-center px-3 sm:px-4 py-2 sm:py-3 border-r border-gray-200 cursor-pointer transition-colors min-w-0 whitespace-nowrap focus:outline-none focus:ring-2 focus:ring-blue-500 ${
              activeTabId === tab.id
                ? 'bg-gray-50 border-b-2 border-b-blue-500'
                : 'hover:bg-gray-50'
            }`}
            onClick={() => setActiveTab(tab.id)}
            role="tab"
            aria-selected={activeTabId === tab.id}
            aria-label={`${tab.request.method} ${tab.request.name} tab`}
            tabIndex={0}
            onKeyDown={(e) => {
              if (e.key === 'Enter' || e.key === ' ') {
                e.preventDefault();
                setActiveTab(tab.id);
              }
            }}
          >
            <span className={`text-xs font-medium mr-1 sm:mr-2 ${getMethodColor(tab.request.method)}`}>
              {tab.request.method}
            </span>
            <span className="text-xs sm:text-sm text-gray-900 truncate max-w-20 sm:max-w-32">
              {tab.request.name}
            </span>
            {tab.isDirty && (
              <Circle className="w-1.5 h-1.5 sm:w-2 sm:h-2 text-orange-500 fill-current ml-1 sm:ml-2" aria-label="Unsaved changes" />
            )}
            <button
              onClick={(e) => {
                e.stopPropagation();
                closeTab(tab.id);
              }}
              className="ml-1 sm:ml-2 p-0.5 sm:p-1 hover:bg-gray-200 rounded transition-colors focus:outline-none focus:ring-2 focus:ring-red-500"
              aria-label={`Close ${tab.request.name} tab`}
            >
              <X className="w-2.5 h-2.5 sm:w-3 sm:h-3 text-gray-500" aria-hidden="true" />
            </button>
          </div>
        ))}
      </div>
      <button
        onClick={() => addTab()}
        className="p-2 sm:p-3 hover:bg-gray-50 transition-colors border-l border-gray-200 flex-shrink-0 focus:outline-none focus:ring-2 focus:ring-blue-500"
        title="New Request"
        aria-label="Add new request tab"
      >
        <Plus className="w-3 h-3 sm:w-4 sm:h-4 text-gray-500" aria-hidden="true" />
      </button>
    </div>
  );
};

export default TabBar;