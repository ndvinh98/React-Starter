import React from 'react';
import LogoutModal from './modals/Logout.modal';
import RejectModal from './modals/Reject.modal';

function InitModal() {
  return (
    <>
      <LogoutModal />
      <RejectModal />
    </>
  );
}

export default InitModal;
export {useModalController} from './modals.controller';
