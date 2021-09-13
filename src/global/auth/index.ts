import create from 'zustand';
// import router from '@router';
import {ELocalStorage} from '@constants';
import {IAuthStore} from './type';

// import {loginVerifyOtp, getMe} from '@services';
import {checkUserRole} from './usecase/checkUserRole';

const {ACCESS_TOKEN, REMEMBER_ACCESS_TOKEN} = ELocalStorage;

export const useAuthStore = create<IAuthStore>((set, get) => ({
  isLoading: false,
  isChecked: false,
  toPath: '',
  me: null,
  accessToken: '',
  loginVerifyOtp: async ({email, otpCode}) => {
    // const auth = await loginVerifyOtp({email, otpCode});
    // if (auth?.token) {
    //   localStorage.setItem(ELocalStorage.ACCESS_TOKEN, String(auth.token));
    //   set({accessToken: auth.token});
    //   router.push('/');
    // }
  },
  logout: () => {
    set({me: {}, accessToken: ''});
    localStorage.removeItem(ACCESS_TOKEN);
    location.reload();
  },
  setToken: (accessToken: string) => {
    set({accessToken});
  },
  getToken: () => {
    const {accessToken} = get();
    const isRemember = !!+localStorage.getItem(REMEMBER_ACCESS_TOKEN);
    const localStorageToken = localStorage.getItem(ACCESS_TOKEN);
    return (isRemember && localStorageToken) || accessToken;
  },
  getMe: async () => {
    // const me = await getMe();
    // set({me});
    return {};
  },
  checkUserRole: async () => checkUserRole(),
  clearMe: () => set({me: null}),
}));
