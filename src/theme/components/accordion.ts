export const Accordion = {
  baseStyle: {
    container: {
      borderTopWidth: '0px',
      _last: {
        borderBottomWidth: '0px',
      },
    },
    button: {
      outline: 'none',
      boxShadow: 'none',
      position: 'relative',
      _expanded: {
        bg: 'ste.gray_lighter',
        _after: {
          content: `" "`,
          position: 'absolute',
          width: '3px',
          height: '100%',
          bg: 'ste.dark',
          top: 0,
          right: 0,
        },
      },
      _focus: {
        outline: 'none',
        boxShadow: 'none',
      },
    },
  },
};
