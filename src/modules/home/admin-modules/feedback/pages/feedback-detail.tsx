import React, {useState, useEffect, useMemo} from 'react';
import * as UI from '@chakra-ui/react';
import {BsArrowLeft} from 'react-icons/bs';
import {useRouter, useGetList} from '@utils/hooks';
import {useRouterController} from '@modules/router';
import {isEmpty} from 'lodash';

import {format} from 'date-fns';
import {useModalController} from '@modules/modal';

function FeedbackDetail() {
  const {push} = useRouter();
  const {openModal} = useModalController();
  const {data, getList} = useGetList('/partnerUserFeedbacks');
  const {params} = useRouterController();

  const getFileName = (name: string) => {
    if (!name) return undefined;
    const names = name?.split('/');
    if (!names.length) return name;
    return names?.[names?.length - 1];
  };

  const attachments = useMemo(()=>{
    return data?.records?.[0]?.partnerUserFeedbackAttachments
  },[data])

  const partnerUser = useMemo(()=>{
    return data?.records?.[0]?.partnerUser
  },[data])

  useEffect(() => {
    if (params?.id) {
      getList({
        limit: 1,
        filter: JSON.stringify([{id: params?.id}]),
        relations: JSON.stringify([
          'partnerUser',
          'partnerUser.domain',
          'partnerUser.domain.partners',
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
                if (
                  !isEmpty(partnerUser) &&
                  partnerUser?.domain?.partners?.[0]?.id
                ) {
                  push(
                    '/home/partner-management/company/' +
                      partnerUser?.domain?.partners?.[0]?.id +
                      '/user/' +
                      partnerUser?.id,
                  );
                }
              }}
              bgColor={'#D94645'}
              size={'sm'}>
              View Profile
            </UI.Button>
          </UI.HStack>

          <UI.Box bg={'white'} p={4} w={'100%'}>
            <UI.HStack mb={4} alignItems={'start'}>
              <UI.Text fontWeight={'bold'} w={'20%'}>
                Feedback:
              </UI.Text>
              <UI.Text>{data?.records?.[0]?.feedbackSubject}</UI.Text>
            </UI.HStack>

            <UI.HStack mb={4} alignItems={'start'}>
              <UI.Text fontWeight={'bold'} w={'20%'}>
                Date received:
              </UI.Text>
              <UI.Text>
                {format(new Date(data?.records?.[0]?.createdAt), 'dd MMM yyyy')}
              </UI.Text>
            </UI.HStack>

            <UI.HStack mb={4} alignItems={'start'}>
              <UI.Text fontWeight={'bold'} w={'20%'}>
                Message:
              </UI.Text>
              <UI.Text>{data?.records?.[0]?.feedbackMessage}</UI.Text>
            </UI.HStack>

            <UI.HStack mb={4} alignItems={'start'}>
              <UI.Text fontWeight={'bold'} w={'20%'}>
                Attachments:
              </UI.Text>
              <UI.VStack>
                {attachments
                  ? attachments.map((item, index) => {
                      return (
                        <UI.HStack
                          key={index}
                          bg={'#F7F7F7'}
                          justifyContent={'space-between'}
                          p={2}
                          w={'600px'}>
                          <UI.Text fontWeight={'bold'}>
                            {getFileName(item?.mediaDestination)}
                          </UI.Text>
                          <UI.Button
                            onClick={() =>
                              openModal('fileViewer', {
                                url:'partnerUserFeedbackAttachments/downloadFileUrl',
                                title: item?.name,
                                payload: item,
                              })
                            }
                            bgColor={'#E9E9E9'}
                            color={'#54565A'}
                            size={'sm'}
                            _hover={{bgColor: '#28C76F', color: 'white'}}
                            colorScheme="#EEFCEA">
                            View
                          </UI.Button>
                        </UI.HStack>
                      );
                    })
                  : undefined}
              </UI.VStack>
            </UI.HStack>
          </UI.Box>
        </UI.VStack>
      )}
    </>
  );
}

export default FeedbackDetail;
