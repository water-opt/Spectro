# Furniture Store

## How to Run Project

Install Redux DevTools Chrome Extension (https://chromewebstore.google.com/detail/redux-devtools/lmhkpmbekcpmknklioeibfkpmmfibljd) on your Chrome browser.

1. Start client.

```
cd client
npm i
npm i --legacy-peer-deps

npm start
```

2. Start server.

First, make sure you copy the MongoDB connection string and add it to `backend/.env` file as an environment variable (`URI`) before starting the server. For security purposes, do not commit the connection string to git.

```
PORT=5002
URI="mongodb+srv://XXXXXX:XXXXXXX@XXXXXXXX.mongodb.net/?retryWrites=true&w=majority"
```

Now 

```
cd server
npm i

npm start
```


