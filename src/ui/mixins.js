const css = String.raw;

export const breakpoints = {
  up: {
    xs: '576px',
    sm: '768px',
    md: '992px',
    lg: '1200px',
  },
  down: {
    xs: '575.98px',
    sm: '767.98px',
    md: '991.98px',
    lg: '1199.98px',
  },
};

export const media = {
  up: {
    xs: (...args) => css`
      @media (min-width: ${breakpoints.up.xs}) {
        ${css(...args)};
      }
    `,
    sm: (...args) => css`
      @media (min-width: ${breakpoints.up.sm}) {
        ${css(...args)};
      }
    `,
    md: (...args) => css`
      @media (min-width: ${breakpoints.up.md}) {
        ${css(...args)};
      }
    `,
    lg: (...args) => css`
      @media (min-width: ${breakpoints.up.lg}) {
        ${css(...args)};
      }
    `,
  },
  down: {
    xs: (...args) => css`
      @media (max-width: ${breakpoints.down.xs}) {
        ${css(...args)};
      }
    `,
    sm: (...args) => css`
      @media (max-width: ${breakpoints.down.sm}) {
        ${css(...args)};
      }
    `,
    md: (...args) => css`
      @media (max-width: ${breakpoints.down.md}) {
        ${css(...args)};
      }
    `,
    lg: (...args) => css`
      @media (max-width: ${breakpoints.down.lg}) {
        ${css(...args)};
      }
    `,
  },
};
