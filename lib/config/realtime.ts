export const realtime = {
  // Optional Path for client's primus.js
  path: null,
  // Optional Prefix to use for client's primus.js route
  prefix: null,
  // Primus configuration
  primus: {
    transformer: 'engine.io',
    options: {}
  },
  // Plugins key value, eg. myPlugin: require('plugin')
  plugins: {},
  // Configuration for when Primus/Fabrix shuts down
  destroy: {
    timeout: 100
  }
}
