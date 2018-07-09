# spool-realtime
:package: Realtime Spool. Synchronize the client and server via WebSockets using Primus

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
    require('@fabrix/spool-express').ExpressSpool, // Or use a different Webserver Spool 
    require('@fabrix/spool-realtime').RealtimeSpool
  ]
}
```

### Configure

Create the config file: `config/realtime.ts `

```js
export const realtime = {
  primus:{
    options:{
      //these options are passed directly to the Primus constructor: https://github.com/primus/primus#getting-started
    }
  } 
}
```

## Client

You can include the primus client library as a script:
```
<script src="/primus/primus.js"></script>
```

