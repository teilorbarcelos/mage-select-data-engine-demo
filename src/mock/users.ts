import type { MageSelectEngineConfig } from 'mage-select-data-engine';

export interface User {
  id: string;
  name: string;
  email: string;
}

// --- MOCK DATA GENERATOR ---
export const ALL_USERS: User[] = Array.from({ length: 2000 }, (_, i) => ({
  id: `${i + 1}`,
  name: `User ${i + 1}`,
  email: `user${i + 1}@example.com`,
}));

// Simulate API delay
export const delay = (ms: number) => new Promise(resolve => setTimeout(resolve, ms));

export const engineConfig: MageSelectEngineConfig<User> = {
  fetchPage: async (page: number, search: string, _options) => {
    await delay(500); // Simulate network latency
    
    let filtered = ALL_USERS;
    if (search) {
      filtered = ALL_USERS.filter(u => 
        u.name.toLowerCase().includes(search.toLowerCase()) || 
        u.email.toLowerCase().includes(search.toLowerCase())
      );
    }

    const pageSize = 10;
    const start = (page - 1) * pageSize;
    const end = start + pageSize;
    const items = filtered.slice(start, end);
    
    return {
      items,
      hasMore: end < filtered.length,
    };
  },
  fetchByIds: async (ids) => {
    await delay(300);
    return ALL_USERS.filter(u => ids.includes(u.id));
  },
  getId: (user) => user.id,
};

export const memoryOptimizedConfig: MageSelectEngineConfig<User> = {
  ...engineConfig,
  biDirectionalRechargeable: true,
};
