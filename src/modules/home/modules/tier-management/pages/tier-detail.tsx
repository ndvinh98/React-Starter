import React, {useEffect, useState} from 'react';
import * as UI from '@chakra-ui/react';
import {useRouterController} from '@modules/router';
import {useGetItem, useRouter, usePatch} from '@utils/hooks';
import LoadingComponent from '@components/LoadingComponent';
import {ITier} from '@types';

import {BsArrowLeft, BsDot} from 'react-icons/bs';
import CheckboxTree from 'react-checkbox-tree';
import {
  MdCheckBoxOutlineBlank,
  MdCheckBox,
  MdIndeterminateCheckBox,
  MdKeyboardArrowDown,
  MdKeyboardArrowRight,
} from 'react-icons/md';
import {isEmpty, chain} from 'lodash';
import {useTierManagementContoller} from '../tier-management.contoller';

const JSONParse = (text: string) => {
  try {
    return JSON.parse(text);
  } catch (error) {
    return [];
  }
};

function TierDetail() {
  const {params} = useRouterController();
  const {push} = useRouter();
  const {getItem, loading, data} = useGetItem<ITier>(`/tiers/${params?.id}`);
  const products = useTierManagementContoller((s) => s?.products);

  const {
    getItem: getListApplication,
    data: dataApplication,
    loading: loadingApplication,
  } = useGetItem(`/applications/menu`);

  const {
    patch,
    loading: updating,
    data: updateData,
  } = usePatch(`/tiers/${params?.id}`);

  useEffect(() => {
    if (params?.id) {
      getItem();
    }
  }, [params]);

  useEffect(() => {
    getListApplication();
  }, []);

  const [checked, setCheck] = useState([]);
  const [expanded, setExpadned] = useState([]);
  const [nodes, setNodes] = useState([]);

  useEffect(() => {
    if (data) {
      const productPermission = JSONParse(data?.productPermission);
      const categoryPermission = JSONParse(data?.categoryPermission);
      const groupingPermission = JSONParse(data?.groupingPermission);
      setCheck(productPermission || []);
      const expand = [
        'applications-1',
        ...(categoryPermission?.map?.((x) => `categories-${x}`) || []),
        ...(groupingPermission?.map?.((y) => `groupings-${y}`) || []),
      ];
      setExpadned(expand);
    }
  }, [data]);
  const toast = UI.useToast();
  useEffect(() => {
    if (updateData) {
      toast({
        title: 'Successfully!',
        status: 'success',
        duration: 2000,
        position: 'top-right',
        isClosable: true,
      });
    }
  }, [updateData]);

  useEffect(() => {
    if (!isEmpty(dataApplication)) {
      const _nodes = dataApplication?.[0].categories?.map?.((y) => ({
        value: `categories-${y?.id}`,
        label: (
          <UI.Text fontSize="16px" fontWeight="bold">
            {y?.name}
          </UI.Text>
        ),
        disabled: isEmpty(y?.groupings),
        children: isEmpty(y?.groupings)
          ? undefined
          : y?.groupings?.map?.((z) => ({
              value: `groupings-${z?.id}`,
              label: (
                <UI.Text fontSize="16px" color="gray.600" fontWeight="bold">
                  {z?.name}
                </UI.Text>
              ),
              disabled: isEmpty(z?.products),
              children: isEmpty(z?.products)
                ? undefined
                : z?.products.map((k) => ({
                    value: k?.id,
                    label: (
                      <UI.HStack
                        w="full"
                        alignItems="center"
                        justifyContent="flex-start"
                        fontSize="16px"
                        color="gray.500"
                        fontWeight="medium">
                        <BsDot fontSize="20px" />
                        <UI.Text> {k?.name}</UI.Text>
                      </UI.HStack>
                    ),
                  })),
            })),
      }));
      setNodes(_nodes);
    }
  }, [dataApplication]);

  return (
    <UI.Box py={5} px={7} minH="90vh">
      <LoadingComponent isLoading={loading}>
        <UI.HStack
          w="full"
          _hover={{cursor: 'pointer'}}
          onClick={() => push('/home/tier-management')}>
          <BsArrowLeft size={20} />
          <UI.Text fontSize={'14px'}>Back</UI.Text>
        </UI.HStack>
        <UI.Text fontSize="24px" fontWeight="bold">
          {data?.name}
        </UI.Text>
        <UI.Box w="70%" mt={3} bg="white" p={3} shadow="sm">
          <UI.VStack w="full" alignItems="flex-start">
            <UI.Text
              fontWeight="semibold"
              fontSize="18px"
              px={2}
              py={1}
              w="full"
              bg="#EEEEEC">
              Access
            </UI.Text>
          </UI.VStack>
          <LoadingComponent
            length={dataApplication?.records?.length}
            isLoading={loadingApplication}>
            <CheckboxTree
              nodes={nodes}
              checked={checked}
              expanded={expanded}
              onCheck={(checked) => setCheck(checked)}
              onExpand={(expanded) => setExpadned(expanded)}
              showNodeIcon={false}
              expandOnClick
              icons={{
                check: <MdCheckBox fontSize="20px" color="red" />,
                uncheck: (
                  <MdCheckBoxOutlineBlank fontSize="20px" color="grey" />
                ),
                halfCheck: (
                  <MdIndeterminateCheckBox fontSize="20px" color="red" />
                ),
                expandClose: <MdKeyboardArrowRight fontSize="20px" />,
                expandOpen: <MdKeyboardArrowDown fontSize="20px" />,
              }}
            />
            <UI.HStack w="full" pt={3} justifyContent="flex-end">
              <UI.Button
                isLoading={updating}
                onClick={() => {
                  const categoryPermission = chain(checked)
                    .map((x) => products[x]?.grouping?.category?.id)
                    .union()
                    .valueOf();

                  const groupingPermission = chain(checked)
                    .map((x) => products[x]?.grouping?.id)
                    .union()
                    .valueOf();
                  patch({
                    productPermission: JSON.stringify(checked),
                    groupingPermission: JSON.stringify(groupingPermission),
                    categoryPermission: JSON.stringify(categoryPermission),
                  });
                }}
                isDisabled={isEmpty(checked)}
                size="sm">
                Save
              </UI.Button>
            </UI.HStack>
          </LoadingComponent>
        </UI.Box>
      </LoadingComponent>
    </UI.Box>
  );
}

export default TierDetail;
