import React, {useState} from 'react';
import * as yup from 'yup';
import {isEmpty, values} from 'lodash';
import * as UI from '@chakra-ui/react';
import FormGenerate from '@components/FormGenerate';
import {useConfigStore} from '@services/config';
import {usePatch, useGetItem} from '@utils/hooks';
import {uploadFile} from '@services';

const FONTS = {
  arial: {
    label: 'Arial',
    value: 'arial',
  },
  time_new_roman: {
    label: 'Time New Roman',
    value: 'time_new_roman',
  },
};

function Appearance() {
  const settings = useConfigStore((s) => s.settings?.[0]);
  const {patch, loading} = usePatch(`appearanceSettings/${settings?.id}`);
  const {getItem: getLogoUrlUpload, data: logoUrlUpload} = useGetItem(
    'appearanceSettings/uploadLogoUrl',
  );
  const {getItem: getLoginPageUrl, data: loginPageImageUrl} = useGetItem(
    'appearanceSettings/uploadLoginPageImageUrl',
  );

  const [fileLogo, setFileLogo] = useState(null);
  const [fileLoginPageImage, setFileLoginPageImage] = useState(null);

  React.useEffect(() => {
    if (logoUrlUpload?.url) {
      uploadFile(logoUrlUpload?.url, fileLogo);
    }
  }, [logoUrlUpload]);

  React.useEffect(() => {
    if (loginPageImageUrl?.url) {
      uploadFile(loginPageImageUrl?.url, fileLoginPageImage);
    }
  }, [loginPageImageUrl]);

  return (
    <>
      <UI.Box p={6}>
        <UI.Text fontSize={'22px'} fontWeight={'bold'} mb={4}>
          Appearance
        </UI.Text>
        <UI.Box bg={'white'} mt={4} p={8}>
          {!isEmpty(settings) && (
            <FormGenerate
              spacing={6}
              onSubmit={(data: any) => {
                patch({
                  ...data,
                  font: data?.font.value,
                  loginPageImage: undefined,
                  logo: undefined,
                });
                if (data?.logo?.name && data?.logo?.type) {
                  setFileLogo(data?.logo);
                  getLogoUrlUpload({
                    name: data?.logo?.name,
                    type: data?.logo?.type,
                  });
                }
                if (data?.loginPageImage?.name && data?.loginPageImage?.type) {
                  setFileLoginPageImage(data?.loginPageImage);
                  getLoginPageUrl({
                    name: data?.loginPageImage?.name,
                    type: data?.loginPageImage?.type,
                  });
                }
              }}
              schema={{
                topMenuColour: yup
                  .string()
                  .matches(/^#([0-9a-f]{3}|[0-9a-f]{6})$/i, {
                    message: 'Color code invalid!',
                  })
                  .required('Color code invalid!')
                  .default(settings?.topMenuColour),
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
                  defaultValue: settings?.topMenuColour || '#ffffff',
                },
                {
                  name: 'leftMenuBackgroundColour',
                  type: 'color-picker',
                  size: 'md',
                  placeholder: 'Key in #colour',
                  label: 'Left menu background colour',
                  layout: 'horizontal',
                  width: '70%',
                  defaultValue: settings?.leftMenuBackgroundColour || '#ffffff',
                },
                {
                  name: 'buttonsColour',
                  type: 'color-picker',
                  size: 'md',
                  placeholder: 'Key in #colour',
                  label: 'Button colour',
                  layout: 'horizontal',
                  width: '70%',
                  defaultValue: settings?.buttonsColour || '#ffffff',
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
                  defaultValue: settings?.logo,
                },
                {
                  name: 'leftMenuFontAndIconColour',
                  type: 'color-picker',
                  size: 'md',
                  placeholder: 'Key in #colour',
                  label: 'Left menu font and icon colour',
                  layout: 'horizontal',
                  width: '70%',
                  defaultValue:
                    settings?.leftMenuFontAndIconColour || '#ffffff',
                },
                {
                  name: 'leftMenuHighlightColour',
                  type: 'color-picker',
                  size: 'md',
                  placeholder: 'Key in #colour',
                  label: 'Left Menu Highlight colour',
                  layout: 'horizontal',
                  width: '70%',
                  defaultValue: settings?.leftMenuHighlightColour || '#ffffff',
                },
                {
                  name: 'leftMenuHighlightStripeColour',
                  type: 'color-picker',
                  size: 'md',
                  placeholder: 'Key in #colour',
                  label: 'Left Menu Highlight Stripe colour',
                  layout: 'horizontal',
                  width: '70%',
                  defaultValue:
                    settings?.leftMenuHighlightStripeColour || '#ffffff',
                },
                {
                  name: 'backgroundColour',
                  type: 'color-picker',
                  size: 'md',
                  placeholder: 'Key in #colour',
                  label: 'Background colour',
                  layout: 'horizontal',
                  width: '70%',
                  defaultValue: settings?.backgroundColour || '#ffffff',
                },
                {
                  name: 'font',
                  type: 'select',
                  label: 'Font',
                  size: 'md',
                  placeholder: 'Select Font Change',
                  layout: 'horizontal',
                  width: '70%',
                  defaultValue: FONTS?.[settings?.font] || FONTS.arial,
                  options: values(FONTS),
                },
                {
                  name: 'fontColour',
                  type: 'color-picker',
                  label: 'Font Colour',
                  size: 'md',
                  placeholder: 'Key in #colour',
                  layout: 'horizontal',
                  width: '70%',
                  defaultValue: settings?.fontColour || '#ffffff',
                },
                {
                  name: 'loginPageImage',
                  type: 'upload-file',
                  size: 'md',
                  label: 'Change Login page image',
                  layout: 'horizontal',
                  width: '70%',
                  urlPath: '/appearanceSettings/uploadLogoUrl',
                  description: 'Recommended size: 94px x 36px',
                  defaultValue: settings?.loginPageImage,
                },
              ]}>
              <UI.HStack mt={8} justifyContent={'center'}>
                <UI.Button type="button" w={'100px'} variant="outline">
                  Preview
                </UI.Button>
                <UI.Button isLoading={loading} type="submit" w={'100px'}>
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
