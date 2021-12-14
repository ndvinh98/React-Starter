import React from 'react';
import * as UI from '@chakra-ui/react';
import FormGenerate from '@components/FormGenerate';

function Appearance() {
  return (
    <>
      <UI.Box p={6}>
        <UI.Text fontSize={'22px'} fontWeight={'bold'} mb={4}>
          Appearance
        </UI.Text>
        <UI.Box bg={'white'} mt={4} p={8}>
          <FormGenerate
            spacing={6}
            // onSubmit={(value) => {
            // }}
            fields={[
              {
                name: 'topMenuColour',
                type: 'input',
                size: 'md',
                placeholder: 'Key in #colour',
                label: 'Top Menu Colour',
                layout: 'horizontal',
                width: '70%',
              },
              {
                name: 'leftMenuBgColour',
                type: 'input',
                size: 'md',
                placeholder: 'Key in #colour',
                label: 'Left menu background colour',
                layout: 'horizontal',
                width: '70%',
              },
              {
                name: 'btnColour',
                type: 'input',
                size: 'md',
                placeholder: 'Key in #colour',
                label: 'Button colour',
                layout: 'horizontal',
                width: '70%',
              },
              {
                name: 'logo',
                type: 'upload-file',
                size: 'md',
                label: 'Logo',
                layout: 'horizontal',
                width: '70%',
                urlPath: '/appearanceSettings/uploadLogoUrl',
                description: 'Recommended size: 94px x 36px',
              },
              {
                name: 'leftMenuFontAndIconColour',
                type: 'input',
                size: 'md',
                placeholder: 'Key in #colour',
                label: 'Left menu font and icon colour',
                layout: 'horizontal',
                width: '70%',
              },
              {
                name: 'leftMenuHighlightColour',
                type: 'input',
                size: 'md',
                placeholder: 'Key in #colour',
                label: 'Left Menu Highlight colour',
                layout: 'horizontal',
                width: '70%',
              },
              {
                name: 'leftMenuHighlightStripeColour',
                type: 'input',
                size: 'md',
                placeholder: 'Key in #colour',
                label: 'Left Menu Highlight Stripe colour',
                layout: 'horizontal',
                width: '70%',
              },
              {
                name: 'BgColour',
                type: 'input',
                size: 'md',
                placeholder: 'Key in #colour',
                label: 'Background colour',
                layout: 'horizontal',
                width: '70%',
              },
              {
                name: 'font',
                type: 'select',
                label: 'Font',
                size: 'md',
                placeholder: 'Select Font Change',
                layout: 'horizontal',
                width: '70%',
                options: [
                  {
                    label: 'Time New Roman',
                    value: '1',
                  },
                  {
                    label: 'Arial',
                    value: '2',
                  },
                ],
              },
              {
                name: 'fontColour',
                type: 'input',
                label: 'Font Colour',
                size: 'md',
                placeholder: 'Key in #colour',
                layout: 'horizontal',
                width: '70%',
              },
              {
                name: 'changeLoginPageImg',
                type: 'upload-file',
                size: 'md',
                label: 'Change Login page image',
                layout: 'horizontal',
                width: '70%',
                urlPath: '/appearanceSettings/uploadLogoUrl',
                description: 'Recommended size: 94px x 36px',
              },
            ]}>
            <UI.HStack mt={8} justifyContent={'center'}>
              <UI.Button w={'100px'} variant="outline">
                {' '}
                Preview
              </UI.Button>
              <UI.Button w={'100px'}> Save</UI.Button>
            </UI.HStack>
          </FormGenerate>
        </UI.Box>
      </UI.Box>
    </>
  );
}

export default Appearance;
