import React, {useEffect, useState} from 'react';
import * as UI from '@chakra-ui/react';
import {useGetItem} from '@utils/hooks';
import LoadingComponent from '@components/LoadingComponent';

import {BsDot} from 'react-icons/bs';
import CheckboxTree from 'react-checkbox-tree';
import {
  MdCheckBoxOutlineBlank,
  MdCheckBox,
  MdIndeterminateCheckBox,
  MdKeyboardArrowDown,
  MdKeyboardArrowRight,
} from 'react-icons/md';
import {isEmpty} from 'lodash';

function TierDetail({partnerId}: {partnerId: number}) {
  const {getItem, loading, data} = useGetItem<string[]>(
    `/tiers/permissionByPartnerId`,
  );

  const {
    getItem: getListApplication,
    data: dataApplication,
    loading: loadingApplication,
  } = useGetItem(`/applications/menu`);

  useEffect(() => {
    getListApplication();
    getItem({
      partnerId,
    });
  }, []);

  const [checked, setCheck] = useState([]);
  const [expanded, setExpadned] = useState([]);
  const [nodes, setNodes] = useState([]);

  useEffect(() => {
    if (data) setCheck(data);
  }, [data]);

  useEffect(() => {
    if (!isEmpty(dataApplication)) {
      const _nodes = dataApplication?.map?.((x) => ({
        value: `applications-${x?.id}`,
        label: (
          <UI.Text fontSize="16px" fontWeight="bold">
            {x?.name}
          </UI.Text>
        ),
        disabled: isEmpty(x?.categories),
        children: isEmpty(x?.categories)
          ? undefined
          : x?.categories?.map?.((y) => ({
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
                      <UI.Text
                        fontSize="16px"
                        color="gray.600"
                        fontWeight="bold">
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
            })),
      }));
      setNodes(_nodes);
    }
  }, [dataApplication]);

  return (
    <UI.Box w="full">
      <LoadingComponent isLoading={loading}>
        <UI.Box w="full" mt={3} bg="white">
          <LoadingComponent
            length={dataApplication?.records?.length}
            isLoading={loadingApplication}>
            <CheckboxTree
              nodes={nodes}
              checked={checked}
              expanded={expanded}
              onCheck={(checked) => setCheck(checked)}
              onExpand={(expanded) => setExpadned(expanded)}
              expandOnClick
              disabled
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
          </LoadingComponent>
        </UI.Box>
      </LoadingComponent>
    </UI.Box>
  );
}

export default TierDetail;
