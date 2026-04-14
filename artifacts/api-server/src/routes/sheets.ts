import { Router, type IRouter } from "express";
import { ReplitConnectors } from "@replit/connectors-sdk";

const router: IRouter = Router();
const connectors = new ReplitConnectors();

// Helper: fetch a named range from a sheet and parse into row objects
async function fetchSheet(spreadsheetId: string, range: string) {
  const response = await connectors.proxy(
    "google-sheet",
    `/v4/spreadsheets/${spreadsheetId}/values/${encodeURIComponent(range)}`,
    { method: "GET" }
  );
  const data = (await response.json()) as { values?: string[][] };
  const rows = data.values ?? [];
  if (rows.length < 2) return [];
  const [headers, ...body] = rows;
  return body.map((row) => {
    const obj: Record<string, string> = {};
    headers.forEach((h, i) => {
      obj[h.trim()] = (row[i] ?? "").trim();
    });
    return obj;
  });
}

// GET /api/sheets/whats-on?sheetId=<id>
router.get("/whats-on", async (req, res) => {
  const { sheetId } = req.query as { sheetId?: string };
  if (!sheetId) {
    res.status(400).json({ error: "sheetId query param required" });
    return;
  }
  try {
    const events = await fetchSheet(sheetId, "What's On!A:F");
    res.json({ events });
  } catch (err: unknown) {
    req.log.error(err, "Failed to fetch What's On");
    res.status(500).json({ error: "Failed to fetch sheet" });
  }
});

// GET /api/sheets/menu?sheetId=<id>
router.get("/menu", async (req, res) => {
  const { sheetId } = req.query as { sheetId?: string };
  if (!sheetId) {
    res.status(400).json({ error: "sheetId query param required" });
    return;
  }
  try {
    const items = await fetchSheet(sheetId, "Menu!A:E");
    // Group by Section column
    const sections: Record<string, { name: string; desc: string; price: string }[]> = {};
    for (const row of items) {
      const section = row["Section"] || "Other";
      if (!sections[section]) sections[section] = [];
      sections[section].push({
        name: row["Item"] || "",
        desc: row["Description"] || "",
        price: row["Price"] || "",
      });
    }
    res.json({ sections });
  } catch (err: unknown) {
    req.log.error(err, "Failed to fetch Menu");
    res.status(500).json({ error: "Failed to fetch sheet" });
  }
});

export default router;
