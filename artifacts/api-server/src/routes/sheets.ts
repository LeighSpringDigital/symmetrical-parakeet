import { Hono } from "hono";
import { logger } from "../lib/logger";
import * as XLSX from "xlsx";

const router = new Hono();

/**
 * Helper: Fetch an Excel file from a URL and parse it.
 */
async function fetchExcel(url: string) {
  const response = await fetch(url);
  if (!response.ok) {
    throw new Error(`Failed to fetch Excel: ${response.status} ${response.statusText}`);
  }

  const arrayBuffer = await response.arrayBuffer();
  const workbook = XLSX.read(arrayBuffer, { type: "array" });
  return workbook;
}

/**
 * Helper: Parse a Menu sheet into the grouped format.
 * Expects Row 1: Title (skipped), Row 2: Headers, Sub-headers as single-cell rows.
 */
function parseMenuSheet(sheet: XLSX.WorkSheet) {
  const rows = XLSX.utils.sheet_to_json(sheet, { header: 1 }) as any[][];
  if (rows.length < 2) return [];

  // Skip Row 1 (Title), Row 2 is Headers
  const headers = rows[1];
  const body = rows.slice(2);

  const sections: Record<string, { name: string; desc: string; price: string }[]> = {};
  let currentSection = "Other";

  for (const row of body) {
    if (!row || row.length === 0) continue;

    // Detect Section Header: Single cell row
    const nonNullCells = row.filter(c => c !== null && c !== undefined && String(c).trim() !== "");
    if (nonNullCells.length === 1 && rows[body.indexOf(row) + 2] !== undefined) {
      currentSection = String(nonNullCells[0]).trim();
      continue;
    }

    // Map row to item
    const item: any = {};
    headers.forEach((h: any, i: number) => {
      const key = String(h).trim();
      item[key] = row[i];
    });

    if (!sections[currentSection]) sections[currentSection] = [];
    sections[currentSection].push({
      name: String(item["Dish Name"] || "").trim(),
      desc: String(item["Description"] || "").trim(),
      price: String(item["Price (£)"] || "").trim(),
    });
  }

  return sections;
}

// GET /api/sheets/whats-on?url=<excel-url>
router.get("/whats-on", async (c) => {
  const url = c.req.query("url") || process.env.EXCEL_FILE_URL;
  if (!url) return c.json({ error: "url query param or EXCEL_FILE_URL required" }, 400);

  try {
    const workbook = await fetchExcel(url);
    const sheet = workbook.Sheets["Events"];
    if (!sheet) return c.json({ error: "Events sheet not found" }, 404);

    const rows = XLSX.utils.sheet_to_json(sheet, { header: 1 }) as any[][];
    if (rows.length < 2) return c.json({ events: [] });

    const headers = rows[1];
    const body = rows.slice(2);

    const events = body.map(row => {
      const obj: any = {};
      headers.forEach((h: any, i: number) => {
        obj[String(h).trim()] = row[i];
      });
      return {
        Day: String(obj["Date"] || "").trim(),
        Time: String(obj["Time"] || "").trim(),
        Title: String(obj["Event Name"] || "").trim(),
        Description: String(obj["Description"] || "").trim(),
        Tag: String(obj["Recurrence"] || "").trim(),
      };
    });

    return c.json({ events });
  } catch (err: unknown) {
    logger.error(err, "Failed to fetch Events from Excel");
    return c.json({ error: "Failed to fetch data" }, 500);
  }
});

// GET /api/sheets/menu?url=<excel-url>&type=<lunch|dinner|sunday|etc>
router.get("/menu", async (c) => {
  const url = c.req.query("url") || process.env.EXCEL_FILE_URL;
  const type = c.req.query("type") || "Lunch"; // Default to Lunch

  if (!url) return c.json({ error: "url query param or EXCEL_FILE_URL required" }, 400);

  try {
    const workbook = await fetchExcel(url);
    
    // Support mapping "today" and "sunday" to sheet names
    let sheetName = type;
    if (type.toLowerCase() === "today") sheetName = "Lunch";
    if (type.toLowerCase() === "sunday") sheetName = "Sunday";

    const sheet = workbook.Sheets[sheetName];
    if (!sheet) return c.json({ error: `Sheet "${sheetName}" not found` }, 404);

    const sections = parseMenuSheet(sheet);
    return c.json({ sections });
  } catch (err: unknown) {
    logger.error(err, `Failed to fetch ${type} menu from Excel`);
    return c.json({ error: "Failed to fetch data" }, 500);
  }
});

export default router;
