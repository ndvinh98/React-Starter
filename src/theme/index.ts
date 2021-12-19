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

export const theme = ({
  topMenuColour,
  leftMenuBackgroundColour,
  leftMenuFontAndIconColour,
  leftMenuHighlightColour,
  leftMenuHighlightStripeColour,
}: {
  topMenuColour?: string;
  leftMenuBackgroundColour?: string;
  leftMenuFontAndIconColour?: string;
  leftMenuHighlightColour?: string;
  leftMenuHighlightStripeColour?: string;
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
    }),
    fonts,
    config: {
      cssVarPrefix: 'ste',
    },
    components: {
      Button,
      Checkbox,
      Input,
      Popover,
      Accordion,
      Menu,
      Textarea,
    },
  });
  return theme;
};
