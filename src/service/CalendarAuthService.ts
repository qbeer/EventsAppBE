import * as fs from "fs";
import { OAuth2Client } from "google-auth-library";
import { google } from "googleapis";
import * as readline from "readline";
import * as util from "util";
import { SCOPE, TOKEN_PATH } from "../../config";

const readFile = util.promisify(fs.readFile);
const writeFile = util.promisify(fs.writeFile);

export class CalendarAuthService {

    public authorizedClient(): Promise<OAuth2Client> {
        return readFile("credentials.json").then((credentials) => {
            const { client_secret, client_id, redirect_uris } =
                JSON.parse(credentials.toString()).installed;
            const oAuth2Client = new google.auth.OAuth2(
                client_id, client_secret, redirect_uris[0]);
            return readFile(TOKEN_PATH).then((token) => {
                oAuth2Client.setCredentials(JSON.parse(token.toString()));
                return oAuth2Client;
            });
        }).catch((err) => {
            console.log("Authentication error:", err);
            throw err;
        });
    }

    public getAccessToken(client: OAuth2Client): void {
        const authUrl = client.generateAuthUrl({
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
            const getToken = util.promisify(client.getToken);
            return getToken({code}).then((token) => {
                client.setCredentials(token);
                // Store the token to disk for later program executions
                writeFile(TOKEN_PATH, JSON.stringify(token)).then(() => {
                    console.log("Token stored to", TOKEN_PATH);
                    return client;
                });
            }).catch((err) => {
                return console.log("Token error: ", err);
            });
        });
    }

}
