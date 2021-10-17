import create from 'zustand';

interface IContentManagementController {
  itemSelected: number[];
  addItem: (id: number) => void;
  removeItem: (id: number) => void;
  clear: () => void;
}

export const useContentManagementController =
  create<IContentManagementController>((set) => ({
    itemSelected: [],
    clear: () => set({itemSelected: []}),
    addItem: (id: number) =>
      set((s) => ({...s, itemSelected: [...s.itemSelected, id]})),
    removeItem: (id: number) =>
      set((s) => ({
        ...s,
        itemSelected: s.itemSelected.filter((x) => x !== id),
      })),
  }));
