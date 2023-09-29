module.exports = {
    apps: [
        {
            name: 'tridentity-FE',
            script: 'yarn start',
            instances: 1,
            autorestart: true,
            watch: false,
            env: {
                NODE_ENV: 'production',
            },
            namespace: 'tridentity',
        },
    ],
};
