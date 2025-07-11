import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import { APIRequest, APIResponse, Tab } from '../types/api';

interface APIStore {
  tabs: Tab[];
  activeTabId: string | null;
  history: APIRequest[];
  savedRequests: APIRequest[];
  
  // Tab management
  addTab: (request?: APIRequest) => void;
  closeTab: (id: string) => void;
  setActiveTab: (id: string) => void;
  updateTab: (id: string, updates: Partial<Tab>) => void;
  
  // Request management
  updateRequest: (tabId: string, request: Partial<APIRequest>) => void;
  setResponse: (tabId: string, response: APIResponse) => void;
  setLoading: (tabId: string, loading: boolean) => void;
  
  // History and saved requests
  addToHistory: (request: APIRequest) => void;
  saveRequest: (request: APIRequest) => void;
  deleteRequest: (id: string) => void;
  
  // Utilities
  getActiveTab: () => Tab | null;
  duplicateTab: (id: string) => void;
}

const createDefaultRequest = (): APIRequest => ({
  id: crypto.randomUUID(),
  name: 'Untitled Request',
  method: 'GET',
  url: '',
  headers: {},
  auth: { type: 'none' },
  timestamp: Date.now(),
});

const createDefaultTab = (request?: APIRequest): Tab => ({
  id: crypto.randomUUID(),
  request: request || createDefaultRequest(),
  isLoading: false,
  isDirty: false,
});

export const useAPIStore = create<APIStore>()(
  persist(
    (set, get) => ({
      tabs: [createDefaultTab()],
      activeTabId: null,
      history: [],
      savedRequests: [],
      
      addTab: (request) => {
        const newTab = createDefaultTab(request);
        set((state) => ({
          tabs: [...state.tabs, newTab],
          activeTabId: newTab.id,
        }));
      },
      
      closeTab: (id) => {
        set((state) => {
          const tabs = state.tabs.filter(tab => tab.id !== id);
          let activeTabId = state.activeTabId;
          
          if (activeTabId === id) {
            activeTabId = tabs.length > 0 ? tabs[tabs.length - 1].id : null;
          }
          
          if (tabs.length === 0) {
            const defaultTab = createDefaultTab();
            tabs.push(defaultTab);
            activeTabId = defaultTab.id;
          }
          
          return { tabs, activeTabId };
        });
      },
      
      setActiveTab: (id) => {
        set({ activeTabId: id });
      },
      
      updateTab: (id, updates) => {
        set((state) => ({
          tabs: state.tabs.map(tab =>
            tab.id === id ? { ...tab, ...updates } : tab
          ),
        }));
      },
      
      updateRequest: (tabId, requestUpdates) => {
        set((state) => ({
          tabs: state.tabs.map(tab =>
            tab.id === tabId
              ? {
                  ...tab,
                  request: { ...tab.request, ...requestUpdates },
                  isDirty: true,
                }
              : tab
          ),
        }));
      },
      
      setResponse: (tabId, response) => {
        set((state) => ({
          tabs: state.tabs.map(tab =>
            tab.id === tabId
              ? { ...tab, response, isLoading: false }
              : tab
          ),
        }));
      },
      
      setLoading: (tabId, loading) => {
        set((state) => ({
          tabs: state.tabs.map(tab =>
            tab.id === tabId ? { ...tab, isLoading: loading } : tab
          ),
        }));
      },
      
      addToHistory: (request) => {
        set((state) => ({
          history: [request, ...state.history.filter(r => r.id !== request.id)].slice(0, 100),
        }));
      },
      
      saveRequest: (request) => {
        set((state) => ({
          savedRequests: [request, ...state.savedRequests.filter(r => r.id !== request.id)],
        }));
      },
      
      deleteRequest: (id) => {
        set((state) => ({
          savedRequests: state.savedRequests.filter(r => r.id !== id),
        }));
      },
      
      getActiveTab: () => {
        const state = get();
        return state.tabs.find(tab => tab.id === state.activeTabId) || null;
      },
      
      duplicateTab: (id) => {
        const state = get();
        const tab = state.tabs.find(t => t.id === id);
        if (tab) {
          const newRequest = {
            ...tab.request,
            id: crypto.randomUUID(),
            name: `${tab.request.name} Copy`,
            timestamp: Date.now(),
          };
          get().addTab(newRequest);
        }
      },
    }),
    {
      name: 'api-inspector-store',
      partialize: (state) => ({
        history: state.history,
        savedRequests: state.savedRequests,
      }),
    }
  )
);