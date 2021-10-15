import create from 'zustand';

export interface IModalController {
  [key: string]: any;
  openModal: (name: string, data?: any) => void;
  closeModal: (name: string) => void;
  add_user: boolean;
  search: boolean;
  logout: boolean;
  confirmRequest: boolean;
  addBlacklistDomain: boolean;
  allowDomain: boolean;
  data: any;
  reject: boolean;
  action: boolean;
  actionPartner: boolean;
  fileViewer: boolean;
  fileViewer2: boolean;
  assignPartnerAdmin: boolean;
  addNewTier: boolean;
  removeTier: boolean;
}

export const useModalController = create<IModalController>((set) => ({
  assignPartnerAdmin: false,
  actionPartner: false,
  fileViewer: false,
  fileViewer2: false,
  addBlacklistDomain: false,
  add_user: false,
  search: false,
  logout: false,
  confirmRequest: false,
  allowDomain: false,
  action: false,
  reject: false,
  addNewTier: false,
  removeTier: false,
  data: null,
  openModal: (name: string, data?: any) => set({[name]: true, data}),
  closeModal: (name: string) => set({[name]: false, data: null}),
}));
