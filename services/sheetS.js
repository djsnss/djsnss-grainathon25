import { google } from "googleapis";
import dotenv from "dotenv";
import fs from "fs";
import path from "path";

dotenv.config();

const SCOPES = ["https://www.googleapis.com/auth/spreadsheets.readonly"];

let authInstance = null;
let sheetsClient = null;

function initAuth() {
    if (authInstance) return authInstance;

    let credentials;
    if (process.env.GOOGLE_SERVICE_ACCOUNT_KEY) {
        credentials = JSON.parse(process.env.GOOGLE_SERVICE_ACCOUNT_KEY);
    } else {
        const keyPath = path.join(process.cwd(), "key.json");
        credentials = JSON.parse(fs.readFileSync(keyPath, "utf8"));
    }

    authInstance = new google.auth.GoogleAuth({
        credentials,
        scopes: SCOPES,
    });

    console.log("Google Auth initialized successfully");
    if (credentials.client_email) {
        console.log("Service account email:", credentials.client_email);
    }
    return authInstance;
}

function getSheetsClient() {
    if (sheetsClient) return sheetsClient;
    const auth = initAuth();
    sheetsClient = google.sheets({ version: "v4", auth });
    return sheetsClient;
}


export async function getValues(spreadsheetId, range, options = {}) {
    const sheets = getSheetsClient();
    const res = await sheets.spreadsheets.values.get({
        spreadsheetId,
        range,
        ...options,
    });
    return res.data;
}

export { initAuth, getSheetsClient };