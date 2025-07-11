import React, { useState } from 'react';
import { Copy, Download, ChevronDown, ChevronRight, Clock, Database } from 'lucide-react';
import { useAPIStore } from '../store/apiStore';
import Editor from '@monaco-editor/react';

const ResponsePanel: React.FC = () => {
  const [activeTab, setActiveTab] = useState<'body' | 'headers' | 'cookies'>('body');
  const [expandedSections, setExpandedSections] = useState({
    headers: false,
  });
  
  const { getActiveTab } = useAPIStore();
  const tab = getActiveTab();

  if (!tab || !tab.response) {
    return (
      <div className="flex-1 bg-gray-50 flex items-center justify-center min-w-0">
        <div className="text-center text-gray-500">
          <Database className="w-12 h-12 sm:w-16 sm:h-16 mx-auto mb-4 text-gray-300" />
          <p className="text-base sm:text-lg font-medium mb-2">No Response</p>
          <p className="text-sm">Send a request to see the response here</p>
        </div>
      </div>
    );
  }

  const { response } = tab;

  const getStatusColor = (status: number) => {
    if (status >= 200 && status < 300) return 'text-green-600 bg-green-50';
    if (status >= 300 && status < 400) return 'text-yellow-600 bg-yellow-50';
    if (status >= 400 && status < 500) return 'text-orange-600 bg-orange-50';
    if (status >= 500) return 'text-red-600 bg-red-50';
    return 'text-gray-600 bg-gray-50';
  };

  const formatSize = (bytes: number) => {
    if (bytes < 1024) return `${bytes} B`;
    if (bytes < 1024 * 1024) return `${(bytes / 1024).toFixed(1)} KB`;
    return `${(bytes / (1024 * 1024)).toFixed(1)} MB`;
  };

  const formatJson = (data: any) => {
    try {
      return JSON.stringify(data, null, 2);
    } catch {
      return String(data);
    }
  };

  const handleCopy = (text: string) => {
    navigator.clipboard.writeText(text);
  };

  const handleDownload = (content: string, filename: string) => {
    const blob = new Blob([content], { type: 'application/json' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = filename;
    a.click();
    URL.revokeObjectURL(url);
  };

  const toggleSection = (section: keyof typeof expandedSections) => {
    setExpandedSections(prev => ({
      ...prev,
      [section]: !prev[section]
    }));
  };

  return (
    <div className="flex-1 bg-white flex flex-col min-w-0">
      {/* Response Status */}
      <div className="p-3 sm:p-4 border-b border-gray-200">
        <div className="flex items-center justify-between">
          <div className="flex flex-col sm:flex-row sm:items-center space-y-2 sm:space-y-0 sm:space-x-4">
            <span className={`px-2 sm:px-3 py-1 rounded-full text-xs sm:text-sm font-medium ${getStatusColor(response.status)} w-fit`}>
              {response.status} {response.statusText}
            </span>
            <div className="flex items-center space-x-4">
              <div className="flex items-center space-x-1 sm:space-x-2 text-xs sm:text-sm text-gray-600">
                <Clock className="w-3 h-3 sm:w-4 sm:h-4" />
                <span>{response.duration}ms</span>
              </div>
              <div className="flex items-center space-x-1 sm:space-x-2 text-xs sm:text-sm text-gray-600">
                <Database className="w-3 h-3 sm:w-4 sm:h-4" />
                <span>{formatSize(response.size)}</span>
              </div>
            </div>
          </div>
          <div className="flex items-center space-x-1 sm:space-x-2">
            <button
              onClick={() => handleCopy(formatJson(response.data))}
              className="p-1.5 sm:p-2 text-gray-500 hover:text-gray-700 hover:bg-gray-100 rounded-md transition-colors"
              title="Copy response"
            >
              <Copy className="w-3 h-3 sm:w-4 sm:h-4" />
            </button>
            <button
              onClick={() => handleDownload(formatJson(response.data), 'response.json')}
              className="p-1.5 sm:p-2 text-gray-500 hover:text-gray-700 hover:bg-gray-100 rounded-md transition-colors"
              title="Download response"
            >
              <Download className="w-3 h-3 sm:w-4 sm:h-4" />
            </button>
          </div>
        </div>
      </div>

      {/* Response Tabs */}
      <div className="border-b border-gray-200">
        <div className="flex overflow-x-auto">
          <button
            onClick={() => setActiveTab('body')}
            className={`px-3 sm:px-4 py-2 text-xs sm:text-sm font-medium transition-colors whitespace-nowrap ${
              activeTab === 'body'
                ? 'text-blue-600 border-b-2 border-blue-600'
                : 'text-gray-600 hover:text-gray-900'
            }`}
          >
            Body
          </button>
          <button
            onClick={() => setActiveTab('headers')}
            className={`px-3 sm:px-4 py-2 text-xs sm:text-sm font-medium transition-colors whitespace-nowrap ${
              activeTab === 'headers'
                ? 'text-blue-600 border-b-2 border-blue-600'
                : 'text-gray-600 hover:text-gray-900'
            }`}
          >
            Headers ({Object.keys(response.headers).length})
          </button>
        </div>
      </div>

      {/* Response Content */}
      <div className="flex-1 overflow-hidden">
        {activeTab === 'body' && (
          <div className="h-full">
            <Editor
              height="100%"
              language="json"
              value={formatJson(response.data)}
              options={{
                readOnly: true,
                minimap: { enabled: false },
                scrollBeyondLastLine: false,
                fontSize: 12,
                tabSize: 2,
                wordWrap: 'on',
              }}
              theme="vs-light"
            />
          </div>
        )}
        
        {activeTab === 'headers' && (
          <div className="p-3 sm:p-4 space-y-2 overflow-y-auto">
            {Object.entries(response.headers).map(([key, value]) => (
              <div key={key} className="flex flex-col sm:flex-row sm:items-start space-y-1 sm:space-y-0 sm:space-x-4 p-2 sm:p-3 bg-gray-50 rounded-lg">
                <span className="font-medium text-gray-900 min-w-0 flex-shrink-0 text-sm">
                  {key}:
                </span>
                <span className="text-gray-700 break-all text-sm">{value}</span>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default ResponsePanel;