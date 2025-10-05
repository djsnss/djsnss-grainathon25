import dotenv from "dotenv";
import { getValues } from "../services/sheetS.js";

dotenv.config();

const SPREADSHEET_ID = process.env.SPREADSHEET_ID;
const RANGE = "Committee!A:C";

export async function getCommDonations() {
    try {
        console.log("Fetching data from Google Sheets...");
        const responseData = await getValues(SPREADSHEET_ID, RANGE);
        const rows = (responseData.values || []).slice(1); // skip header
        const commDonations = new Map();
        rows.forEach((row) => {
            const dept = row[0];
            const comm = row[1];
            const quantity = parseFloat(row[2]) || 0;

            const key = `${dept}-${comm}`;
            if (commDonations.has(key)) {
                commDonations.get(key).quantity += quantity;
            } else {
                commDonations.set(key, { dept, comm, quantity });
            }
        });

        const result = Array.from(commDonations.values());
        console.log("Committee donations calculated:", result);
        return result;
    } catch (err) {
        console.error("Error fetching data:", err);
        throw err;
    }
}

export async function getTopCommDonation() {
    try {
        // Get all aggregated donations
        const commDonations = await getCommDonations();

        if (commDonations.length === 0) {
            return null; // no data
        }

        // Find the object with the highest quantity
        let topDonation = commDonations[0];
        for (const donation of commDonations) {
            if (donation.quantity > topDonation.quantity) {
                topDonation = donation;
            }
        }

        console.log("Top committee donation:", topDonation);
        return topDonation; // { dept, comm, quantity }
    } catch (err) {
        console.error("Error finding top committee donation:", err);
        throw err;
    }
}

