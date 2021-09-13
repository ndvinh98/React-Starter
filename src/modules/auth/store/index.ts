import create from 'zustand';

export interface IAuthStore {
  name: string;
}

const useAuthStore = create<IAuthStore>((set) => ({
  name: 'auth',
}));

export default useAuthStore;
