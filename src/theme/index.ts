import {extendTheme} from '@chakra-ui/react';

import {colors} from './colors';
import {breakpoints} from './breakpoints';
import {fonts} from './fonts';

import {Button} from './components/button';
import {Checkbox} from './components/checkbox';
import {Input} from './components/input';
import {Popover} from './components/popover';
import {Accordion} from './components/accordion';
import {Menu} from './components/menu';
import {Textarea} from './components/textarea';
import {Text} from './components/text';

export const theme = ({
  topMenuColour,
  leftMenuBackgroundColour,
  leftMenuFontAndIconColour,
  leftMenuHighlightColour,
  leftMenuHighlightStripeColour,
  backgroundColour,
  fontColour,
  fontFamily,
  buttonsColour,
}: {
  topMenuColour?: string;
  leftMenuBackgroundColour?: string;
  leftMenuFontAndIconColour?: string;
  leftMenuHighlightColour?: string;
  leftMenuHighlightStripeColour?: string;
  backgroundColour?: string;
  fontColour?: string;
  fontFamily?: string;
  buttonsColour?: string;
}) => {
  const theme = extendTheme({
    initialColorMode: 'light',
    useSystemColorMode: false,
    breakpoints,
    colors: colors({
      topMenuColour,
      leftMenuBackgroundColour,
      leftMenuFontAndIconColour,
      leftMenuHighlightColour,
      leftMenuHighlightStripeColour,
      backgroundColour,
    }),
    fonts,
    config: {
      cssVarPrefix: 'ste',
    },
    components: {
      Button: Button({buttonsColour}),
      Checkbox,
      Input,
      Popover,
      Accordion,
      Menu,
      Textarea,
      Text: Text({color: fontColour, fontFamily: fontFamily}),
    },
    styles: {
      global: {
        '*': {
          fontFamily: fontFamily || `Arial, Helvetica, sans-serif !important`,
        },
      },
    },
  });
  return theme;
};
