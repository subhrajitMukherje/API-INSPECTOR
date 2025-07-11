import React, { useState } from 'react';
import { Clock, Save, Search, Trash2, Copy, Plus } from 'lucide-react';
import { useAPIStore } from '../store/apiStore';
import { APIRequest } from '../types/api';
import { formatDistanceToNow } from 'date-fns';

const Sidebar: React.FC = () => {
  const [activeSection, setActiveSection] = useState<'history' | 'saved'>('history');
  const [searchTerm, setSearchTerm] = useState('');
  
  const { history, savedRequests, addTab, deleteRequest } = useAPIStore();

  const filteredRequests = (activeSection === 'history' ? history : savedRequests).filter(
    request =>
      request.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      request.url.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const getMethodColor = (method: string) => {
    const colors = {
      GET: 'text-green-600 bg-green-50',
      POST: 'text-blue-600 bg-blue-50',
      PUT: 'text-orange-600 bg-orange-50',
      DELETE: 'text-red-600 bg-red-50',
      PATCH: 'text-purple-600 bg-purple-50',
      HEAD: 'text-gray-600 bg-gray-50',
      OPTIONS: 'text-yellow-600 bg-yellow-50',
    };
    return colors[method as keyof typeof colors] || 'text-gray-600 bg-gray-50';
  };

  const handleRequestClick = (request: APIRequest) => {
    addTab(request);
  };

  const handleDelete = (e: React.MouseEvent, id: string) => {
    e.stopPropagation();
    deleteRequest(id);
  };

  const handleDuplicate = (e: React.MouseEvent, request: APIRequest) => {
    e.stopPropagation();
    const newRequest = {
      ...request,
      id: crypto.randomUUID(),
      name: `${request.name} Copy`,
      timestamp: Date.now(),
    };
    addTab(newRequest);
  };

  return (
    <aside className="w-64 sm:w-80 bg-gray-50 border-r border-gray-200 flex flex-col h-full" role="complementary" aria-label="Request history and saved requests">
      {/* Header */}
      <div className="p-4 border-b border-gray-200">
        <h2 className="text-base sm:text-lg font-semibold text-gray-900 mb-3">API Inspector</h2>
        
        {/* Section Tabs */}
        <div className="flex space-x-1 bg-gray-100 rounded-lg p-1" role="tablist" aria-label="Request sections">
          <button
            onClick={() => setActiveSection('history')}
            className={`flex items-center px-3 py-2 text-sm font-medium rounded-md transition-colors focus:outline-none focus:ring-2 focus:ring-blue-500 ${
              activeSection === 'history'
                ? 'bg-white text-gray-900 shadow-sm'
                : 'text-gray-600 hover:text-gray-900'
            }`}
            role="tab"
            aria-selected={activeSection === 'history'}
            aria-controls="history-panel"
          >
            <Clock className="w-3 h-3 sm:w-4 sm:h-4 mr-1 sm:mr-2" aria-hidden="true" />
            <span className="text-xs sm:text-sm">History</span>
          </button>
          <button
            onClick={() => setActiveSection('saved')}
            className={`flex items-center px-3 py-2 text-sm font-medium rounded-md transition-colors focus:outline-none focus:ring-2 focus:ring-blue-500 ${
              activeSection === 'saved'
                ? 'bg-white text-gray-900 shadow-sm'
                : 'text-gray-600 hover:text-gray-900'
            }`}
            role="tab"
            aria-selected={activeSection === 'saved'}
            aria-controls="saved-panel"
          >
            <Save className="w-3 h-3 sm:w-4 sm:h-4 mr-1 sm:mr-2" aria-hidden="true" />
            <span className="text-xs sm:text-sm">Saved</span>
          </button>
        </div>
      </div>

      {/* Search */}
      <div className="p-3 sm:p-4 border-b border-gray-200">
        <div className="relative">
          <Search className="absolute left-2 sm:left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-3 h-3 sm:w-4 sm:h-4" aria-hidden="true" />
          <input
            type="text"
            placeholder="Search requests..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full pl-8 sm:pl-10 pr-3 sm:pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent text-sm"
            aria-label="Search through requests"
          />
        </div>
      </div>

      {/* Request List */}
      <div className="flex-1 overflow-y-auto" role="tabpanel" id={activeSection === 'history' ? 'history-panel' : 'saved-panel'}>
        {filteredRequests.length === 0 ? (
          <div className="p-3 sm:p-4 text-center text-gray-500">
            <div className="mb-2">
              {activeSection === 'history' ? (
                <Clock className="w-6 h-6 sm:w-8 sm:h-8 mx-auto text-gray-300" aria-hidden="true" />
              ) : (
                <Save className="w-6 h-6 sm:w-8 sm:h-8 mx-auto text-gray-300" aria-hidden="true" />
              )}
            </div>
            <p className="text-sm">
              {searchTerm
                ? 'No requests found'
                : `No ${activeSection === 'history' ? 'history' : 'saved requests'} yet`}
            </p>
          </div>
        ) : (
          <div className="p-1 sm:p-2 space-y-1">
            {filteredRequests.map((request) => (
              <div
                key={request.id}
                onClick={() => handleRequestClick(request)}
                className="group p-2 sm:p-3 hover:bg-white rounded-lg cursor-pointer transition-colors border border-transparent hover:border-gray-200 hover:shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
                role="button"
                tabIndex={0}
                aria-label={`Open ${request.name} request`}
                onKeyDown={(e) => {
                  if (e.key === 'Enter' || e.key === ' ') {
                    e.preventDefault();
                    handleRequestClick(request);
                  }
                }}
              >
                <div className="flex items-center justify-between mb-1 sm:mb-2">
                  <span className={`px-2 py-1 text-xs font-medium rounded ${getMethodColor(request.method)}`}>
                    {request.method}
                  </span>
                  <div className="flex space-x-1 opacity-0 group-hover:opacity-100 transition-opacity">
                    <button
                      onClick={(e) => handleDuplicate(e, request)}
                      className="p-1 text-gray-400 hover:text-gray-600 transition-colors focus:outline-none focus:ring-2 focus:ring-blue-500 rounded"
                      title="Duplicate"
                      aria-label={`Duplicate ${request.name} request`}
                    >
                      <Copy className="w-2.5 h-2.5 sm:w-3 sm:h-3" aria-hidden="true" />
                    </button>
                    {activeSection === 'saved' && (
                      <button
                        onClick={(e) => handleDelete(e, request.id)}
                        className="p-1 text-gray-400 hover:text-red-500 transition-colors focus:outline-none focus:ring-2 focus:ring-red-500 rounded"
                        title="Delete"
                        aria-label={`Delete ${request.name} request`}
                      >
                        <Trash2 className="w-2.5 h-2.5 sm:w-3 sm:h-3" aria-hidden="true" />
                      </button>
                    )}
                  </div>
                </div>
                <div className="text-xs sm:text-sm font-medium text-gray-900 truncate mb-1">
                  {request.name}
                </div>
                <div className="text-xs text-gray-500 truncate mb-1">
                  {request.url || 'No URL'}
                </div>
                <div className="text-xs text-gray-400 hidden sm:block">
                  {formatDistanceToNow(new Date(request.timestamp), { addSuffix: true })}
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </aside>
  );
};

export default Sidebar;