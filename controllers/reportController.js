import { categorizeReport } from "../util/categorizer.js";
import Report from "../models/report.js";


export const saveReport = async (req, res) => {
    const { name, email, report } = req.body;
    try {
        if (!name || !email || !report) {
            return res.status(400).json({ error: "Please fill in all fields." });
        }

        let catergorized = await categorizeReport(report);

        let store = new Report({
            studname: name,
            mail: email,
            report: report, 
            category: catergorized
        })
        await store.save()
        return res.status(201).json({ message: "Report saved successfully", store });
    }
    catch (err) {
        return res.status(500).json({ msg: "Internal server error", dev: err });
    }
}

export const getReports = async (req, res) => {
    try {
        // sort by latest
        const reports = await Report.find().sort({ createdAt: -1 }); 
        return res.status(200).json(reports);
    } catch (err) {
        return res.status(500).json({ message: "Failed to retrieve reports", dev: err.message });
    }
};