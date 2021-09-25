import create from 'zustand';

import {fetchLanguages} from './fetchLanguages';

export interface ILanguages {
  id: number;
  isActive: 1 | 0;
  name?: string;
  isoCode?: string;
  languageCode?: string;
  locale?: string;
  createdAt?: Date;
  updatedAt?: Date;
}

export interface IConfigStore {
  languages: ILanguages[];
  fetchLanguages: () => Promise<void>;
  initAuthConfig: () => void;
  initDashboardConfig: () => void;
  initRegisterConfig: () => void;
}

export const useConfigStore = create<IConfigStore>((set) => ({
  languages: [],
  fetchLanguages: async () => {
    const languages = await fetchLanguages();
    set({languages});
  },
  initAuthConfig: async () => {
    const languages = await fetchLanguages();
    set({languages});
  },
  initDashboardConfig: async () => {
    const languages = await fetchLanguages();
    set({languages});
  },
  initRegisterConfig: async () => {
    const languages = await fetchLanguages();
    set({languages});
  },
}));
