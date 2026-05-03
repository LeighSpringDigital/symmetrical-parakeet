"use client";

import { useState } from "react";
import Link from "next/link";
import { ChevronLeft, Upload, FileSpreadsheet, Save, Trash2, Plus } from "lucide-react";
import * as XLSX from "xlsx";
import { bulkUploadMenu } from "@/app/actions";

export default function MenuManager() {
  const [activeMenu, setActiveMenu] = useState<"today" | "sunday" | "kids" | "General">("today");
  const [items, setItems] = useState<any[]>([]);
  const [uploading, setUploading] = useState(false);
  const [saving, setSaving] = useState(false);

  const handleFileUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    setUploading(true);
    const reader = new FileReader();
    reader.onload = (evt) => {
      const bstr = evt.target?.result;
      const wb = XLSX.read(bstr, { type: "binary" });
      const wsname = wb.SheetNames[0];
      const ws = wb.Sheets[wsname];
      const data = XLSX.utils.sheet_to_json(ws);
      
      const mappedData = data.map((row: any) => ({
        section: row.Section || row.section || "General",
        name: row.Name || row.name || "Untitled Item",
        description: row.Description || row.description || "",
        price: row.Price || row.price || "£0.00",
      }));

      setItems(mappedData);
      setUploading(false);
    };
    reader.readAsBinaryString(file);
  };

  const saveMenu = async () => {
    setSaving(true);
    try {
      await bulkUploadMenu(activeMenu, items);
      alert("Menu saved successfully");
    } catch (e) {
      console.error(e);
      alert("Failed to save menu");
    } finally {
      setSaving(false);
    }
  };

  return (
    <main className="min-h-screen bg-navy text-white pt-32 px-6">
      <div className="max-w-6xl mx-auto">
        <div className="flex items-center justify-between mb-12">
          <Link href="/staff/dashboard" className="flex items-center gap-2 text-gold hover:text-white transition-colors uppercase text-xs font-bold tracking-widest">
            <ChevronLeft size={20} /> Dashboard
          </Link>
          <div className="flex gap-4">
            <label className="flex items-center gap-2 bg-white/10 text-white font-black px-8 py-3 uppercase tracking-widest hover:bg-white hover:text-navy transition-all cursor-pointer">
              <Upload size={20} /> {uploading ? "Parsing..." : "Upload Excel"}
              <input type="file" accept=".xlsx, .xls" className="hidden" onChange={handleFileUpload} />
            </label>
            <button
              onClick={saveMenu}
              className="flex items-center gap-2 bg-gold text-navy font-black px-8 py-3 uppercase tracking-widest hover:bg-white transition-all"
            >
              <Save size={20} /> Save Menu
            </button>
          </div>
        </div>

        <h1 className="text-4xl md:text-6xl font-black uppercase text-gold mb-4">Menu Manager</h1>
        
        <div className="flex gap-4 mb-12 border-b border-white/10">
          {["today", "sunday", "kids"].map((type) => (
            <button
              key={type}
              onClick={() => setActiveMenu(type as any)}
              className={`pb-4 px-6 uppercase text-xs font-bold tracking-[0.2em] transition-all ${
                activeMenu === type ? "text-gold border-b-2 border-gold" : "text-white/40"
              }`}
            >
              {type} Menu
            </button>
          ))}
        </div>

        <div className="grid gap-6">
          {items.length === 0 ? (
            <div className="py-24 border-2 border-dashed border-white/10 text-center">
              <FileSpreadsheet className="text-white/10 mx-auto mb-4" size={48} />
              <p className="text-white/40 uppercase tracking-widest text-xs font-bold">No items found. Upload an Excel file or add manually.</p>
              <button className="mt-8 text-gold border border-gold px-6 py-2 uppercase text-[10px] font-bold tracking-widest">Add Item Manually</button>
            </div>
          ) : (
            items.map((item, idx) => (
              <div key={idx} className="p-6 bg-white/5 border border-white/10 flex items-center justify-between gap-8 group">
                <div className="grid md:grid-cols-4 flex-1 gap-6">
                  <div>
                    <label className="block text-[8px] font-bold uppercase text-white/20 mb-1">Section</label>
                    <input value={item.section} className="w-full bg-navy border border-white/10 p-2 text-gold uppercase text-xs font-bold outline-none" />
                  </div>
                  <div className="md:col-span-2">
                    <label className="block text-[8px] font-bold uppercase text-white/20 mb-1">Item Name & Description</label>
                    <input value={item.name} className="w-full bg-navy border border-white/10 p-2 text-white uppercase text-xs font-bold outline-none mb-2" />
                    <input value={item.description} className="w-full bg-navy border border-white/10 p-2 text-white/50 text-xs outline-none" />
                  </div>
                  <div>
                    <label className="block text-[8px] font-bold uppercase text-white/20 mb-1">Price</label>
                    <input value={item.price} className="w-full bg-navy border border-white/10 p-2 text-gold font-black outline-none" />
                  </div>
                </div>
                <button className="text-white/20 hover:text-red-600 transition-colors">
                  <Trash2 size={20} />
                </button>
              </div>
            ))
          )}
        </div>

        {items.length > 0 && (
          <button className="w-full py-8 mt-6 border-2 border-dashed border-white/10 text-white/40 hover:text-gold hover:border-gold transition-all uppercase text-xs font-bold tracking-widest flex items-center justify-center gap-2">
            <Plus size={20} /> Add New Item
          </button>
        )}
      </div>
    </main>
  );
}
