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
    color: ${color.primary};
    overflow-x: hidden;
  }
  
  h1, h2, h3, h4, h5, h6 {
    font-family: ${font.family.secondary};
    font-weight: 700;
  }
`;
