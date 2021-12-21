export const Text = ({
  color,
  fontFamily,
}: {
  color?: string;
  fontFamily?: string;
}) => ({
  baseStyle: {
    color,
    fontFamily,
  },
});
