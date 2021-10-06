import React, {useState, useEffect} from 'react';
import * as UI from '@chakra-ui/react';
import FormGenerate from '@components/FormGenerate';
import {COUNTRY_NAME} from '@constants';
import {BsArrowLeft} from 'react-icons/bs';
import {HiDotsHorizontal} from 'react-icons/hi';
import {useRouter, useFilter, useGetList, useGetItem} from '@utils/hooks';
import {useConfigStore} from '@services/config';
import {useRouterController} from '@modules/router';
import {IUsers, IUserProfiles} from '@types';
import LinkUpload from '@components/LinkUpLoad';
import {isEmpty} from 'lodash';

import {format} from 'date-fns';
import {keyBy} from 'lodash';
import {useModalController} from '@modules/modal';

import {useMedia} from '@utils/hooks';

import * as yup from 'yup';

function FeedbackDetail() {
  const {push} = useRouter();

  const {data, loading, getList} = useGetList('/partnerUserFeedbacks');
  const {params} = useRouterController();
  const [partnerUser, setPartnerUser] = useState<any>();
  const [attachments, setAttachments] = useState<any>();

  useEffect(() => {
    if (data) {
      setPartnerUser(data?.records[0]?.partnerUser);
      setAttachments(data?.records[0]?.partnerUserFeedbackAttachments);
    }
  }, [data]);

  useEffect(() => {
    if (params?.id) {
      getList({
        limit: 1,
        filter: JSON.stringify([{id: params?.id}]),
        relations: JSON.stringify([
          'partnerUser',
          'partnerUserFeedbackAttachments',
        ]),
      });
    }
  }, [params]);

  return (
    <>
      {isEmpty(data?.records) ? (
        <UI.Center>Not Found</UI.Center>
      ) : (
        <UI.VStack alignItems={'start'} py={6} px={8}>
          <UI.HStack
            w="full"
            _hover={{cursor: 'pointer'}}
            onClick={() => push('/home/feedback')}>
            <BsArrowLeft size={20} />
            <UI.Text fontSize={'14px'}>Back</UI.Text>
          </UI.HStack>
          <UI.HStack>
            <UI.Text fontWeight={'bold'} fontSize={'20px'}>
              Feedback Form -{' '}
              {partnerUser
                ? partnerUser?.firstName +
                  ' ' +
                  partnerUser?.lastName +
                  ' ' +
                  '<' +
                  partnerUser?.email +
                  '>'
                : undefined}
            </UI.Text>
            <UI.Button
              onClick={() => {
                push("/home/user-management/"+partnerUser?.id)
              }}
              bgColor={'#D94645'}
              size={'sm'}
              
              >
              View Profile
            </UI.Button>
          </UI.HStack>
        </UI.VStack>
      )}
    </>
  );
}

export default FeedbackDetail;
