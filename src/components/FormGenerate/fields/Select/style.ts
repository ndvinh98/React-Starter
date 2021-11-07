const SIZE = {
  sm: '32px',
  md: '40px',
  lg: '48px',
};

const FONT_SIZES = {
  sm: '0.875rem',
  md: '1rem',
  lg: '1.125rem',
};

export const style = ({isInvalid, size}) => ({
  valueContainer: (provided) => ({
    ...provided,
    '& *': {
      color: '#9ba3af',
    },
  }),
  indicatorSeparator: () => {
    return {
      disabled: 'none',
    };
  },
  control: (provided, state) => {
    const {isFocused} = state;
    return {
      ...provided,
      outline: 'none',
      boxShadow: isFocused ? '0 0 0 1px #f79c93' : 'none',
      borderWidth: isInvalid ? '2px' : '1px',
      borderColor: isInvalid ? '#d03a2b' : isFocused ? '#d03a2b' : 'inherit',
      minHeight: SIZE[size],
      borderRadius: '0.375rem',
      fontSize: FONT_SIZES[size],
      backgroundColor: 'white',
      padding: '0px 6px',
      ':hover': {
        borderColor: isInvalid ? '#d03a2b' : isFocused ? '#d03a2b' : '#d1dae4',
      },
    };
  },
});
