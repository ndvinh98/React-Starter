import React, {memo} from 'react';
import * as UI from '@chakra-ui/react';

export interface ILoadingComponent {
  isLoading?: boolean;
  length?: number;
  children?: React.ReactNode;
}

function LoadingComponent(props: ILoadingComponent) {
  const {isLoading, length = 1, children} = props;
  return isLoading ? (
    <UI.Center w="full" minH="300px">
      <UI.Spinner size="lg" color="ste.red" />
    </UI.Center>
  ) : !length ? (
    <UI.Center w="full">
      <UI.VStack>
        <UI.Image src="https://i.imgur.com/nvdeBu8.png" />
        <UI.Text>No data</UI.Text>
      </UI.VStack>
    </UI.Center>
  ) : (
    <>{children}</>
  );
}

export default memo(LoadingComponent);
