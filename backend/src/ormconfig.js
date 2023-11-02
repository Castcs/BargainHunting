module.exports = {
    type: 'postgres',
    host: 'localhost',
    port: 5432,
    username: 'postgres',
    password: 'admin',
    database: 'BargainHunting',
    synchronize: true, // Set to true for development, but false for production
    entities: ['src/models/*.ts'], // Path to your entity classes
    migrations: ['src/migrations/*.ts'], // Path to your migration files
    subscribers: ['src/subscribers/*.ts'], // Path to your subscribers (optional)
    cli: {
        entitiesDir: 'src/models',
        migrationsDir: 'src/migrations',
        subscribersDir: 'src/subscribers',
    },
};
