const env = process.env.REACT_APP_NODE_ENV || process.env.NODE_ENV; // 'local' or 'development' or 'production'

const local = {
  PRISMA_ENDPOINT: process.env.REACT_APP_LOCAL_PRISMA_ENDPOINT,
  PRISMA_SECRET: process.env.REACT_APP_LOCAL_PRISMA_SECRET,
};


const development = {
  PRISMA_ENDPOINT: process.env.REACT_APP_DEVELOPMENT_PRISMA_ENDPOINT,
  PRISMA_SECRET: process.env.REACT_APP_DEVELOPMENT_PRISMA_SECRET,
};

const production = {
  PRISMA_ENDPOINT: process.env.REACT_APP_PRODUCTION_PRISMA_ENDPOINT,
  PRISMA_SECRET: process.env.REACT_APP_PRODUCTION_PRISMA_SECRET,
};

export const config = {
  local,
  development,
  production,
}[env];
