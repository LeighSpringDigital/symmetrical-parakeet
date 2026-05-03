"use client";

import { useState } from "react";
import Link from "next/link";
import { ChevronLeft, Plus, Save, Trash2, Calendar, Image as ImageIcon } from "lucide-react";
import { saveEvent, deleteEvent as apiDeleteEvent } from "@/app/actions";

export default function EventsManager() {
  const [events, setEvents] = useState([
    { id: 1, title: "Friday Night Jazz", date: "Every Friday", isActive: true },
    { id: 2, title: "Sunday Roast", date: "Every Sunday", isActive: true },
  ]);

  const addEvent = async () => {
    const newEvent = { title: "New Event", date: "TBD", description: "Event description", isActive: true };
    try {
      await saveEvent(newEvent);
      // In real app, we'd refetch or the action would return the new item
      alert("Event created in database");
      window.location.reload();
    } catch (e) {
      console.error(e);
    }
  };

  const handleDelete = async (id: number) => {
    if (!confirm("Are you sure?")) return;
    try {
      await apiDeleteEvent(id);
      setEvents(events.filter(e => e.id !== id));
    } catch (e) {
      console.error(e);
    }
  };

  return (
    <main className="min-h-screen bg-navy text-white pt-32 px-6">
      <div className="max-w-6xl mx-auto">
        <div className="flex items-center justify-between mb-12">
          <Link href="/staff/dashboard" className="flex items-center gap-2 text-gold hover:text-white transition-colors uppercase text-xs font-bold tracking-widest">
            <ChevronLeft size={20} /> Dashboard
          </Link>
          <button
            onClick={addEvent}
            className="flex items-center gap-2 bg-gold text-navy font-black px-8 py-3 uppercase tracking-widest hover:bg-white transition-all"
          >
            <Plus size={20} /> Add Event
          </button>
        </div>

        <h1 className="text-4xl md:text-6xl font-black uppercase text-gold mb-12">Events Manager</h1>

        <div className="grid gap-6">
          {events.map((event) => (
            <div key={event.id} className="p-8 bg-white/5 border border-white/10 flex flex-col md:flex-row md:items-center justify-between gap-8 group">
              <div className="flex items-center gap-6 flex-1">
                <div className="w-24 h-24 bg-white/10 flex items-center justify-center text-white/20 border border-white/10 overflow-hidden relative">
                  <ImageIcon size={32} />
                  <div className="absolute inset-0 bg-black/40 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity cursor-pointer">
                    <span className="text-[8px] font-bold uppercase tracking-widest text-white">Change Image</span>
                  </div>
                </div>
                <div className="flex-1 space-y-4">
                  <div className="grid md:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-[8px] font-bold uppercase text-white/20 mb-1">Event Title</label>
                      <input value={event.title} className="w-full bg-navy border border-white/10 p-2 text-gold uppercase text-sm font-bold outline-none" />
                    </div>
                    <div>
                      <label className="block text-[8px] font-bold uppercase text-white/20 mb-1">Date/Frequency</label>
                      <input value={event.date} className="w-full bg-navy border border-white/10 p-2 text-white uppercase text-xs font-bold outline-none" />
                    </div>
                  </div>
                </div>
              </div>

              <div className="flex items-center gap-4">
                <button
                  onClick={() => handleDelete(event.id)}
                  className="p-4 border border-white/10 text-white/20 hover:text-red-600 hover:border-red-600 transition-all"
                >
                  <Trash2 size={20} />
                </button>
                <Link
                  href={`/staff/events/${event.id}`}
                  className="p-4 bg-white/10 text-white font-black uppercase tracking-widest text-xs hover:bg-white hover:text-navy transition-all"
                >
                  Edit Details
                </Link>
              </div>
            </div>
          ))}
        </div>
      </div>
    </main>
  );
}
