import create from 'zustand';

interface ISystemSettings {
  settings: any;
  setSettings: (settings: any) => void;
}

export const useSystemSettings = create<ISystemSettings>((set) => ({
  settings: {},
  setSettings: (settings: any) => set({settings}),
}));
