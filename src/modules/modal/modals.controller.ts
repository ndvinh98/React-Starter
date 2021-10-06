import create from 'zustand';

export interface IModalController {
  [key: string]: any;
  openModal: (name: string, data?: any) => void;
  closeModal: (name: string) => void;
  add_user: boolean;
  search: boolean;
  logout: boolean;
  confirmRequest: boolean;
  data: any;
  reject: boolean;
  action: boolean;
  fileViewer: boolean;

}

export const useModalController = create<IModalController>((set) => ({
  fileViewer: false,
  add_user: false,
  search: false,
  logout: false,
  confirmRequest: false,
  action: false,
  reject: false,
  data: null,
  openModal: (name: string, data?: any) => set({[name]: true, data}),
  closeModal: (name: string) => set({[name]: false, data: null}),
}));
