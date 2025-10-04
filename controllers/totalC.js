import { getCommDonations } from "./committesC.js";
import { getDeptDonations } from "./daysC.js";

export async function getTotalDonations() {
    try {
        const deptDonations = await getDeptDonations();
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
        return deptDonations;
    } catch (err) {
        console.error("Error calculating total donations:", err);
        throw err;
    }
}