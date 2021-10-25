import React, {useEffect} from 'react';
import * as UI from '@chakra-ui/react';
import {format} from 'date-fns';

import {useRouterController} from '@modules/router';
import {useModalController} from '@modules/modal';
import {useGetItem} from '@utils/hooks';
//import {getFileTransfersDetail, getDownloadFileUrl} from '@services';
import LoadingComponent from '@components/LoadingComponent';
import {isEmpty} from 'lodash';

function Detail() {
  const {params} = useRouterController();
  const {getItem, data, loading} = useGetItem(`/userFileTransfers/`);
  useEffect(() => {
    if (params?.id) {
      getItem(
        {
          cache: false,
          relations: JSON.stringify([
            'userFileTransferRecipients',
            'userFileTransferRecipients.partnerUser',
            'userFileTransferAttachments',
          ]),
        },
        {path: params?.id},
      );
    }
  }, [params]);

  return (
    <LoadingComponent length={data ? 1 : 0} isLoading={loading}>
      <UI.Box minH="77vh" p={8}>
        <UI.HStack>
          <UI.Text fontWeight="bold" fontSize="20px" textTransform="uppercase">
            File Transfer
          </UI.Text>
        </UI.HStack>
        <UI.Box mt={4} bg="white" shadow="sm" p={5}>
          <UI.VStack spacing="20px">
            <UI.HStack alignItems="flex-start" w="full">
              <UI.Text w="300px">Sent to:</UI.Text>
              <UI.Box>
                {data?.userFileTransferRecipients?.map((x) => (
                  <UI.Text key={x?.id}>
                    {x?.partnerUser?.firstName}
                    {x?.partnerUser?.lastName}
                    {x?.partnerUser?.email}
                  </UI.Text>
                ))}
              </UI.Box>
            </UI.HStack>
            <UI.HStack alignItems="flex-start" w="full">
              <UI.Text w="300px">Date sent:</UI.Text>
              {data?.createdAt && (
                <UI.Text>
                  {format(new Date(data?.createdAt), 'dd MMM yyyy')}
                </UI.Text>
              )}
            </UI.HStack>
            <UI.HStack alignItems="flex-start" w="full">
              <UI.Text w="300px">Subject:</UI.Text>
              <UI.Text>{data?.subject}</UI.Text>
            </UI.HStack>
            <UI.HStack alignItems="flex-start" w="full">
              <UI.Text w="300px">Attached Files:</UI.Text>
              {!isEmpty(data?.userFileTransferAttachments) && (
                <UI.VStack alignItems="flex-start" w="calc(100% - 300px)">
                  {data?.userFileTransferAttachments.map((x) => (
                    <FileItem key={x?.id} file={x} />
                  ))}
                </UI.VStack>
              )}
            </UI.HStack>
            <UI.HStack alignItems="flex-start" w="full">
              <UI.Text w="300px">Description:</UI.Text>
              <UI.Text>{data?.description}</UI.Text>
            </UI.HStack>
          </UI.VStack>
        </UI.Box>
      </UI.Box>
    </LoadingComponent>
  );
}

const FileItem = ({file}) => {
  const {openModal} = useModalController();
  return (
    <UI.HStack
      px={3}
      py={2}
      fontWeight="bold"
      justifyContent="space-between"
      bg="#F7F7F7"
      minW="200px"
      w="40%">
      <UI.Text>{file?.fileName}</UI.Text>
      <UI.Button
        onClick={() =>
          openModal('fileViewer', {
            url: 'productModuleResources/downloadFileUrl',
            title: file?.fileName,
            payload: file,
          })
        }
        //isDisabled={loading}
        borderRadius={0}
        cursor="pointer"
        bg="#E9E9E9"
        fontWeight="normal"
        fontSize="13px">
        <UI.Text color="#000" fontSize="13px">
          View
        </UI.Text>
      </UI.Button>
    </UI.HStack>
  );
};

export default Detail;
