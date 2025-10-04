import express from "express";
import { getDeptDonations } from "../controllers/daysC.js";
import { getCommDonations } from "../controllers/committesC.js";
import { getTotalDonations } from "../controllers/totalC.js";

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

export default router;