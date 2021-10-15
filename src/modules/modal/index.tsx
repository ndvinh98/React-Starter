import React from 'react';
import ConfirmModal from './modals/Confirm.modal';
import LogoutModal from './modals/Logout.modal';
import RejectModal from './modals/Reject.modal';
import ActionModal from './modals/Action.modal';
import FileViewer from './modals/FileViewer.modal';
import FileViewer2 from './modals/FileViewer.modal';
import AllowDomainModal from './modals/AllowDomain.modal';
import AddBlacklistDomainModal from './modals/AddBlacklistDomain.modal';
import AddNewTier from './modals/AddNewTier.modal';
import RemoveTier from './modals/RemoveTier.modal';

function InitModal() {
  return (
    <>
      <LogoutModal />
      <RejectModal />
      <ConfirmModal />
      <ActionModal />
      <FileViewer />
      <FileViewer2 />
      <AllowDomainModal />
      <AddBlacklistDomainModal />
      <AddNewTier />
      <RemoveTier />
    </>
  );
}

export default InitModal;
export {useModalController} from './modals.controller';
