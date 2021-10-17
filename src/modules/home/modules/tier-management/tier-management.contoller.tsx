import create from 'zustand';
import {getProducts} from '@services';
import {keyBy} from 'lodash';
export interface ITierManagementContoller {
  products: any;
  setProducts: (products: any) => void;
  getProducts: () => void;
}

export const useTierManagementContoller = create<ITierManagementContoller>(
  (set) => ({
    products: {},
    setProducts: (products: any) => set({products}),
    getProducts: () =>
      getProducts().then((data) => {
        if (data?.records) set({products: keyBy(data?.records, 'id')});
      }),
  }),
);
