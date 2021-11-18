require('./env.config');

module.exports = {
  cli: {
    migrationsDir: 'db/migrations',
  },
  type: 'postgres',
  host: process.env.POSTGRES_HOST,
  port: Number(process.env.POSTGRES_PORT),
  database: process.env.POSTGRES_USER,
  username: process.env.POSTGRES_USER,
  password: process.env.POSTGRES_PASSWORD,
  synchronize: false,
  logging: ['warn', 'error'],
  migrations: ['db/migrations/*.ts'],
  entities: ['src/**/*.entity.ts'],
};
