import React from 'react';
import ConfirmModal from './modals/Confirm.modal';
import LogoutModal from './modals/Logout.modal';
import RejectModal from './modals/Reject.modal';
import ActionModal from './modals/Action.modal';
import FileViewer from './modals/FileViewer.modal';
import FileViewer2 from './modals/FileViewer2.modal';
import AllowDomainModal from './modals/AllowDomain.modal';
import AddBlacklistDomainModal from './modals/AddBlacklistDomain.modal';
import AssignPartnerAdminModal from './modals/AssignPartnerAdmin.modal';
import ActionPartnerModal from './modals/ActionPartner.modal';
import AddNewTier from './modals/AddNewTier.modal';
import RemoveTier from './modals/RemoveTier.modal';
import AddSale from './modals/AddSale.modal';
import DeleteContentModal from './modals/DeleteContent.modal'

function InitModal() {
  return (
    <>
      assignPartnerAdmin
      <LogoutModal />
      <RejectModal />
      <ConfirmModal />
      <ActionModal />
      <FileViewer />
      <FileViewer2 />
      <AllowDomainModal />
      <AddBlacklistDomainModal />
      <AssignPartnerAdminModal />
      <ActionPartnerModal />
      <AddNewTier />
      <RemoveTier />
      <AddSale />
      <DeleteContentModal/>
    </>
  );
}

export default InitModal;
export {useModalController} from './modals.controller';
