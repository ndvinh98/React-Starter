import React, {memo, useState, useRef} from 'react';
import {isEmpty, keyBy} from 'lodash';
import * as UI from '@chakra-ui/react';
import Select from '@components/Select';
import UploadFilesSender from '@components/UploadMultipleFiles';
import {useQuery, useMutation} from 'react-query';

function SendFiles() {

  const uploadEl = useRef<any>(null);

  const toast = UI.useToast();
  const [usersSender, setUsersSender] = useState([]);
  const [subject, setSubject] = useState('');
  const [files, setFiles] = useState<File[]>([]);
  const [description, setDescription] = useState('');
  const [uploadStatus, setUploadStatus] = useState<'DONE' | 'FAIL' | 'PENDING'>(
    'PENDING',
  );

  const handleChangeSubject = (event) => setSubject(event.target.value);
  const handleChangeDescription = (event) => setDescription(event.target.value);

  const handleRemoveUser = (value: number) =>
    setUsersSender((s) => s.filter((x) => x?.value !== value));

  

  return (
    <UI.Box minH="77vh">
      <UI.VStack w="70vw" spacing="20px" bg="white" p={'40px'} shadow="sm">
        <UI.HStack w="full">
          <UI.Text w="300px">Select Name:</UI.Text>
          <UI.Box w="full">
            <Select
              w="full"
              placeholder="Select name"
              isMulti
              value={usersSender}
            //   options={data?.records?.map((x) => ({
            //     value: x.user?.id,
            //     label: `${x?.user?.firstName} ${x?.user?.lastName} `,
            //     email: x?.user?.email,
            //   }))}
            //   onChangeValue={setUsersSender}
            />
          </UI.Box>
        </UI.HStack>
        {!isEmpty(usersSender) && (
          <UI.HStack w="full">
            <UI.Text w="300px"></UI.Text>
            <UI.HStack w="full">
              {usersSender?.map?.((x) => (
                <UI.Tag
                  size="md"
                  borderRadius="full"
                  variant="solid"
                  bg="#E0E0E0"
                  color="#777777"
                  key={x?.value}>
                  {x?.email}
                  <UI.TagCloseButton
                    onClick={() => handleRemoveUser(x?.value)}
                  />
                </UI.Tag>
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
