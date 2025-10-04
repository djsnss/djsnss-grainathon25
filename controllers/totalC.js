import { getCommDonations } from "./committesC.js";
import { getDeptDonations } from "./daysC.js";

export async function getTotalDonations() {
    try {
        const deptDonations = {
            AIDS: 0,
            AIML: 0,
            COMPS: 0,
            CSEDS: 0,
            EXTC: 0,
            ICB: 0,
            IT: 0,
            MECH: 0,
            Outsider: 0,
        }
        const commDonations = await getCommDonations();
        for (const comm of commDonations) {
            const dept = comm.dept;
            const quantity = comm.quantity || 0;
            if (dept in deptDonations) {
                deptDonations[dept] += quantity;
            } else {
                deptDonations.Outsider += quantity;
            }
        }

        const day1Donations = await getDeptDonations(1);
        const day2Donations = await getDeptDonations(2);
        const day3Donations = await getDeptDonations(3);
        for (const dept in deptDonations) {
            deptDonations[dept] += (day1Donations[dept] || 0) + (day2Donations[dept] || 0) + (day3Donations[dept] || 0);
        }
        console.log("Total donations calculated:", deptDonations);
        return deptDonations;
    } catch (err) {
        console.error("Error calculating total donations:", err);
        throw err;
    }
}