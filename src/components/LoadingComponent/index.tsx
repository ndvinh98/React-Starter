import React, {memo} from 'react';
import * as UI from '@chakra-ui/react';

export interface ILoadingComponent {
  isLoading?: boolean;
  length?: number;
  children?: React.ReactNode;
  isError?: boolean;
}

function LoadingComponent(props: ILoadingComponent) {
  const {isLoading, length = 1, children, isError = false} = props;
  return isLoading ? (
    <UI.Center w="full" minH="300px">
      <UI.Spinner size="lg" color="ste.red" />
    </UI.Center>
  ) : !length ? (
    <UI.Center w="full">
      <UI.VStack>
        <UI.Image w="90px" src="https://i.imgur.com/nvdeBu8.png" />
        <UI.Text fontSize="20px">No data!</UI.Text>
      </UI.VStack>
    </UI.Center>
  ) : isError ? (
    <UI.Center w="full">
      <UI.VStack>
        <UI.Image w="90px" src="https://i.imgur.com/nvdeBu8.png" />
        <UI.Text fontSize="20px">Data not found!</UI.Text>
      </UI.VStack>
    </UI.Center>
  ) : (
    <>{children}</>
  );
}

export default memo(LoadingComponent);
