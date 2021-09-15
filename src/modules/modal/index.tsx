import React from 'react';
import LogoutModal from './modals/Logout.modal';

function InitModal() {
  return (
    <>
      <LogoutModal />
    </>
  );
}

export default InitModal;
export {useModalController} from './modals.controller';
