import React, {useEffect, useState} from 'react';
import * as yup from 'yup';
import {isEmpty, keyBy} from 'lodash';
import * as UI from '@chakra-ui/react';
import {useGetList} from '@utils/hooks';
import FormGenerate from '@components/FormGenerate';

function Appearance() {
  const {data, getList} = useGetList('/appearanceSettings/all');
  const [setting, setSetting] = useState<any>();

  useEffect(() => {
    getList();
  }, []);

  useEffect(() => {
    if (!isEmpty(data)) {
      setSetting(keyBy(data as any, 'key'));
    }
  }, [data]);

  return (
    <>
      <UI.Box p={6}>
        <UI.Text fontSize={'22px'} fontWeight={'bold'} mb={4}>
          Appearance
        </UI.Text>
        <UI.Box bg={'white'} mt={4} p={8}>
          {setting && (
            <FormGenerate
              spacing={6}
              onSubmit={(data) => {
                console.log('🚀 ~ data', data);
              }}
              schema={{
                topMenuColour: yup
                  .string()
                  .matches(/^#([0-9a-f]{3}|[0-9a-f]{6})$/i, {
                    message: 'Color code invalid!',
                  })
                  .required('Color code invalid!'),
              }}
              fields={[
                {
                  name: 'topMenuColour',
                  type: 'color-picker',
                  size: 'md',
                  placeholder: 'Key in #colour',
                  label: 'Top Menu Colour',
                  layout: 'horizontal',
                  width: '70%',
                  defaultValues: setting?.TOP_MENU_COLOUR?.value,
                },
                {
                  name: 'leftMenuBgColour',
                  type: 'color-picker',
                  size: 'md',
                  placeholder: 'Key in #colour',
                  label: 'Left menu background colour',
                  layout: 'horizontal',
                  width: '70%',
                  defaultValues: setting?.LEFT_MENU_BACKGROUND_COLOUR?.value,
                },
                {
                  name: 'btnColour',
                  type: 'color-picker',
                  size: 'md',
                  placeholder: 'Key in #colour',
                  label: 'Button colour',
                  layout: 'horizontal',
                  width: '70%',
                  defaultValues: setting?.BUTTONS_COLOUR?.value,
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
                  defaultValues: setting?.LOGO?.value,
                },
                {
                  name: 'leftMenuFontAndIconColour',
                  type: 'color-picker',
                  size: 'md',
                  placeholder: 'Key in #colour',
                  label: 'Left menu font and icon colour',
                  layout: 'horizontal',
                  width: '70%',
                  defaultValues: setting?.LEFT_MENU_FONT_AND_ICON_COLOUR?.value,
                },
                {
                  name: 'leftMenuHighlightColour',
                  type: 'color-picker',
                  size: 'md',
                  placeholder: 'Key in #colour',
                  label: 'Left Menu Highlight colour',
                  layout: 'horizontal',
                  width: '70%',
                  defaultValues: setting?.LEFT_MENU_FONT_AND_ICON_COLOUR?.value,
                },
                {
                  name: 'leftMenuHighlightStripeColour',
                  type: 'color-picker',
                  size: 'md',
                  placeholder: 'Key in #colour',
                  label: 'Left Menu Highlight Stripe colour',
                  layout: 'horizontal',
                  width: '70%',
                  defaultValues: setting?.LEFT_MENU_HIGHLIGHT_COLOUR?.value,
                },
                {
                  name: 'BgColour',
                  type: 'color-picker',
                  size: 'md',
                  placeholder: 'Key in #colour',
                  label: 'Background colour',
                  layout: 'horizontal',
                  width: '70%',
                  defaultValues: setting?.BUTTONS_COLOUR?.value,
                },
                {
                  name: 'font',
                  type: 'select',
                  label: 'Font',
                  size: 'md',
                  placeholder: 'Select Font Change',
                  layout: 'horizontal',
                  width: '70%',
                  defaultValues: setting?.FONT?.value,
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
                  type: 'color-picker',
                  label: 'Font Colour',
                  size: 'md',
                  placeholder: 'Key in #colour',
                  layout: 'horizontal',
                  width: '70%',
                  defaultValues: setting?.FONT_COLOUR?.value,
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
                  defaultValues: setting?.LOGIN_PAGE_IMAGE?.value,
                },
              ]}>
              <UI.HStack mt={8} justifyContent={'center'}>
                <UI.Button type="button" w={'100px'} variant="outline">
                  Preview
                </UI.Button>
                <UI.Button type="submit" w={'100px'}>
                  Save
                </UI.Button>
              </UI.HStack>
            </FormGenerate>
          )}
        </UI.Box>
      </UI.Box>
    </>
  );
}

export default Appearance;
