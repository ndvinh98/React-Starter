import React, {memo} from 'react';
import * as UI from '@chakra-ui/react';
import {useRouterController} from '@modules/router';
import {useRouter} from '@utils/hooks';

const IMAGES = {
  BROCHURES: {id: 1, image: 'https://i.imgur.com/SDIkQIE.png'},
  VIDEOS: {id: 2, image: 'https://i.imgur.com/32ziTDI.png'},
  FORMS: {id: 3, image: 'https://i.imgur.com/qit14J8.png'},
  CASESTUDIES: {id: 4, image: 'https://i.imgur.com/quw3Qsk.png'},
  PRESENTATIONSLIDES: {id: 5, image: 'https://i.imgur.com/yZRvpfo.png'},
};

const ItemList = (props: any) => {
  const {isSelected, record} = props;
  const path = useRouterController((s) => s.path);
  const {push} = useRouter();

  return (
    <UI.ScaleFade in={true} initialScale={0.9}>
      <UI.Box
        onClick={() => {
          push(`${path}/${record?.module?.id}`);
        }}
        cursor={'pointer'}
        w="100%"
        h="70px">
        <UI.HStack pl={5}>
          {isSelected && (
            <UI.Checkbox mr={4} bg={'white'} borderRadius={'md'} size={'lg'} />
          )}
          <UI.Box position={'relative'}>
            <UI.Center shadow={'md'} w={'80px'} h={'80px'} bg={'white'}>
              <UI.Image
                w={'45px'}
                h={'45px'}
                src={IMAGES?.[record?.module?.moduleType]?.image}
              />
            </UI.Center>
          </UI.Box>

          <UI.Text
            pl={4}
            color={'#4F4F4F'}
            fontSize={'md'}
            fontWeight={'semibold'}>
            {record?.module?.name}
          </UI.Text>
        </UI.HStack>
      </UI.Box>
      <UI.Divider
        h={'40px'}
        borderBottomWidth={'2px'}
        borderBottomColor={'#E0E0E0'}
      />
    </UI.ScaleFade>
  );
};

export default memo(ItemList);
