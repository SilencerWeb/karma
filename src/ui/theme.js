const css = String.raw;

export const font = {
  family: {
    primary: 'Roboto, sans-serif',
    secondary: 'Roboto Slab, serif',
  },
};

export const color = {
  primary: '#00b5ff',
  secondary: '#7b00fe',
  error: '#db4437',
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
    font-size: 1.4rem;
    font-weight: 300;
    line-height: 1.5;
    color: ${color.text.primary};
    overflow-x: hidden;
  }
  
  a {
    text-decoration: none;
  }
  
  .ReactModalPortal > * {
    opacity: 0;
    visibility: hidden;
  }
  
  .ReactModal__Overlay {
    z-index: 999;
    display: flex;
    justify-content: center;
    width: 100%;
    height: 100%;
    background-color: rgba(0, 0, 0, 0.5) !important;
    padding-top: 4rem;
    padding-bottom: 4rem;
    transition: opacity ${transition};
    overflow-x: hidden;
    overflow-y: auto;
    
    &--after-open {
      opacity: 1;
      visibility: visible;
    }
    
    &--before-close {
      opacity: 0;
    }
  }
  
  .ReactModal__Content {
    margin-top: auto;
    margin-bottom: auto;
    outline: none;
  }
  
  .Toastify .Toastify__toast-container {
    width: 38rem;
    color: inherit;
    padding: 0;
    
    &--top-right {
      top: 1.2rem;
      right: 1.2rem;
    }
  }
  
  .Toastify .Toastify__toast {
  	min-height: initial;
    color: inherit;
    border-radius: 0.8rem;
    box-shadow: 0 0.6rem 1rem 0 rgba(176, 190, 197, 0.24), 0 0.1rem 0.3rem 0 rgba(176, 190, 197, 0.32);
    padding-top: 1.2rem;
    padding-right: 1.2rem;
    padding-bottom: 1.2rem;
    padding-left: 1.2rem;
    animation-duration: 0.5s !important;
  }
`;
