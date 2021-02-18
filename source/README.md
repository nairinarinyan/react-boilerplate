# React/TypeScript Boilerplate

## Stack
* `React`
* `Reactive Blocs`
* `Reactive Scoped Styles`
* `RxJS`
* `Immer`
* `Lodash`

## Things to change
* search `change_this` in the project
* this README

## Things to rename
* search `rename_this` files

## How to run
`npm i`
`npm start`

## How to deploy

### Environments
Put your non-secret environment-dependent stuff in `.env` files
(e.g. `GA_MEASUREMENT_ID`, `FB_PIXEL_ID` etc.)

### What to serve
After `npm run build` static http-server can serve the app from the `build` folder

### Docker image
Building an environment-specific build with
`docker build --build-arg ENVIRONMENT=PROD -t change_this:latest .`
will result in a Docker image with nginx serving the static stuff

## Icons
Icons are stored in `icon-definitions.svg` and used with
`<Icon icon="icon-name" />` component.

You can add an `.svg` icon with `add-icon` script
`cd ./scripts`
`./add-icon ~/Downloads/icon_from_your_favorite_designer.svg icon-name`

It will cleanup the svg and strip the colors. You can give it a color with CSS.
```.tsx
<span className="icon">
    <Icon icon="icon-name" />
</span>
```

```.styl
.icon
    color purple
```

To keep the colors of the imported svg, run `add-icon` it with `--keepColors` flag.