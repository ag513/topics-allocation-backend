module.exports = {
  apps: [
    {
      name: 'Stockery Backend',
      script: 'server.js',
      env_production: {
        NODE_ENV: 'production'
      },
      instances: 1,
      autorestart: true,
      watch: false,
      max_memory_restart: '1G'
    }
  ]
};
