## USING TWIITER API V2

```typescript
// src/index.ts
import express from "express";
import cors from "cors";
import connectDB from "./config/connection";
import http from "http";
import { TwitterApi } from "twitter-api-v2";

const app = express();
const port = process.env.PORT || 3000;

// Create an HTTP server
const server = http.createServer(app);

app.use(express.json());
// enable cors
app.use(cors({ credentials: true }));

const APP_ID = "29104066";

const client = new TwitterApi({
  appKey: "2Dyb99mf42l4RzUID1NM0HwWw",
  appSecret: "DSjAzIPVtvlOxW5nVEbyRPxALILkKopIvuZ4m3QiwwMpRuBb05",
  accessToken: "1768292164344193024-qUehniyR1xm8GxQ0moWG4gIrikP0UM",
  accessSecret: "1CSePo5cYxXhjLcn83TDHRIWfk1EmeEC5WOHOoeALI9je",
});

const bearer = new TwitterApi(
  "AAAAAAAAAAAAAAAAAAAAAMIXvAEAAAAAu%2B9ZE4%2FLSO3rKUvd37CNMcEziWM%3DcM9KA2h2oyomofeYX9CnGwEL5170dbsYV0ty6PLbyP6FWAdmET"
);

const twitterClient = client.readWrite;
const twitterBearer = bearer.readOnly;

const callTwitter = async () => {
  const tweetDetail = await twitterClient.currentUser();
  // const tweetDetail = await twitterClient.v2.retweet('1768292164344193024', '1816368245936644516');
  console.log(tweetDetail);
};

callTwitter();

server.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
```
