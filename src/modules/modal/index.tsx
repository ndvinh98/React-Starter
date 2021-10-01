import React from 'react';
import ConfirmModal from './modals/Confirm.modal';
import LogoutModal from './modals/Logout.modal';
import RejectModal from './modals/Reject.modal';
import ActionModal from './modals/Action.modal';

function InitModal() {
  return (
    <>
      <LogoutModal />
      <RejectModal />
      <ConfirmModal />
      <ActionModal />
    </>
  );
}

export default InitModal;
export {useModalController} from './modals.controller';
