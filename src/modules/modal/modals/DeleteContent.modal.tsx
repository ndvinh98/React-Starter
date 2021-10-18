import React, {memo, useEffect, useState} from 'react';
import * as UI from '@chakra-ui/react';
import {RiErrorWarningFill} from 'react-icons/ri';
import {useModalController} from '../modals.controller';
import {useRemove} from '@utils/hooks';

function DeleteContentModal() {
  const {deleteContent, closeModal, data} = useModalController();
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [isDone, setIsDone] = useState<boolean>(false);
  const toast = UI.useToast();

  useEffect(()=>{
    if (isDone) {
      data?.cb?.();
      closeModal('deleteContent');
      toast({
        status: 'success',
        description: 'Successfully!',
        position: 'top-right',
        isClosable: true,
        duration: 2000,
      });
    }
  },[isDone])


  const handleDeleteContent =() => {
    if (data?.itemDetailsSelected){
      //setIsLoading(true);
      for(let i=0; i< data?.itemDetailsSelected.length; i++){
        let {remove} = useRemove(data?.url+data?.itemDetailsSelected?.[i]?.id);
        remove();
      };
      //setIsLoading(false);
      setIsDone(true);
    };
  }

  return (
    <UI.Modal
      isCentered
      isOpen={deleteContent}
      onClose={() => closeModal('deleteContent')}>
      <UI.ModalOverlay />
      <UI.ModalContent position={'relative'} w="360px" minH="211px">
        <UI.Circle
          position={'absolute'}
          top={'-22px'}
          left={'50%'}
          transform={'translateX(-50%)'}
          size={'55px'}
          bg={'white'}>
          <UI.Circle>
            <RiErrorWarningFill color={'#E43A3A'} size={'50px'} />
          </UI.Circle>
        </UI.Circle>

        <UI.ModalHeader mt={8}>
          <UI.Center fontSize={'lg'} color={'ste.red'} textAlign="center">
            Delete Content
          </UI.Center>
        </UI.ModalHeader>
        <UI.ModalBody fontSize={'md'} textAlign={'center'}>
          <UI.Box fontSize={'md'} textAlign="center">
            {!data?.isResources ? (
              <UI.VStack>
                <UI.Text>
                  Are you sure you want to delete the following content? Please
                  note that all content in this {data?.name} will be deleted. This
                  action cannot be undone.
                </UI.Text>
                {data?.itemDetailsSelected?.map((x, index)=>{ 
                  return (
                    <UI.Text fontSize={'16px'} key={x?.id}>
                      {index+1}. {data?.name} - {x?.name}
                    </UI.Text>
                  )
                })}
              </UI.VStack>
            ) : (
              <UI.VStack>
              <UI.Text>
                Are you sure you want to delete the following content? This
                action cannot be undone.
              </UI.Text>
              {data?.itemDetailsSelected?.map((x, index)=>{ 
                return (
                  <UI.Text fontSize={'16px'} key={x?.id}>
                    {index+1}. {data?.name} - {x?.resourceName}
                  </UI.Text>
                )
              })}
            </UI.VStack>
            )}
          </UI.Box>
          <UI.Center mt={8} w={'full'}>
            <UI.Button
              colorScheme="blue"
              onClick={() => {
                handleDeleteContent()
              }}
              mr={3}
              w={'120px'}
              type="submit"
              isLoading={isLoading}>
              Confirm
            </UI.Button>
            <UI.Button
              w={'120px'}
              type="button"
              onClick={() => {
                closeModal('deleteContent');
              }}
              variant="outline">
              Cancel
            </UI.Button>
          </UI.Center>
        </UI.ModalBody>
        <UI.ModalFooter></UI.ModalFooter>
      </UI.ModalContent>
    </UI.Modal>
  );
}

export default memo(DeleteContentModal);
