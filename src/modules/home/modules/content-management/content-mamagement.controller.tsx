import create from 'zustand';
import {
  IApplication,
  ILineProduct,
  IProductGroup,
  IProducts,
  IModules,
} from '@types';
import {
  getAllLineBusiness,
  getAllLineProduct,
  getAllProductGroup,
  getAllProducts,
  getAllModules,
} from '@services';

interface IContentManagementController {
  itemSelected: any[];
  addItem: (id: any) => void;
  removeItem: (id: any) => void;
  clear: () => void;
  allLineBusiness: IApplication[];
  allLineProduct: ILineProduct[];
  allProductGroup: IProductGroup[];
  allProducts: IProducts[];
  allModules: IModules[];
  getAllLineBusiness: () => void;
  getAllLineProduct: () => void;
  getAllProducts: () => void;
  getAllModules: () => void;
}

export const useContentManagementController =
  create<IContentManagementController>((set) => ({
    allLineBusiness: [],
    allLineProduct: [],
    allProductGroup: [],
    allProducts: [],
    allModules: [],

    itemSelected: [],
    clear: () => set({itemSelected: []}),
    addItem: (item: any) =>
      set((s) => ({...s, itemSelected: [...s.itemSelected, item]})),
    removeItem: (item: any) =>
      set((s) => ({
        ...s,
        itemSelected: s.itemSelected.filter((x) => x?.id !== item?.id),
      })),
    getAllLineBusiness: () =>
      getAllLineBusiness().then((res) => {
        set({allLineBusiness: res});
      }),
    getAllLineProduct: () =>
      getAllLineProduct().then((res) => set({allLineProduct: res})),

    getAllProductGroup: () =>
      getAllProductGroup().then((res) => set({allProductGroup: res})),

    getAllProducts: () =>
      getAllProducts().then((res) => set({allProducts: res})),

    getAllModules: () => getAllModules().then((res) => set({allModules: res})),
  }));
