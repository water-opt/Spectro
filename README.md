# Furniture Store

## How to Run Project

Install Redux DevTools Chrome Extension (https://chromewebstore.google.com/detail/redux-devtools/lmhkpmbekcpmknklioeibfkpmmfibljd) on your Chrome browser.

1. Start backend.

First, make sure you copy the MongoDB connection string and add it to `backend/.env` file as an environment variable (`URI`) before starting the backend. For security purposes, do not commit the connection string to git.

```
PORT=4000
URI="mongodb+srv://XXXXXX:XXXXXXX@XXXXXXXX.mongodb.net/?retryWrites=true&w=majority"
```

Now install NPM dependencies and start the backend.

```
cd backend
npm i

npm start
```

2. Start frontend.

Install NPM dependencies (use `--legacy-peer-deps` only if you get errors during install) and start the frontend.

```
cd frontend
npm i
npm i --legacy-peer-deps

npm start
```

