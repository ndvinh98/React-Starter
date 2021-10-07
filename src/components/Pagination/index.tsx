import React, {memo} from 'react';
import * as UI from '@chakra-ui/react';
import {isEmpty} from 'lodash';
import {
  FiChevronLeft,
  FiChevronsLeft,
  FiChevronRight,
  FiChevronsRight,
} from 'react-icons/fi';
import {HTMLChakraProps} from '@chakra-ui/system';
import {usePagination} from './usePagination';

export interface IPagination extends HTMLChakraProps<'div'> {
  currentPage?: number;
  totalpage?: number;
  totalCount?: number;
  pageSize?: number;
  onChangePage?: (page: number) => void;
  size?: 'md' | 'sm';
}

const SIZE = {
  md: '35px',
  sm: '24px',
};
const FONT_SIZE = {
  md: '14px',
  sm: '12px',
};

const ICON_SIZE = {
  md: 35,
  sm: 15,
};

const IconItem: React.FC<any> = (porps) => {
  const {isActive, onClick, isDisabled, size = 'md'} = porps;
  return (
    <UI.Center
      onClick={onClick}
      borderRadius={size}
      shadow={'sm'}
      cursor={isDisabled ? 'no-drop' : 'pointer'}
      opacity={isDisabled ? 0.5 : 1}
      w={SIZE?.[size]}
      h={SIZE?.[size]}
      fontWeight={'semibold'}
      fontSize={FONT_SIZE?.[size]}
      color={isActive ? 'white' : '#6C6F84'}
      bg={isActive ? 'ste.red' : '#EBEBEB'}>
      {porps.children}
    </UI.Center>
  );
};

function Pagination(props: IPagination) {
  const {
    currentPage = 1,
    totalpage = 1,
    onChangePage,
    totalCount,
    pageSize,
    size = 'md',
    ...other
  } = props;

  const pages = usePagination({
    currentPage,
    pageSize: pageSize,
    totalCount: totalCount,
  });

  const handleBackOne = () => {
    if (currentPage > 1) onChangePage(currentPage - 1);
  };

  const handleBackTwo = () => {
    if (currentPage > 2) onChangePage(currentPage - 2);
  };

  const handleNextOne = () => {
    if (currentPage < totalpage) onChangePage(currentPage + 1);
  };

  const handleNextTwo = () => {
    if (currentPage < totalpage - 1) onChangePage(currentPage + 2);
  };
  return (
    <UI.HStack
      w={'full'}
      px={{md: 1, lg: 6}}
      pt={{md: 2, lg: 0}}
      justifyContent={{lg: 'flex-end', md: 'center'}}
      {...other}>
      <IconItem size={size} isDisabled={currentPage <= 1}>
        <FiChevronLeft
          size={ICON_SIZE?.[size]}
          onClick={handleBackOne}
          color={'#6C6F84'}
        />
      </IconItem>
      <IconItem size={size} isDisabled={currentPage <= 2}>
        <FiChevronsLeft
          size={ICON_SIZE?.[size]}
          onClick={handleBackTwo}
          color={'#6C6F84'}
        />
      </IconItem>

      {!isEmpty(pages) &&
        pages?.map((x) => {
          return x === '...' ? (
            <IconItem key={x} size={size}>
              ...
            </IconItem>
          ) : (
            <IconItem
              key={x}
              size={size}
              isActive={x === currentPage}
              onClick={() => onChangePage(+x)}>
              {x}
            </IconItem>
          );
        })}

      <IconItem size={size} isDisabled={currentPage >= totalpage - 1}>
        <FiChevronsRight
          size={ICON_SIZE?.[size]}
          onClick={handleNextTwo}
          color={'#6C6F84'}
        />
      </IconItem>
      <IconItem size={size} isDisabled={currentPage >= totalpage}>
        <FiChevronRight
          size={ICON_SIZE?.[size]}
          onClick={handleNextOne}
          color={'#6C6F84'}
        />
      </IconItem>
    </UI.HStack>
  );
}

export default memo(Pagination);
