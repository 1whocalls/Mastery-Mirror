# Mastery Mirror

## Install
In /client folder run:

```bash
npm install
```

In /server folder run:

```bash
npm install
```

## Develop
In /client folder run:

```bash
npm run dev
```

In /server folder run:

```bash
npx wrangler dev
```

## Architecture

The Mastery Mirror app is divided into the the front-end (client) and a proxy api (server)

### Client

The client is build entirely with custom elements. The choice for custom elements and not web components comes from the desire to have html in .html files and not in the shadow dom.

### Server

The server is build with [itty-router](https://itty.dev/itty-router/). The choice for the itty-router comes from the current Cloudflare hosting that must be serverless
