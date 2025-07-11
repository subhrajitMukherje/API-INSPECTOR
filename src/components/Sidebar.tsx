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
    <div className="w-80 bg-gray-50 border-r border-gray-200 flex flex-col h-full">
      {/* Header */}
      <div className="p-4 border-b border-gray-200">
        <h2 className="text-lg font-semibold text-gray-900 mb-3">API Inspector</h2>
        
        {/* Section Tabs */}
        <div className="flex space-x-1 bg-gray-100 rounded-lg p-1">
          <button
            onClick={() => setActiveSection('history')}
            className={`flex items-center px-3 py-2 text-sm font-medium rounded-md transition-colors ${
              activeSection === 'history'
                ? 'bg-white text-gray-900 shadow-sm'
                : 'text-gray-600 hover:text-gray-900'
            }`}
          >
            <Clock className="w-4 h-4 mr-2" />
            History
          </button>
          <button
            onClick={() => setActiveSection('saved')}
            className={`flex items-center px-3 py-2 text-sm font-medium rounded-md transition-colors ${
              activeSection === 'saved'
                ? 'bg-white text-gray-900 shadow-sm'
                : 'text-gray-600 hover:text-gray-900'
            }`}
          >
            <Save className="w-4 h-4 mr-2" />
            Saved
          </button>
        </div>
      </div>

      {/* Search */}
      <div className="p-4 border-b border-gray-200">
        <div className="relative">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
          <input
            type="text"
            placeholder="Search requests..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
          />
        </div>
      </div>

      {/* Request List */}
      <div className="flex-1 overflow-y-auto">
        {filteredRequests.length === 0 ? (
          <div className="p-4 text-center text-gray-500">
            <div className="mb-2">
              {activeSection === 'history' ? (
                <Clock className="w-8 h-8 mx-auto text-gray-300" />
              ) : (
                <Save className="w-8 h-8 mx-auto text-gray-300" />
              )}
            </div>
            <p className="text-sm">
              {searchTerm
                ? 'No requests found'
                : `No ${activeSection === 'history' ? 'history' : 'saved requests'} yet`}
            </p>
          </div>
        ) : (
          <div className="p-2 space-y-1">
            {filteredRequests.map((request) => (
              <div
                key={request.id}
                onClick={() => handleRequestClick(request)}
                className="group p-3 hover:bg-white rounded-lg cursor-pointer transition-colors border border-transparent hover:border-gray-200 hover:shadow-sm"
              >
                <div className="flex items-center justify-between mb-2">
                  <span className={`px-2 py-1 text-xs font-medium rounded ${getMethodColor(request.method)}`}>
                    {request.method}
                  </span>
                  <div className="flex space-x-1 opacity-0 group-hover:opacity-100 transition-opacity">
                    <button
                      onClick={(e) => handleDuplicate(e, request)}
                      className="p-1 text-gray-400 hover:text-gray-600 transition-colors"
                      title="Duplicate"
                    >
                      <Copy className="w-3 h-3" />
                    </button>
                    {activeSection === 'saved' && (
                      <button
                        onClick={(e) => handleDelete(e, request.id)}
                        className="p-1 text-gray-400 hover:text-red-500 transition-colors"
                        title="Delete"
                      >
                        <Trash2 className="w-3 h-3" />
                      </button>
                    )}
                  </div>
                </div>
                <div className="text-sm font-medium text-gray-900 truncate mb-1">
                  {request.name}
                </div>
                <div className="text-xs text-gray-500 truncate mb-1">
                  {request.url || 'No URL'}
                </div>
                <div className="text-xs text-gray-400">
                  {formatDistanceToNow(new Date(request.timestamp), { addSuffix: true })}
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default Sidebar;