
module.exports = {
    apps: [
        {
            name: 'tasknest',
            script: 'node_modules/.bin/ts-node',
            args: '-r tsconfig-paths/register src/main.ts',
            watch: ['src'],
            env: {
                NODE_ENV: 'development',
            },
            env_production: {
                NODE_ENV: 'production',
            },
        },
    ],
};
