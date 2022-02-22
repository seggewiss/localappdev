# Still in development
This app is still in development.

## Setup
Clone the repository in your `<shopware6Root>/custom/apps` directory.

```
git clone git@github.com:seggewiss/localappdev.git
```

Start the app server.

```
cd localappdev && node server/index.js
```

Out of the box the app will be installable.

## Adding custom views

### Disclaimer
Currently every template adjustment needs a server restart.
Im planning to migrate to webpack or vite soon so this will no longer be an issue.

Take a look at the directory `src/views`. Every folder in this directory is treated as a view.
This means the `index.html` file of the `product-card` directory will be rendered when you visit `http://localhost:8886/product-card`.
This is not affected by query parameters in the url.

So let's recap what is necessary to create your own views:
1. Create a directory under `src/views`
   1. Remember that the directory name will be the subdomain for the webserver
2. Create an `index.html` file in your directory
3. If your view needs the admin extension sdk just add the following comment in the head area `<!--injectAdminExtensionSdk-->`.
   1. This will be replaced when rendered and you can work with the sdk.
