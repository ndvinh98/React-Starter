import React, {memo, forwardRef, useImperativeHandle} from 'react';
import {isEmpty} from 'lodash';

import {HTMLChakraProps} from '@chakra-ui/system';
import * as UI from '@chakra-ui/react';
import {useTable} from 'react-table';
import Pagination from '@components/Pagination';

export type HeaderFC = (info: any) => React.ReactNode;

export interface IColumns {
  Header?: string | HeaderFC;
  accessor?: (row, rowIndex, ...other) => React.ReactNode | string;
  id?: number | string;
  TrProps?: HTMLChakraProps<'th'>;
  isNumeric?: boolean;

  [key: string]: any;
}

export interface ITableGenerate {
  isLoading?: boolean;
  data?: any;
  columns?: IColumns[];
  Footer?: React.ReactNode;
  currentPage?: number;
  totalpage?: number;
  totalCount?: number;
  pageSize?: number;
  onChangePage?: (page: number) => void;
  onClickRow?: (row?: any) => void;
}

const TableGenerate = (props: ITableGenerate, ref?: any) => {
  const {
    data = [],
    columns = [],
    Footer,
    isLoading,
    currentPage,
    totalpage,
    onChangePage,
    onClickRow,
    totalCount,
    pageSize,
  } = props;

  useImperativeHandle(ref, () => ({}));

  const {getTableProps, getTableBodyProps, headerGroups, rows, prepareRow} =
    useTable({columns, data});

  return (
    <UI.Box bgColor={'white'} px={4} py={4} borderRadius="md" mt={4}>
      <UI.Table bg={'white'} size={'md'} variant="simple" {...getTableProps()}>
        <UI.Thead>
          {headerGroups?.map((headerGroup, i1) => {
            return (
              <UI.Tr
                bgColor={'#EEEEEC'}
                key={i1}
                {...headerGroup.getHeaderGroupProps()}>
                {headerGroup.headers.map((column, i2) => {
                  return (
                    <UI.Th
                      key={i2}
                      {...column.getHeaderProps()}
                      {...column?.ThProps}>
                      {column.render('Header')}
                    </UI.Th>
                  );
                })}
              </UI.Tr>
            );
          })}
        </UI.Thead>

        <UI.Tbody {...getTableBodyProps()}>
          {isLoading ? (
            <UI.Tr>
              <UI.Th colSpan={1000}>
                <UI.Center minH={'300px'}>
                  <UI.Spinner color={'ste.red'} size={'lg'} />
                </UI.Center>
              </UI.Th>
            </UI.Tr>
          ) : isEmpty(data) ? (
            <UI.Tr>
              <UI.Th colSpan={1000}>
                <UI.Center minH={'300px'}>
                  <UI.VStack>
                    <UI.Image src={'https://i.imgur.com/nvdeBu8.png'} />
                    <UI.Text pt={2} color={'gray'} fontSize={'lg'}>
                      No results found :((
                    </UI.Text>
                  </UI.VStack>
                </UI.Center>
              </UI.Th>
            </UI.Tr>
          ) : (
            rows?.map((row, i3) => {
              prepareRow(row);
              return (
                <UI.Tr
                  _hover={{background: '#fcf2f2', cursor: 'pointer'}}
                  onClick={() => onClickRow?.(row?.original)}
                  key={i3}
                  {...row.getRowProps()}>
                  {row.cells.map((cell, i4) => {
                    return (
                      <UI.Td
                        key={i4}
                        {...cell.getCellProps()}
                        isNumeric={cell.column.isNumeric}>
                        {cell.render('Cell')}
                      </UI.Td>
                    );
                  })}
                </UI.Tr>
              );
            })
          )}
        </UI.Tbody>
        {Footer && <UI.Tfoot>{Footer}</UI.Tfoot>}
      </UI.Table>
      <Pagination
        currentPage={currentPage}
        totalpage={totalpage}
        totalCount={totalCount}
        onChangePage={onChangePage}
        pageSize={pageSize}
        mt={3}
        size={'sm'}
      />
    </UI.Box>
  );
};

export default memo(forwardRef(TableGenerate));
