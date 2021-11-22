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

export const theme = extendTheme({
  initialColorMode: 'light',
  useSystemColorMode: false,
  breakpoints,
  colors,
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
