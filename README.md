# API-DEMO

## Installation
```sh
yarn && cp .env.sample .env
npm install && cp .env.sample .env
```

## API

#### GET
>https://api-demo-yo.herokuapp.com/api/object/mykey

```sh
return { key: mykey }
```
Should be always return newest key value.

#### POST
>https://api-demo-yo.herokuapp.com/api/object

```sh
return { key: key, value: value, timestamp: XX:XX AM/PM }
```
