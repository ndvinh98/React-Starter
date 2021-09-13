export const Checkbox = {
  baseStyle: {
    control: {
      borderRadius: 'md',
      border: '2px solid',
      _checked: {
        bg: 'ste.red',
        borderColor: 'ste.red_lighter',
        _hover: {
          bg: 'ste.red',
          borderColor: 'ste.red_lighter',
        },
      },
      _focus: {
        boxShadow: 'none',
      },
    },
  },
};
