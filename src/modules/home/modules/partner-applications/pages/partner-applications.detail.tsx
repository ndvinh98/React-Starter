import React, {useEffect} from 'react';
import {useRouterController} from '@modules/router';
import {useGetItem} from '@utils/hooks';
import {IPartnerApplicationForms} from '@types';
import * as UI from '@chakra-ui/react';
import {isEmpty} from 'lodash';
import {useModalController} from '@modules/modal';

function Detail() {
  const {params} = useRouterController();
  const {getItem, data, loading} = useGetItem<IPartnerApplicationForms>(
    `/partnerApplicationForms`,
  );
  const {openModal} = useModalController();
  useEffect(() => {
    if (params?.id) getItem(null, {path: `/${params?.id}`});
  }, [params]);

  return loading ? (
    <UI.Center minH="300px">
      <UI.Spinner size="lg" color="ste.red" />
    </UI.Center>
  ) : isEmpty(data) ? (
    <UI.Center>
      <UI.Image src="" />
      <UI.Text>No data</UI.Text>
    </UI.Center>
  ) : (
    <UI.Box>
      {data.companyName}
      <UI.Button
        onClick={() => openModal('reject', {companyName: data?.companyName})}
        variant="outline">
        Reject
      </UI.Button>
    </UI.Box>
  );
}

export default Detail;
