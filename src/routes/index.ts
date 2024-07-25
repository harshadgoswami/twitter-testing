import { Router, Request, Response } from "express";
import { Client, auth } from "twitter-api-sdk";
import dotenv from "dotenv";

dotenv.config();

const router = Router();

const authClient = new auth.OAuth2User({
    client_id: process.env.CLIENT_ID as string,
    client_secret: process.env.CLIENT_SECRET as string,
    callback: "http://localhost:3000/api/callback",
    scopes: ["tweet.read", "users.read"],
});

const client = new Client(authClient);

const STATE = "my-state";

// Example route
router.get("/", (req: Request, res: Response) => {
    res.send("Hello, world!");
});

router.get("/data", async (req: Request, res: Response) => {

    res.json({ message: "Hello, from the data endpoint!" });
});


router.get("/callback", async function (req: Request, res: Response) {
    try {
        const { code, state } = req.query;
        if (state !== STATE) return res.status(500).send("State isn't matching");
        await authClient.requestAccessToken(code as string);
        res.redirect("/api/tweets");
    } catch (error) {
        console.log(error);
    }
});

router.get("/login", async function (req: Request, res: Response) {
    const authUrl = authClient.generateAuthURL({
        state: STATE,
        code_challenge_method: "s256",
    });
    res.redirect(authUrl);
});

router.get("/tweets", async function (req: Request, res: Response) {


    //const tweets = await client.tweets.findTweetById("1812877648340902164");
    //await client.tweets.deleteTweetById("1812877648340902164");


    const user = await client.users.findMyUser();
    //const user = await client.users.findUserByUsername("@harshadgoswami");
    res.json({ message: "getworksing  !", data: user.data });
});

router.get("/revoke", async function (req: Request, res: Response) {
    try {
        const response = await authClient.revokeAccessToken();
        res.send(response);
    } catch (error) {
        console.log(error);
    }
});


export default router;