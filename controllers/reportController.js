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

export const deleteOneReport = async (req, res) => {
    const { id } = req.params;
    if (!id) {
        res.status(401).json({ err: "invalid request" });
    }
    try {
        const single = await Report.findById(id);
        if (!single) {
            return res.status(404).json({ error: "Report not found" });
        }

        await single.deleteOne();
        res.status(201).json({ msg: "deleted successfully" });
    }
    catch (error) {
        res.status(500).json({ err: "Server error" });
    }
}

export const getOneReport = async (req, res) => {
  const { id } = req.params;

  if (!id) {
    return res.status(400).json({ error: "Invalid request" });
  }

  try {
    const report = await Report.findById(id);
    if (!report) {
      return res.status(404).json({ err: "Report not found" });
    }

    res.status(200).json(report);
  } catch (error) {
    console.error("Fetch report error:", error);
    res.status(500).json({ err: "Server error" });
  }
};
