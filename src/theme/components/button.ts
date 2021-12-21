export const Button = ({buttonsColour}: {buttonsColour: string}) => ({
  baseStyle: {
    fontWeight: 'semibold',
    color: 'white',
    _focus: {
      boxShadow: 'none',
      outline: 'none',
    },
    _hover: {
      color: buttonsColour || 'ste.red',
      bg: buttonsColour || 'ste.red_lighter',
    },
  },
  variants: {
    solid: {
      bg: buttonsColour || 'ste.red',
      _hover: {
        color: 'white',
        bg: buttonsColour || 'ste.red_lighter',
      },
    },
    ghost: {
      color: 'white',
      bg: 'rgba(244, 244, 244, 0.4)',
      _active: {
        color: buttonsColour || 'ste.red',
      },
    },
    outline: {
      borderColor: buttonsColour || 'ste.red',
      color: buttonsColour || 'ste.red',
    },
    link: {
      _hover: {
        bg: 'transparent',
      },
    },
  },
});
