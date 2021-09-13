export const Button = {
  baseStyle: {
    fontWeight: 'semibold',
    color: 'white',
    _focus: {
      boxShadow: 'none',
      outline: 'none',
    },
    _hover: {
      color: 'ste.red',
      bg: 'ste.red_lighter',
    },
  },
  variants: {
    solid: {
      bg: 'ste.red',
      _hover: {
        color: 'white',
        bg: 'ste.red_lighter',
      },
    },
    ghost: {
      color: 'white',
      bg: 'rgba(244, 244, 244, 0.4)',
      _active: {
        color: 'ste.red',
      },
    },
    outline: {
      borderColor: 'ste.red',
      color: 'ste.red',
    },
    link: {
      _hover: {
        bg: 'transparent',
      },
    },
  },
};
