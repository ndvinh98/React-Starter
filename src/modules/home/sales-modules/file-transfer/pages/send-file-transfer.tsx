import React, {useEffect, useState, useRef} from 'react';
import {isEmpty, keyBy} from 'lodash';
import * as UI from '@chakra-ui/react';
import Select from '@components/Select';
import UploadFilesSender from '@components/UploadMultipleFiles';
import {useGetList, useGetItem, usePost, useRouter} from '@utils/hooks';
import {uploadFile} from '@services';
import {useHomeController} from '@modules/home';
import {BsArrowLeft} from 'react-icons/bs';

function SendFiles() {
  const uploadEl = useRef<any>(null);
  const me = useHomeController((s) => s.me);
  const toast = UI.useToast();
  const [usersSender, setUsersSender] = useState([]);
  const [companySender, setCompanySender] = useState(null);
  const [subject, setSubject] = useState('');
  const [files, setFiles] = useState<File[]>([]);
  const [description, setDescription] = useState('');
  const [uploadStatus, setUploadStatus] = useState<'DONE' | 'FAIL' | 'PENDING'>(
    'PENDING',
  );
  const [loadingUpload, setLoadingUpload] = useState(false);

  const {data, getList} = useGetList('/partnerUserRelations');
  const {data: usersData, getList: getListUsers} = useGetList('/partnerUsers');

  useEffect(() => {
    getList({
      filter: JSON.stringify([{userId: me?.id, partner: {isActive: 1}}]),
      relations: JSON.stringify(['partner', 'partner.partnerDomain']),
    });
  }, []);

  useEffect(() => {
    if (companySender) {
      setUsersSender([]);
      getListUsers({
        filter: JSON.stringify([{domain: {id: companySender?.value}}]),
        relations: JSON.stringify(['domain']),
      });
    }
  }, [companySender]);
  const {push} = useRouter();

  const handleChangeSubject = (event) => setSubject(event.target.value);
  const handleChangeDescription = (event) => setDescription(event.target.value);

  const handleRemoveUser = (value: number) =>
    setUsersSender((s) => s.filter((x) => x?.value !== value));

  const {
    getItem,
    loading: loadingUploadUrl,
    data: dataUpload,
  } = useGetItem<any>(`userFileTransferAttachments/uploadFileUrl`);

  const {
    post: createFileTransfer,
    loading: loadingCreateFileTransfer,
    data: resCreateFileTransfer,
  } = usePost('/userFileTransfers');

  const {post: postUploadSuccess, loading: loadingPostUploadSuccess} = usePost(
    '/userFileTransferAttachments/uploadSuccess',
  );

  const handleSendFiles = () => {
    if (
      isEmpty(files) ||
      isEmpty(subject) ||
      isEmpty(usersSender) ||
      isEmpty(companySender)
    ) {
      toast({
        title: 'Warning!, Company, Name, Subject, Upload Files canot be blank',
        status: 'error',
        duration: 3000,
        isClosable: true,
        position: 'top-right',
      });
    } else {
      createFileTransfer({
        subject,
        description,
        partnerUserIds: usersSender.map((x) => x.value),
      });
    }
  };

  useEffect(() => {
    if (!isEmpty(resCreateFileTransfer)) {
      getItem({
        userFileTransferId: resCreateFileTransfer?.id,
        name: JSON.stringify(files.map((x) => x.name)),
        size: JSON.stringify(files.map((x) => x.size)),
        type: JSON.stringify(files.map((x) => x.type)),
      });
    }
  }, [resCreateFileTransfer]);

  useEffect(() => {
    if (!isEmpty(dataUpload)) {
      setLoadingUpload(true);
      const process = [];
      for (let i = 0; i < dataUpload.length; i++) {
        const worker = uploadFile(
          dataUpload[i]?.url,
          keyBy(files, 'name')[dataUpload[i].name],
        );
        process.push(worker);
      }
      Promise.all(process).then(() => {
        toast({
          title: 'Files sent!',
          status: 'success',
          duration: 3000,
          isClosable: true,
          position: 'top-right',
        });
        setFiles([]);
        setUsersSender([]);
        setUploadStatus('PENDING');
        setSubject('');
        setDescription('');
        uploadEl.current.clear?.();
        postUploadSuccess({fileTransferId: resCreateFileTransfer?.id});
        setLoadingUpload(false);
        push('/home/file-transfer/sent');
      });
    }
  }, [dataUpload]);

  return (
    <UI.Box p={8}>
      <UI.HStack
        mb={4}
        w="full"
        _hover={{cursor: 'pointer'}}
        onClick={() => push('/home/file-transfer/received')}>
        <BsArrowLeft size={20} />
        <UI.Text fontSize={'14px'}>Back</UI.Text>
      </UI.HStack>
      <UI.Text fontWeight={'bold'} fontSize={'20px'} mb={4}>
        File Transfer
      </UI.Text>
      <UI.VStack spacing="20px" bg="white" p={'40px'} shadow="sm">
        <UI.HStack w="full">
          <UI.Text w="300px">Select Company:</UI.Text>
          <UI.Box w="full">
            <Select
              w="full"
              placeholder="Select company"
              value={companySender}
              options={data?.records?.map((x) => ({
                value: x?.partner?.partnerDomain?.id,
                label: x?.partner?.companyName,
                //email: x?.user?.email,
              }))}
              onChangeValue={setCompanySender}
            />
          </UI.Box>
        </UI.HStack>
        <UI.HStack w="full">
          <UI.Text w="300px">Select Name:</UI.Text>
          <UI.Box w="full">
            <Select
              w="full"
              placeholder="Select name"
              isMulti
              isDisabled={isEmpty(usersData?.records) && !companySender}
              value={usersSender}
              options={usersData?.records?.map((x) => ({
                value: x?.id,
                label: `${x?.firstName} ${x?.lastName}`,
                email: x?.email,
                tag: `${x?.firstName} ${x?.lastName} (${x?.email})`,
              }))}
              onChangeValue={setUsersSender}
            />
          </UI.Box>
        </UI.HStack>
        {!isEmpty(usersSender) && (
          <UI.HStack w="full">
            <UI.Text w="300px"></UI.Text>
            <UI.HStack w="full" flexWrap="wrap" alignItems={"center"} >
              {usersSender?.map?.((x) => (
                <UI.VStack>
                  <UI.Tag
                    size="md"
                    borderRadius="full"
                    variant="solid"
                    bg="#E0E0E0"
                    color="#777777"
                    key={x?.value}>
                    {x?.tag}
                    <UI.TagCloseButton
                      onClick={() => handleRemoveUser(x?.value)}
                    />
                  </UI.Tag>
                  <UI.Box h={'2px'}></UI.Box>
                </UI.VStack>
              ))}
            </UI.HStack>
          </UI.HStack>
        )}
        <UI.HStack w="full">
          <UI.Text w="300px">Subject:</UI.Text>
          <UI.Box w="full">
            <UI.Input
              value={subject}
              onChange={handleChangeSubject}
              w="full"
              placeholder="Type subject"
            />
          </UI.Box>
        </UI.HStack>
        <UI.HStack w="full" alignItems="flex-start">
          <UI.Text w="300px">Upload Files:</UI.Text>
          <UI.Box w="full">
            <UploadFilesSender
              ref={uploadEl}
              value={files}
              name="files"
              uploadStatus={uploadStatus}
              onChangeValue={({files}) => setFiles(files)}
            />
          </UI.Box>
        </UI.HStack>
        <UI.HStack w="full" alignItems="flex-start">
          <UI.Text w="300px">Description:</UI.Text>
          <UI.Box w="full">
            <UI.Textarea
              value={description}
              onChange={handleChangeDescription}
              placeholder="Type your message..."
              rows={6}
            />
          </UI.Box>
        </UI.HStack>
        <UI.HStack w="full" alignItems="flex-start">
          <UI.Text w="300px"></UI.Text>
          <UI.HStack justifyContent="center" w="full">
            <UI.Button
              isLoading={
                loadingUploadUrl ||
                loadingCreateFileTransfer ||
                loadingPostUploadSuccess ||
                loadingUpload
              }
              onClick={handleSendFiles}
              w="150px">
              Send
            </UI.Button>
          </UI.HStack>
        </UI.HStack>
      </UI.VStack>
    </UI.Box>
  );
}

export default SendFiles;
