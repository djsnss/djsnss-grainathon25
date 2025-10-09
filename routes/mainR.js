import express from "express";
import { getDeptDonations } from "../controllers/daysC.js";
import { getCommDonations } from "../controllers/committesC.js";
import { getTotalDonations } from "../controllers/totalC.js";
import { getTopCommDonation } from "../controllers/committesC.js";
import { getTopDepartment } from "../controllers/totalC.js";

const router = express.Router();

router.get("/day", async (req, res) => {
    try {
        const data = await getDeptDonations(3);
        return res.status(200).json(data);
    } catch (err) {
        console.error("Route error /days:", err);
        return res
            .status(500)
            .json({ message: "Failed to fetch donations" });
    }
});

router.get("/comm", async (req, res) => {
    try {
        const data = await getCommDonations();
        return res.status(200).json(data);
    } catch (err) {
        console.error("Route error /comm:", err);
        return res
            .status(500)
            .json({ message: "Failed to fetch donations" });
    }
});

router.get("/total", async (req, res) => {
    try {
        const data = await getTotalDonations();
        return res.status(200).json(data);
    } catch (err) {
        console.error("Route error /total:", err);
        return res
            .status(500)
            .json({ message: "Failed to fetch total donations" });
    }
});

router.get("/winning", async (req, res) => {
    try {
        const topDept = await getTopDepartment();
        const topComm = await getTopCommDonation();
        return res.status(200).json({
            "dept": topDept ? topDept.dept : null,
            "dept-quantity": topDept ? topDept.total : null,
            "comm": topComm ? topComm.comm : null,
            // "comm-dept": topComm ? topComm.dept : null,
            "comm-quantity": topComm ? topComm.quantity : null
        });
    } catch (err) {
        console.error("Route error /winning:", err);
        return res
            .status(500)
            .json({ message: "Failed to fetch top committee donation" });
    }
});

export default router;