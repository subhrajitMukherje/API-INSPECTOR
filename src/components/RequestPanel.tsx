import React, { useState } from 'react';
import { Send, Save, Settings, ChevronDown, ChevronRight, Plus, Trash2 } from 'lucide-react';
import { useAPIStore } from '../store/apiStore';
import { useAPIRequest } from '../hooks/useAPIRequest';
import Editor from '@monaco-editor/react';

const RequestPanel: React.FC = () => {
  const [expandedSections, setExpandedSections] = useState({
    headers: false,
    auth: false,
    body: false,
  });
  
  const { getActiveTab, updateRequest, setResponse, setLoading, addToHistory, saveRequest } = useAPIStore();
  const { sendRequest, isLoading } = useAPIRequest();
  const activeTab = getActiveTab();

  if (!activeTab) return null;

  const { request } = activeTab;

  const handleMethodChange = (method: string) => {
    updateRequest(activeTab.id, { method: method as any });
  };

  const handleUrlChange = (url: string) => {
    updateRequest(activeTab.id, { url });
  };

  const handleNameChange = (name: string) => {
    updateRequest(activeTab.id, { name });
  };

  const handleHeaderAdd = () => {
    const headers = { ...request.headers, '': '' };
    updateRequest(activeTab.id, { headers });
  };

  const handleHeaderChange = (oldKey: string, newKey: string, value: string) => {
    const headers = { ...request.headers };
    if (oldKey !== newKey) {
      delete headers[oldKey];
    }
    if (newKey.trim()) {
      headers[newKey] = value;
    }
    updateRequest(activeTab.id, { headers });
  };

  const handleHeaderDelete = (key: string) => {
    const headers = { ...request.headers };
    delete headers[key];
    updateRequest(activeTab.id, { headers });
  };

  const handleAuthChange = (auth: any) => {
    updateRequest(activeTab.id, { auth });
  };

  const handleBodyChange = (body: string) => {
    updateRequest(activeTab.id, { body });
  };

  const handleSendRequest = async () => {
    if (!request.url.trim()) return;
    
    setLoading(activeTab.id, true);
    
    try {
      const response = await sendRequest(request);
      setResponse(activeTab.id, response);
      addToHistory(request);
    } catch (error) {
      console.error('Request failed:', error);
    }
  };

  const handleSaveRequest = () => {
    saveRequest(request);
  };

  const toggleSection = (section: keyof typeof expandedSections) => {
    setExpandedSections(prev => ({
      ...prev,
      [section]: !prev[section]
    }));
  };

  const getMethodColor = (method: string) => {
    const colors = {
      GET: 'bg-green-500 hover:bg-green-600',
      POST: 'bg-blue-500 hover:bg-blue-600',
      PUT: 'bg-orange-500 hover:bg-orange-600',
      DELETE: 'bg-red-500 hover:bg-red-600',
      PATCH: 'bg-purple-500 hover:bg-purple-600',
      HEAD: 'bg-gray-500 hover:bg-gray-600',
      OPTIONS: 'bg-yellow-500 hover:bg-yellow-600',
    };
    return colors[method as keyof typeof colors] || 'bg-gray-500 hover:bg-gray-600';
  };

  return (
    <main className="flex-1 bg-white min-w-0" role="main" aria-label="API request configuration">
      {/* Request Name */}
      <div className="p-3 sm:p-4 border-b border-gray-200">
        <label htmlFor="request-name" className="sr-only">Request name</label>
        <input
          id="request-name"
          type="text"
          value={request.name}
          onChange={(e) => handleNameChange(e.target.value)}
          className="w-full text-base sm:text-lg font-medium border-none outline-none focus:ring-2 focus:ring-blue-500 rounded px-2 py-1"
          placeholder="Request name"
          aria-label="Request name"
        />
      </div>

      {/* URL Bar */}
      <div className="p-3 sm:p-4 border-b border-gray-200">
        <div className="flex flex-col sm:flex-row space-y-2 sm:space-y-0 sm:space-x-2">
          <label htmlFor="http-method" className="sr-only">HTTP Method</label>
          <select
            id="http-method"
            value={request.method}
            onChange={(e) => handleMethodChange(e.target.value)}
            className={`px-2 sm:px-3 py-2 text-white font-medium rounded-md transition-colors text-sm sm:text-base ${getMethodColor(request.method)}`}
            aria-label="Select HTTP method"
          >
            <option value="GET">GET</option>
            <option value="POST">POST</option>
            <option value="PUT">PUT</option>
            <option value="DELETE">DELETE</option>
            <option value="PATCH">PATCH</option>
            <option value="HEAD">HEAD</option>
            <option value="OPTIONS">OPTIONS</option>
          </select>
          
          <label htmlFor="request-url" className="sr-only">Request URL</label>
          <input
            id="request-url"
            type="text"
            value={request.url}
            onChange={(e) => handleUrlChange(e.target.value)}
            placeholder="Enter request URL"
            className="flex-1 px-3 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-transparent text-sm sm:text-base"
            aria-label="Request URL"
          />
          
          <div className="flex space-x-2">
            <button
              onClick={handleSendRequest}
              disabled={!request.url.trim() || isLoading}
              className="px-3 sm:px-4 py-2 bg-blue-500 text-white rounded-md hover:bg-blue-600 disabled:bg-gray-300 disabled:cursor-not-allowed transition-colors flex items-center space-x-1 sm:space-x-2 text-sm sm:text-base"
              aria-label={isLoading ? 'Sending request...' : 'Send API request'}
            >
              <Send className="w-3 h-3 sm:w-4 sm:h-4" aria-hidden="true" />
              <span className="hidden sm:inline">{isLoading ? 'Sending...' : 'Send'}</span>
              <span className="sm:hidden">{isLoading ? '...' : 'Send'}</span>
            </button>
            
            <button
              onClick={handleSaveRequest}
              className="px-3 sm:px-4 py-2 bg-gray-500 text-white rounded-md hover:bg-gray-600 transition-colors flex items-center space-x-1 sm:space-x-2 text-sm sm:text-base"
              aria-label="Save request"
            >
              <Save className="w-3 h-3 sm:w-4 sm:h-4" aria-hidden="true" />
              <span className="hidden sm:inline">Save</span>
            </button>
          </div>
        </div>
      </div>

      {/* Request Configuration */}
      <div className="flex-1 overflow-y-auto">
        {/* Headers */}
        <div className="border-b border-gray-200">
          <button
            onClick={() => toggleSection('headers')}
            className="w-full px-3 sm:px-4 py-3 flex items-center justify-between hover:bg-gray-50 transition-colors focus:outline-none focus:ring-2 focus:ring-blue-500"
            aria-expanded={expandedSections.headers}
            aria-controls="headers-section"
          >
            <div className="flex items-center space-x-2">
              {expandedSections.headers ? (
                <ChevronDown className="w-3 h-3 sm:w-4 sm:h-4 text-gray-500" aria-hidden="true" />
              ) : (
                <ChevronRight className="w-3 h-3 sm:w-4 sm:h-4 text-gray-500" aria-hidden="true" />
              )}
              <span className="font-medium text-gray-900 text-sm sm:text-base">Headers</span>
              <span className="text-xs sm:text-sm text-gray-500">
                ({Object.keys(request.headers).length})
              </span>
            </div>
          </button>
          
          {expandedSections.headers && (
            <div id="headers-section" className="px-3 sm:px-4 pb-4 space-y-2">
              {Object.entries(request.headers).map(([key, value], index) => (
                <div key={index} className="flex flex-col sm:flex-row space-y-2 sm:space-y-0 sm:space-x-2">
                  <input
                    type="text"
                    value={key}
                    onChange={(e) => handleHeaderChange(key, e.target.value, value)}
                    placeholder="Header name"
                    className="flex-1 px-3 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-transparent text-sm"
                    aria-label={`Header name ${index + 1}`}
                  />
                  <input
                    type="text"
                    value={value}
                    onChange={(e) => handleHeaderChange(key, key, e.target.value)}
                    placeholder="Header value"
                    className="flex-1 px-3 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-transparent text-sm"
                    aria-label={`Header value ${index + 1}`}
                  />
                  <button
                    onClick={() => handleHeaderDelete(key)}
                    className="p-2 text-red-500 hover:bg-red-50 rounded-md transition-colors self-start sm:self-auto focus:outline-none focus:ring-2 focus:ring-red-500"
                    aria-label={`Delete header ${key}`}
                  >
                    <Trash2 className="w-3 h-3 sm:w-4 sm:h-4" aria-hidden="true" />
                  </button>
                </div>
              ))}
              <button
                onClick={handleHeaderAdd}
                className="flex items-center space-x-2 px-3 py-2 text-blue-500 hover:bg-blue-50 rounded-md transition-colors text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
                aria-label="Add new header"
              >
                <Plus className="w-3 h-3 sm:w-4 sm:h-4" aria-hidden="true" />
                <span>Add Header</span>
              </button>
            </div>
          )}
        </div>

        {/* Authentication */}
        <div className="border-b border-gray-200">
          <button
            onClick={() => toggleSection('auth')}
            className="w-full px-3 sm:px-4 py-3 flex items-center justify-between hover:bg-gray-50 transition-colors focus:outline-none focus:ring-2 focus:ring-blue-500"
            aria-expanded={expandedSections.auth}
            aria-controls="auth-section"
          >
            <div className="flex items-center space-x-2">
              {expandedSections.auth ? (
                <ChevronDown className="w-3 h-3 sm:w-4 sm:h-4 text-gray-500" aria-hidden="true" />
              ) : (
                <ChevronRight className="w-3 h-3 sm:w-4 sm:h-4 text-gray-500" aria-hidden="true" />
              )}
              <span className="font-medium text-gray-900 text-sm sm:text-base">Authorization</span>
              <span className="text-xs sm:text-sm text-gray-500">
                ({request.auth?.type || 'none'})
              </span>
            </div>
          </button>
          
          {expandedSections.auth && (
            <div id="auth-section" className="px-3 sm:px-4 pb-4 space-y-4">
              <select
                value={request.auth?.type || 'none'}
                onChange={(e) => handleAuthChange({ type: e.target.value })}
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-transparent text-sm"
                aria-label="Authentication type"
              >
                <option value="none">No Auth</option>
                <option value="bearer">Bearer Token</option>
                <option value="basic">Basic Auth</option>
                <option value="api-key">API Key</option>
              </select>
              
              {request.auth?.type === 'bearer' && (
                <input
                  type="text"
                  value={request.auth?.token || ''}
                  onChange={(e) => handleAuthChange({ ...request.auth, token: e.target.value })}
                  placeholder="Token"
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-transparent text-sm"
                  aria-label="Bearer token"
                />
              )}
              
              {request.auth?.type === 'basic' && (
                <div className="space-y-2">
                  <input
                    type="text"
                    value={request.auth?.username || ''}
                    onChange={(e) => handleAuthChange({ ...request.auth, username: e.target.value })}
                    placeholder="Username"
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-transparent text-sm"
                    aria-label="Username for basic authentication"
                  />
                  <input
                    type="password"
                    value={request.auth?.password || ''}
                    onChange={(e) => handleAuthChange({ ...request.auth, password: e.target.value })}
                    placeholder="Password"
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-transparent text-sm"
                    aria-label="Password for basic authentication"
                  />
                </div>
              )}
              
              {request.auth?.type === 'api-key' && (
                <div className="space-y-2">
                  <input
                    type="text"
                    value={request.auth?.key || ''}
                    onChange={(e) => handleAuthChange({ ...request.auth, key: e.target.value })}
                    placeholder="Key"
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-transparent text-sm"
                    aria-label="API key name"
                  />
                  <input
                    type="text"
                    value={request.auth?.value || ''}
                    onChange={(e) => handleAuthChange({ ...request.auth, value: e.target.value })}
                    placeholder="Value"
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-transparent text-sm"
                    aria-label="API key value"
                  />
                </div>
              )}
            </div>
          )}
        </div>

        {/* Body */}
        {['POST', 'PUT', 'PATCH'].includes(request.method) && (
          <div className="border-b border-gray-200">
            <button
              onClick={() => toggleSection('body')}
              className="w-full px-3 sm:px-4 py-3 flex items-center justify-between hover:bg-gray-50 transition-colors focus:outline-none focus:ring-2 focus:ring-blue-500"
              aria-expanded={expandedSections.body}
              aria-controls="body-section"
            >
              <div className="flex items-center space-x-2">
                {expandedSections.body ? (
                  <ChevronDown className="w-3 h-3 sm:w-4 sm:h-4 text-gray-500" aria-hidden="true" />
                ) : (
                  <ChevronRight className="w-3 h-3 sm:w-4 sm:h-4 text-gray-500" aria-hidden="true" />
                )}
                <span className="font-medium text-gray-900 text-sm sm:text-base">Body</span>
                <span className="text-xs sm:text-sm text-gray-500">JSON</span>
              </div>
            </button>
            
            {expandedSections.body && (
              <div id="body-section" className="px-3 sm:px-4 pb-4">
                <div className="border border-gray-300 rounded-md overflow-hidden">
                  <Editor
                    height="150px"
                    language="json"
                    value={request.body || ''}
                    onChange={(value) => handleBodyChange(value || '')}
                    theme="vs-light"
                    options={{
                      minimap: { enabled: false },
                      scrollBeyondLastLine: false,
                      fontSize: 12,
                      tabSize: 2,
                      wordWrap: 'on',
                      ariaLabel: 'Request body JSON editor',
                    }}
                  />
                </div>
              </div>
            )}
          </div>
        )}
      </div>
    </main>
  );
};

export default RequestPanel;