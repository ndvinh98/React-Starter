import React, {memo} from 'react';
import {isEmpty} from 'lodash';

import * as UI from '@chakra-ui/react';
import {HTMLChakraProps} from '@chakra-ui/system';
import {AiOutlineDownload} from 'react-icons/ai';
import {usePartnerContoller} from '@modules/partner/partner.contoller';
import {useModalController} from '@modules/modal';

export interface IBtnLayoutGroup extends HTMLChakraProps<'div'> {
  onDownloadAll?: () => void;
  onSelectCheckedChange?: (status: boolean) => void;
  type: 'grouping' | 'productModules' | 'productModuleResources';
  allIds: number[];
}

function BtnLayoutGroup(props: IBtnLayoutGroup) {
  const {onSelectCheckedChange, type, allIds} = props;
  const itemsSelected = usePartnerContoller((s) => s.itemsSelected);
  const openModal = useModalController((s) => s.openModal);

  return (
    <UI.HStack {...props}>
      <UI.Checkbox
        w={'200px'}
        isChecked={!isEmpty(itemsSelected)}
        onChange={(e) => onSelectCheckedChange?.(e?.target?.checked)}
        size={'lg'}>
        <UI.Text
          onClick={() => {
            if (isEmpty(itemsSelected)) return;
            if (type === 'grouping') {
              openModal('groupingDownload', {ids: itemsSelected});
            }
            if (type === 'productModules') {
              openModal('productModulesDownload', {ids: itemsSelected});
            }
            if (type === 'productModuleResources') {
              openModal('productModuleResourcesDownload', {ids: itemsSelected});
            }
          }}
          cursor={isEmpty(itemsSelected) ? 'no-drop' : 'pointer'}
          color={isEmpty(itemsSelected) ? '#9097A9' : 'ste.red'}>
          Download Selected
        </UI.Text>
      </UI.Checkbox>
      <UI.Button
        onClick={() => {
          if (type === 'grouping') {
            openModal('groupingDownload', {ids: allIds});
          }
          if (type === 'productModules') {
            openModal('productModulesDownload', {ids: allIds});
          }
          if (type === 'productModuleResources') {
            openModal('productModuleResourcesDownload', {ids: allIds});
          }
        }}
        leftIcon={<AiOutlineDownload size={'22px'} />}>
        Download all
      </UI.Button>
    </UI.HStack>
  );
}

export default memo(BtnLayoutGroup);
