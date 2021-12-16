import create from 'zustand';

import {fetchLanguages} from './fetchLanguages';
import {fetchSettings} from './fetchSetting';

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
  settings: any;
  fetchLanguages: () => Promise<void>;
  initDashboardConfig: () => void;
}

export const useConfigStore = create<IConfigStore>((set) => ({
  languages: [],
  settings: [],
  fetchLanguages: async () =>
    fetchLanguages().then((languages) => set({languages})),
  initDashboardConfig: () => {
    fetchLanguages().then((languages) => set({languages}));
    fetchSettings().then((settings) => set({settings}));
  },
}));
