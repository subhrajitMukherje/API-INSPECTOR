import React, { useEffect } from 'react';
import { useAPIStore } from '../store/apiStore';
import Sidebar from '../components/Sidebar';
import TabBar from '../components/TabBar';
import RequestPanel from '../components/RequestPanel';
import ResponsePanel from '../components/ResponsePanel';
import Navbar from '../components/Navbar';

const DashboardPage: React.FC = () => {
  const { tabs, activeTabId, setActiveTab } = useAPIStore();

  useEffect(() => {
    // Set active tab to first tab if none is active
    if (tabs.length > 0 && !activeTabId) {
      setActiveTab(tabs[0].id);
    }
  }, [tabs, activeTabId, setActiveTab]);

  return (
    <div className="h-screen bg-gray-100 flex flex-col">
      <Navbar />
      <div className="flex-1 flex min-h-0">
        <Sidebar />
        <div className="flex-1 flex flex-col">
          <TabBar />
          <div className="flex-1 flex min-h-0">
            <RequestPanel />
            <div className="w-1 bg-gray-200 cursor-col-resize" />
            <ResponsePanel />
          </div>
        </div>
      </div>
    </div>
  );
};

export default DashboardPage;