import React, {memo, useState} from 'react';
import {isEmpty, keyBy} from 'lodash';
import * as UI from '@chakra-ui/react';
import {usePost, useRouter, useGetList} from '@utils/hooks';
import {BsArrowLeft} from 'react-icons/bs';
import FormGenerate from '@components/FormGenerate';
import * as yup from 'yup';

function SendFiles() {
  const {push} = useRouter();
  const toast = UI.useToast();
  const [files, setFiles] = useState<File[]>([]);
  const [isDisableBtnSend, setIsDisableBtnSend] = useState(true);

  const [uploadStatus, setUploadStatus] = useState<'DONE' | 'FAIL' | 'PENDING'>(
    'PENDING',
  );

  const handleSendFiles = ({description, subject, userIds, files}) => {
    setFiles(files);
  };
  const [resCreateFileTransfer, setResCreateFileTransfer] = useState(null);

  const sendFiles = useMutation(createFileTransfers, {
    onSuccess: (data: any) => {
      if (data?.id) {
        setResCreateFileTransfer(data);
        setIsDisableBtnSend(true);
        setUploadStatus('DONE');
      }
    },
  });

  const {post: postUploadSuccess} = usePost(
    '/fileTransferAttachments/uploadSuccess',
  );

  // const getUrlUpload = useMutation(getUploadSenderFilesUrl, {
  //   onSuccess: (data: any) => {
  //     if (!isEmpty(data)) {
  //       const process = [];
  //       for (let i = 0; i < data.length; i++) {
  //         const worker = s3UploadFile({
  //           url: data[i]?.url,
  //           fileData: keyBy(files, 'name')[data[i].name],
  //         });
  //         process.push(worker);
  //       }
  //       Promise.all(process).then(() => {
  //         postUploadSuccess({fileTransferId: resCreateFileTransfer?.id});
  //         toast({
  //           title: 'Files sent!',
  //           status: 'success',
  //           duration: 3000,
  //           isClosable: true,
  //           position: 'top-right',
  //         });
  //       });
  //     }
  //   },
  //   onError: () => setUploadStatus('FAIL'),
  // });

  return (
    <UI.Box minH="77vh">
      <UI.HStack
        mb={4}
        w="full"
        _hover={{cursor: 'pointer'}}
        onClick={() => push('/ste/file-transfer')}>
        <BsArrowLeft size={20} />
        <UI.Text fontSize={'14px'}>Back</UI.Text>
      </UI.HStack>
      <UI.HStack mb={4}>
        <UI.Text fontWeight="bold" fontSize="20px" textTransform="uppercase">
          File Transfer
        </UI.Text>
      </UI.HStack>
      <UI.VStack w="70vw" spacing="20px" bg="white" p={'40px'} shadow="sm">
        <FormGenerate
          onSubmit={handleSendFiles}
          onChangeValue={() => setIsDisableBtnSend(false)}
          schema={{
            subject: yup.string().required('Subject is required'),
            description: yup.string().nullable(),
            userIds: yup
              .array()
              .min(1, 'Users is required')
              .required('Users is required'),
            files: yup
              .array()
              .required('Files is required')
              .min(1, 'Files is required')
              .max(5, 'Only allow 5 files maximum each time for upload.'),
          }}
          fields={[
            {
              type: 'select-picker',
              name: 'userIds',
              placeholder: 'Select your request...',
              layout: 'horizontal',
              label: 'Select Company:',
              width: '80%',
              fieldStyled: {
                alignItems: 'flex-start',
              },
              // options: data?.records?.map((x) => ({
              //   value: x.user?.id,
              //   label: `${x?.user?.firstName} ${x?.user?.lastName} (${x?.user?.email})`,
              //   email: x?.user?.email,
              // })),
            },
            {
              name: 'subject',
              type: 'input',
              placeholder: 'Type subject',
              label: 'Subject',
              layout: 'horizontal',
              width: '80%',
            },
            {
              type: 'upload-multiple-files',
              label: 'Upload Files:',
              name: 'files',
              layout: 'horizontal',
              uploadStatus,
              fieldStyled: {
                alignItems: 'flex-start',
              },
              width: '80%',
            },
            {
              name: 'description',
              type: 'textarea',
              height: '150px',
              placeholder: 'Type your message...',
              label: 'Description:',
              layout: 'horizontal',
              width: '80%',
              alignItem: 'flex-start',
              fieldStyled: {
                alignItems: 'flex-start',
              },
            },
          ]}>
          <UI.Center>
            <UI.Button
              isDisabled={isDisableBtnSend}
              mt={5}
              w={'200px'}
              type={'submit'}>
              Send
            </UI.Button>
          </UI.Center>
        </FormGenerate>
      </UI.VStack>
    </UI.Box>
  );
}

export default memo(SendFiles);
