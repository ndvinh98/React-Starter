import React, {useEffect} from 'react';
import * as UI from '@chakra-ui/react';
import {BsArrowLeft} from 'react-icons/bs';
import {useRouter, usePost} from '@utils/hooks';
import UploadFileContent from '@components/UploadFileContent';
import FormGenerate from '@components/FormGenerate';
import * as yup from 'yup';

const STOCK = [
  'https://i.imgur.com/Q04dMOc.png',
  'https://i.imgur.com/2NpnErN.png',
  'https://i.imgur.com/wSX6CPl.png',
  'https://i.imgur.com/Y3lAWKG.png',
  'https://i.imgur.com/1okhbVx.png',
];

function AddNew() {
  const {push} = useRouter();
  const toast = UI.useToast();
  let mediaDestination = '';
  const {post, loading, data: postData} = usePost('/applications');
  useEffect(() => {
    if (postData) {
      toast({
        title: 'Successfully!',
        status: 'success',
        duration: 2000,
        position: 'top-right',
        isClosable: true,
      });
      push('/home/content-management/line-of-business');
    }
  }, [postData]);

  const handleSubmit = (value) => {
    if (value && mediaDestination) {
      post({
        name: value.name,
        lineOfBusiness: 1,
        mediaDestination,
      });
    }
  };

  return (
      <UI.Box py={5} px={7}>
        <UI.HStack
          w="full"
          _hover={{cursor: 'pointer'}}
          onClick={() => push('/home/content-management/line-of-business')}>
          <BsArrowLeft size={20} />
          <UI.Text fontSize={'14px'}>Back</UI.Text>
        </UI.HStack>
        <UI.Text fontSize="24px" fontWeight="bold">
          Content Management - Line of Business
        </UI.Text>
        <UI.VStack
          spacing="20px"
          alignItems="flex-start"
          mt={3}
          py={5}
          px={7}
          bg="white"
          shadow="md">
          <UI.Text fontSize="16px" fontWeight="bold">
            ADD NEW LINE OF BUSINESS
          </UI.Text>
          <FormGenerate
            spacing={6}
            onSubmit={(value) => {
              handleSubmit(value);
            }}
            schema={{
              name: yup.string().required('Line of Business Name is required'),
            }}
            fields={[
              {
                name: 'name',
                type: 'input',
                label: 'Line of Business Name',
                size: 'md',
                layout: 'horizontal',
                width: '70%',
              },
              {
                type: 'decor',
                layout: 'horizontal',
                colSpan: 12,
                width: '100%',
                size: 'md',
                DecorComponent: () => (
                  <UploadFileContent
                    urlPath={'/products/uploadThumbnailUrl'}
                    isChooseStock={true}
                    listStock={STOCK}
                    callBack={(value) => {
                      mediaDestination = value;
                      //console.log(thumb);
                    }}
                  />
                ),
              },
            ]}>
            <UI.Center mt={4} w="full">
              <UI.Button type={'submit'} isLoading={loading} w="150px">
                Create
              </UI.Button>
            </UI.Center>
          </FormGenerate>
        </UI.VStack>
      </UI.Box>
  );
}

export default AddNew;
