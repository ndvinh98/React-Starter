import React from 'react';
import * as UI from '@chakra-ui/react';
import ContentView from '@components/ContentView';
import FormGenerate from '@components/FormGenerate';

function List() {
  return (
    <UI.Box minH="89vh">
      <ContentView
        filterBar={
          <FormGenerate
            gap="10px"
            w="60vw"
            fields={[
              {
                name: 'business',
                type: 'select',
                size: 'md',
                colSpan: 3,
                placeholder: 'Line of Business',
                options: [
                  {
                    label: 'All Roles',
                    value: '-1',
                  },
                  {
                    label: 'Admin',
                    value: 'ADMIN',
                  },
                  {
                    label: 'Sales Manager',
                    value: 'USER',
                  },
                ],
              },
            ]}
          />
        }
        name="Content Management - Line of Product"
      />
    </UI.Box>
  );
}

export default List;
