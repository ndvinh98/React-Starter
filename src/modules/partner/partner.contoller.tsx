import create from 'zustand';

export interface IPartnerContoller {
  itemsSelected?: number[];
  allSelected?: number[];
  addSelectedItem?: (id: number) => void;
  removeSelectedItem?: (id: number) => void;
  removeSelectedWhenChangePage?: () => any;
}

export const usePartnerContoller = create<IPartnerContoller>((set, get) => ({
  itemsSelected: [],
  addSelectedItem: (id: number) => {
    const {itemsSelected} = get();
    if (!itemsSelected?.includes(id))
      set({itemsSelected: [...itemsSelected, id]});
  },
  addAllItem: (ids: number[]) => set({allSelected: ids}),
  removeSelectedItem: (id: number) => {
    const {itemsSelected} = get();
    if (itemsSelected?.includes(id))
      set({itemsSelected: itemsSelected?.filter((x) => x !== id)});
  },
}));
