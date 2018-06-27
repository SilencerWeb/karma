const env = process.env.NODE_ENV; // 'development' or 'production'

const development = {
  PRISMA_ENDPOINT: process.env.REACT_APP_DEVELOPMENT_PRISMA_ENDPOINT,
  PRISMA_SECRET: process.env.REACT_APP_DEVELOPMENT_PRISMA_SECRET,
};

const production = {
  PRISMA_ENDPOINT: process.env.REACT_APP_PRODUCTION_PRISMA_ENDPOINT,
  PRISMA_SECRET: process.env.REACT_APP_PRODUCTION_PRISMA_SECRET,
};

export const config = {
  development,
  production,
}[env];
