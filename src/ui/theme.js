const css = String.raw;

export const font = {
  family: {
    primary: 'Roboto, sans-serif',
    secondary: 'Roboto Slab, serif',
  },
};

export const color = {
  primary: '#00b5ff',
  secondary: '#a24bff',
  text: {
    primary: '#3c4858',
    secondary: '#ffffff',
  },
};

export const transition = '0.3s';

export const globalStyles = css`
  @font-face {
    font-family: 'Roboto';
    font-style: normal;
    font-weight: 300;
    src: local('Roboto Light'), local('Roboto-Light'),
         url('assets/fonts/roboto-v18-latin_cyrillic-300.woff2') format('woff2'),
         url('assets/fonts/roboto-v18-latin_cyrillic-300.woff') format('woff');
  }
  
  @font-face {
    font-family: 'Roboto';
    font-style: normal;
    font-weight: 500;
    src: local('Roboto Medium'), local('Roboto-Medium'),
         url('assets/fonts/roboto-v18-latin_cyrillic-500.woff2') format('woff2'),
         url('assets/fonts/roboto-v18-latin_cyrillic-500.woff') format('woff');
  }
  
  @font-face {
    font-family: 'Roboto Slab';
    font-style: normal;
    font-weight: 700;
    src: local('Roboto Slab Bold'), local('RobotoSlab-Bold'),
         url('assets/fonts/roboto-slab-v7-latin_cyrillic-700.woff2') format('woff2'),
         url('assets/fonts/roboto-slab-v7-latin_cyrillic-700.woff') format('woff');
  }

  *,
  *:before,
  *:after {
    box-sizing: border-box;
  }

  html {
    font-size: 62.5%;
    -ms-overflow-style: scrollbar;
  }

  body {
    position: relative;
    min-width: 32rem;
    font-family: ${font.family.primary};
    font-weight: 300;
    line-height: 1.5;
    color: ${color.text.primary};
    overflow-x: hidden;
  }
`;
