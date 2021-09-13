import {ELocalStorage} from '@constants';

const setAccessToken = ({set, partnerAccessToken, cb}) => {
  set(() => ({partnerAccessToken}));
  localStorage.setItem(ELocalStorage.ACCESS_TOKEN, partnerAccessToken);
  cb?.();
};

export default setAccessToken;
