export default () => {
  return {
    port: parseInt(process.env.PORT, 10) || 3000,
    database: {
      client: process.env.DATABASE_CLIENT,
      host: process.env.DATABASE_HOST,
      port: parseInt(process.env.DATABASE_PORT, 10) || 5432,
      username: process.env.DATABASE_USERNAME,
      password: process.env.DATABASE_PASSWORD || '',
      name: process.env.DATABASE_NAME,
    },
  };
};
