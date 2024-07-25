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
  appKey: "YOUR_API_KEY",
  appSecret: "YOUR_APP_SECRET",
  accessToken: "YOUR_ACCESS_TOKEN",
  accessSecret: "YOUR_ACCESS_SECRET",
});

const bearer = new TwitterApi("YOUR_BEARER_TOKEN");

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
