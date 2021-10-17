import React from 'react';
import * as UI from '@chakra-ui/react';
import {useRouter} from '@utils/hooks';

function ModuleGridItem({item, linkToChild}) {
  const {push} = useRouter();

  return (
    <UI.HStack
      //onClick={() => {push(linkToChild)}}
      onClick={() => {
        push(linkToChild + '/module/' + item?.id);
      }}
      key={item?.id}
      cursor="pointer"
      w="full"
      borderTopWidth={2}
      py={5}>
      <UI.Box
        bg={'white'}
        cursor="pointer"
        mr={3}
        shadow="md"
        p={4}
        w="68px"
        h="68px">
        <UI.Image
          src={
            item?.thumbnailMediaDestination?.replace(' ', '%20') ||
            item?.mediaDestination
          }></UI.Image>
      </UI.Box>
      <UI.Text
        textTransform="uppercase"
        color="#828282"
        fontWeight="bold"
        fontSize="18px">
        {item?.name}
      </UI.Text>
    </UI.HStack>
  );
}

export default React.memo(ModuleGridItem);
