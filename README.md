# Cloudant ImageView

Simple app based on a small Node.js Server and a Frontend with JavaScript and HTML to show pictures and metadata from a Cloudant database.

## How to use

1. Go to `public/config` and change the credentials to your own Cloudant DB credentials
2. Use the Node.js Runtime via IBM Bluemix
3. Do a `cf push` of the complete Folder to your Bluemix Node.js app
4. Go to your Cloudant account and add the two documents under `_views/` to your Cloudant database. This will create two Map/Reduce views for the app to query the data and get a count of all images
5. IMPORTANT! Enable CORS in Cloudant. This can be done via `Account -> CORS -> Enable CORS`
