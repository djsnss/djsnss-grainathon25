import dotenv from "dotenv";
import { getValues } from "../services/sheetS.js";

dotenv.config();

const SPREADSHEET_ID = process.env.SPREADSHEET_ID;
const RANGE = "Day2!F:H";

function createEmptyDeptList() {
    return {
        AIDS: 0,
        AIML: 0,
        COMPS: 0,
        CSEDS: 0,
        EXTC: 0,
        ICB: 0,
        IT: 0,
        MECH: 0
    };
}

export async function getDeptDonations(day = 1) {
    try {
        const RANGE = `Day${day}!F:H`;
        console.log("Fetching data from Google Sheets...");
        const responseData = await getValues(SPREADSHEET_ID, RANGE);
        const rows = (responseData.values || []).slice(1); // skip header
        const deptDonations = createEmptyDeptList();

        rows.forEach((row) => {
            const dept = row[0];
            const quantity = parseFloat(row[2]) || 0;
            const grainOrCloth = row[1];
            if (grainOrCloth == "GRAIN") { // only count grain donations
                if (dept in deptDonations) {
                    deptDonations[dept] += quantity;
                }
            }
        });

        console.log("Department donations calculated:", deptDonations);
        return deptDonations;
    } catch (err) {
        console.error("Error fetching data:", err);
        throw err;
    }
}