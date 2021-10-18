import create from 'zustand';

interface IContentManagementController {
  itemSelected: number[];
  itemDetailsSelected: object[];
  addItem: (id: number) => void;
  addDetailsItem: (item: object) => void;
  removeItem: (id: number) => void;
  removeDetailsItem: (item: object) => void;
  clear: () => void;
}

export const useContentManagementController =
  create<IContentManagementController>((set) => ({
    itemSelected: [],
    itemDetailsSelected: [],
    clear: () => {set({itemDetailsSelected: []});set({itemSelected: []})},
    addItem: (id: number) =>
      set((s) => ({...s, itemSelected: [...s.itemSelected, id]})),
    removeItem: (id: number) =>
      set((s) => ({
        ...s,
        itemSelected: s.itemSelected.filter((x) => x !== id),
      })),
    addDetailsItem: (item: object) =>
      set((s) => ({...s, itemDetailsSelected: [...s.itemDetailsSelected, item]})),
    removeDetailsItem: (item: object) =>
      set((s) => ({
        ...s,
        itemDetailsSelected: s.itemDetailsSelected.filter((x) => x !== item),
      })),
  }));
