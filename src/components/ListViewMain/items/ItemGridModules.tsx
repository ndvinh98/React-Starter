import React, {memo} from 'react';
import {useRouter} from '@utils/hooks';
import * as UI from '@chakra-ui/react';
import {useRouterController} from '@modules/router';

const IMAGES = {
  BROCHURES: {id: 1, image: 'https://i.imgur.com/SDIkQIE.png'},
  VIDEOS: {id: 2, image: 'https://i.imgur.com/32ziTDI.png'},
  FORMS: {id: 3, image: 'https://i.imgur.com/qit14J8.png'},
  CASESTUDIES: {id: 4, image: 'https://i.imgur.com/quw3Qsk.png'},
  PRESENTATIONSLIDES: {id: 5, image: 'https://i.imgur.com/yZRvpfo.png'},
};

const ItemGrid = (props: any) => {
  const {isSelected, record} = props;
  const path = useRouterController((s) => s.path);
  const {push} = useRouter();
  return (
    <UI.ScaleFade in={true} initialScale={0.9}>
      <UI.HStack
        position={'relative'}
        shadow={'sm'}
        bgSize={'400px'}
        cursor={'pointer'}
        border={'1px solid #BDBDBD'}
        onClick={() => {
          push(`${path}/${record?.module?.id}`);
        }}
        w="100%"
        height={'200px'}>
        {isSelected && (
          <UI.Checkbox
            position={'absolute'}
            bg={'white'}
            borderRadius={'md'}
            right={'10px'}
            top={'10px'}
            size={'lg'}
          />
        )}
        <UI.Center w={'full'}>
          <UI.VStack>
            <UI.Center shadow={'md'} w={'80px'} h={'80px'} bg={'white'}>
              <UI.Image
                w={'45px'}
                h={'45px'}
                src={IMAGES?.[record?.module?.moduleType]?.image}
              />
            </UI.Center>
            <UI.Text
              pt={3}
              w={'100%'}
              color={'#828282'}
              textTransform={'uppercase'}
              fontSize={'md'}
              textAlign={'center'}
              fontWeight={'semibold'}>
              {record?.module?.name}
            </UI.Text>
          </UI.VStack>
        </UI.Center>
      </UI.HStack>
    </UI.ScaleFade>
  );
};
export default memo(ItemGrid);
