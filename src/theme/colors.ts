export const colors = ({
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
}) => ({
  red: {
    50: '#ffe7e6',
    100: '#f7c2be',
    200: '#eb9c94',
    300: '#e1756a',
    400: '#d84f41',
    500: '#be3527',
    600: '#95281e',
    700: '#6b1b15',
    800: '#420f0a',
    900: '#1d0200',
  },
  ste: {
    red: '#d03a2b',
    red_light: '#e96057',
    red_lighter: '#f79c93',
    red_lightest: '#FFF4F4',
    gray: '#555659',
    gray_light: '#6C6F84',
    gray_lighter: '#f3f3f3',
    black: '#1a1919',
    top_menu: topMenuColour || '#d03a2b',
    left_menu_background_colour: leftMenuBackgroundColour || 'white',
    left_menu_font_and_icon_colour: leftMenuFontAndIconColour || 'black',
    left_menu_highlight_colour: leftMenuHighlightColour || 'black',
    left_menu_highlight_stripe_colour: leftMenuHighlightStripeColour || 'gray',
    primary: '#854fff',
    secondary: '#364a63',
    success: '#1ee1ab',
    danger: '#e85347',
    warning: '#f3bd0d',
    info: '#09c2dd',
    light: '#e5e9f2',
    dark: '#1c2c46',

    primary_lightest: '#f2ebfe',
    secondary_lightest: '#e8ebee',
    success_lightest: '#e6fcf6',
    danger_lightest: '#fbecea',
    warning_lightest: '#fef8e4',
    info_lightest: '#e4f7fa',
    light_lightest: '#f0f3f5',
    dark_lightest: '#e5e8e9',
  },
});
