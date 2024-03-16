# Furniture Store

## How to Run Project

Install Redux DevTools Chrome Extension (https://chromewebstore.google.com/detail/redux-devtools/lmhkpmbekcpmknklioeibfkpmmfibljd) on your Chrome browser.

Start client.

```
cd client
npm i
npm i --legacy-peer-deps

npm start
```

Start server. Make sure you copy the MongoDB connection string and export it as an environment variable (`SPECTRO_MONGO_URI`) before starting the server. For security purposes, do not commit the connection string to git.

```
cd server
npm i

export SPECTRO_MONGO_URI="mongodb+srv://XXXXXX:XXXXXXX@XXXXXXXX.mongodb.net/?retryWrites=true&w=majority"

npm start
```


