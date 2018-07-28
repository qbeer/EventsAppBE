# Backend for my Events App in Node.js

* Node.js with TypeORM, deployed on Heroku
* CircleCI integration
* Google Calander Integration

## Token generation for Google API

```javasciprt
const SCOPE = ["https://www.googleapis.com/auth/calendar"]; // calendar, calendar.readonly
const TOKEN_PATH = "token.json"; // at project root

function getAccessToken(oAuth2Client, callback) {

    const authUrl = oAuth2Client.generateAuthUrl({
        access_type: "offline",
        scope: SCOPE,
    });

    console.log("Authorize this app by visiting this url:", authUrl);
    const rl = readline.createInterface({
        input: process.stdin,
        output: process.stdout,
    });
    rl.question("Enter the code from that page here: ", (code) => {
        rl.close();
        oAuth2Client.getToken(code, (err, token) => {
            if (err) return callback(err);
            oAuth2Client.setCredentials(token);
            // Store the token to disk for later program executions
            fs.writeFile(TOKEN_PATH, JSON.stringify(token), (err) => {
                if (err) console.error(err);
                console.log('Token stored to', TOKEN_PATH);
            });
            callback(oAuth2Client);
        });
    });
}
```

* this stores a token.json file that contains authentication for future use