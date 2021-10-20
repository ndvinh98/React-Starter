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
  itemSelected: number[];
  addItem: (id: number) => void;
  removeItem: (id: number) => void;
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
    clear: () => {
      set({itemSelected: []});
    },
    addItem: (id: number) =>
      set((s) => ({...s, itemSelected: [...s.itemSelected, id]})),
    removeItem: (id: number) =>
      set((s) => ({
        ...s,
        itemSelected: s.itemSelected.filter((x) => x !== id),
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
