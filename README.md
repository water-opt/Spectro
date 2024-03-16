# Furniture Store

## How to Run Project

Start client.

```
cd client
npm i

npm run start
```

Start server. Make sure you copy the MongoDB connection string and export it as an environment variable (`SPECTRO_MONGO_URI`) before starting the server. For security purposes, do not commit the connection string to git.

```
cd server
npm i

export SPECTRO_MONGO_URI="mongodb+srv://XXXXXX:XXXXXXX@XXXXXXXX.mongodb.net/?retryWrites=true&w=majority"

npm run start-server
```


