# spool-realtime
:package: Realtime Spool. Synchronize the client and server via WebSockets using Primus

[![Gitter][gitter-image]][gitter-url]
[![NPM version][npm-image]][npm-url]
[![Build Status][ci-image]][ci-url]
[![Test Coverage][coverage-image]][coverage-url]
[![Dependency Status][daviddm-image]][daviddm-url]
[![Follow @FabrixApp on Twitter][twitter-image]][twitter-url]

[![Conventional Commits](https://img.shields.io/badge/Conventional%20Commits-1.0.0-yellow.svg)](https://conventionalcommits.org)

## Getting Started

### Install

```sh
npm install --save @fabrix/spool-realtime
```

### Configure 

Then edit `config/main.ts `

```js
export const main = {
  spools: [
    require('@fabrix/spool-router').RouterSpool,
    require('@fabrix/spool-express').ExpressSpool, // Or use a different Webserver Spool such as Hapi, Polka, Koa
    require('@fabrix/spool-realtime').RealtimeSpool
  ]
}
```

### Configure

Create the config file: `config/realtime.ts `

```js
export const realtime = {
  prefix: null, // The prefix to use for the primus endpoint
  primus:{
    options:{
      //these options are passed directly to the Primus constructor: https://github.com/primus/primus#getting-started
    }
  },
  plugins: {
    // Plugins are a key and a library passed to primus.use
    redis: require('primus-redis-rooms')
  }
}
```

## Client
You can set the config path for the generated primus.js file by either setting

`config.main.paths.www` (common defaults for webserver spools) or through `config.realtime.path` which should likely be to a static directory.

You can include the primus client library as a script:
```
<script src="/<realtime.path>/primus.js"></script>
```

## License
[MIT](https://github.com/fabrix-app/spool-realtime/blob/master/LICENSE)

[npm-image]: https://img.shields.io/npm/v/@fabrix/spool-realtime.svg?style=flat-square
[npm-url]: https://npmjs.org/package/@fabrix/spool-realtime
[ci-image]: https://img.shields.io/circleci/project/github/fabrix-app/spool-realtime/master.svg
[ci-url]: https://circleci.com/gh/fabrix-app/spool-realtime/tree/master
[daviddm-image]: http://img.shields.io/david/fabrix-app/spool-realtime.svg?style=flat-square
[daviddm-url]: https://david-dm.org/fabrix-app/spool-realtime
[gitter-image]: http://img.shields.io/badge/+%20GITTER-JOIN%20CHAT%20%E2%86%92-1DCE73.svg?style=flat-square
[gitter-url]: https://gitter.im/fabrix-app/Lobby
[twitter-image]: https://img.shields.io/twitter/follow/FabrixApp.svg?style=social
[twitter-url]: https://twitter.com/FabrixApp
[coverage-image]: https://img.shields.io/codeclimate/coverage/github/fabrix-app/spool-realtime.svg?style=flat-square
[coverage-url]: https://codeclimate.com/github/fabrix-app/spool-realtime/coverage
