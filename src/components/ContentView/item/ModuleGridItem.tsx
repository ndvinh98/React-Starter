import React from 'react';
import * as UI from '@chakra-ui/react';
import {useRouter} from '@utils/hooks';

function ModuleGridItem({item, linkToChild}) {
  const {push} = useRouter();

  return (
    <UI.Box
      //onClick={() => {push(linkToChild)}}
      onClick={() => {
        push(linkToChild + '/module/' + item?.id);
      }}
      //onClick={() => {push(linkToChild+"?mediaType="+item?.mediaType+"&moduleId="+item?.moduleId)}}
      cursor="pointer"
      shadow="sm"
      height="200px"
      size="20px"
      borderWidth="2px"
      key={item?.id}>
      <UI.VStack
        h={'full'}
        w={'full'}
        justifyContent={'center'}
        alignItems={'center'}>
        <UI.Box w={'68px'} h={'68px'} bg={'white'} p={3}>
          <UI.Image
            src={
              item?.thumbnailMediaDestination?.replace(' ', '%20') ||
              item?.mediaDestination
            }></UI.Image>
        </UI.Box>
        <UI.Text fontWeight={'bold'} color={'#828282'}>
          {item?.name?.toUpperCase()}
        </UI.Text>
      </UI.VStack>
    </UI.Box>
  );
}

export default React.memo(ModuleGridItem);
