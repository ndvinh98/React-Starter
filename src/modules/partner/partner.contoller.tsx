import create from 'zustand';

export interface IPartnerContoller {
  lineOfBusinessId?: number;
  itemsSelected?: number[];
  allSelected?: number[];
  addSelectedItem?: (id: number) => void;
  removeSelectedItem?: (id: number) => void;
  removeSelectedWhenChangePage?: () => any;
  setLineOfBusinessId?: (id: number) => void;
}

export const usePartnerContoller = create<IPartnerContoller>((set, get) => ({
  itemsSelected: [],
  lineOfBusinessId: 0,
  setLineOfBusinessId: (id: number) => set({lineOfBusinessId: id}),
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
