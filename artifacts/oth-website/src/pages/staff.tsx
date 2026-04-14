import { useState, useRef } from "react";
import { ChevronRight, X, Upload, Check, Clock, FileText, Calendar, Megaphone, LogOut, Eye, EyeOff } from "lucide-react";

const NAVY = "#002942";
const GOLD = "#C9A227";
const FONT = "'Century Gothic', 'Avant Garde', CenturyGothic, AppleGothic, sans-serif";

type Tab = "notes" | "rota" | "marketing";

interface MarketingIdea {
  id: number;
  title: string;
  type: string;
  description: string;
  fileName?: string;
  status: "pending" | "approved" | "rejected";
  submittedAt: string;
}

const rota = [
  { name: "Rob", role: "Manager", shifts: ["", "12–6", "12–6", "12–6", "", "6–close", "12–8"] },
  { name: "Anna", role: "Bar", shifts: ["12–8", "12–8", "", "12–8", "12–8", "", "12–6"] },
  { name: "Jake", role: "Bar", shifts: ["", "", "6–close", "6–close", "6–close", "12–close", ""] },
  { name: "Priya", role: "Kitchen", shifts: ["12–4", "12–4", "12–4", "", "12–4", "12–4", "12–4"] },
  { name: "Marco", role: "Kitchen", shifts: ["", "5–9", "5–9", "5–9", "5–9", "5–9", "5–9"] },
  { name: "Lena", role: "Floor", shifts: ["", "6–close", "", "6–close", "6–close", "12–close", "12–8"] },
];

const days = ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"];

export default function Staff() {
  const [loggedIn, setLoggedIn] = useState(false);
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [loginError, setLoginError] = useState("");
  const [activeTab, setActiveTab] = useState<Tab>("marketing");
  const [notes, setNotes] = useState(
    "Welcome to the team notes. Use this space for daily handover notes, maintenance issues, special requests, and anything the next shift needs to know.\n\n— Quiz moved to Sunday evenings from this week\n— Barrel of Guinness needs changing (cellar, left rack)\n— Private hire enquiry from Sarah T — follow up by Friday"
  );
  const [notesSaved, setNotesSaved] = useState(false);
  const [ideas, setIdeas] = useState<MarketingIdea[]>([
    { id: 1, title: "Sunday Quiz Night Reel", type: "Video", description: "Short clip of teams playing quiz, behind the bar getting drinks. Ends on the winners cheer.", fileName: "quiz_night_clip.mp4", status: "approved", submittedAt: "13 Apr, 8:45pm" },
    { id: 2, title: "Friday Jazz Atmosphere Post", type: "Photo", description: "Moody bar shots from last Friday jazz night. Suggest using the one with the saxophonist and candlelight.", fileName: "jazz_fri_photos.zip", status: "pending", submittedAt: "11 Apr, 10:15pm" },
  ]);
  const [ideaForm, setIdeaForm] = useState({ title: "", type: "Post", description: "", file: null as File | null });
  const [ideaSubmitted, setIdeaSubmitted] = useState(false);
  const fileRef = useRef<HTMLInputElement>(null);

  function handleLogin(e: React.FormEvent) {
    e.preventDefault();
    if (username.trim().toLowerCase() === "test" && password === "test") {
      setLoggedIn(true);
      setLoginError("");
    } else {
      setLoginError("Incorrect username or password.");
    }
  }

  function handleSaveNotes() {
    setNotesSaved(true);
    setTimeout(() => setNotesSaved(false), 2500);
  }

  function handleIdeaSubmit(e: React.FormEvent) {
    e.preventDefault();
    if (!ideaForm.title.trim() || !ideaForm.description.trim()) return;
    const newIdea: MarketingIdea = {
      id: Date.now(),
      title: ideaForm.title,
      type: ideaForm.type,
      description: ideaForm.description,
      fileName: ideaForm.file?.name,
      status: "pending",
      submittedAt: new Date().toLocaleString("en-GB", { day: "numeric", month: "short", hour: "2-digit", minute: "2-digit" }),
    };
    setIdeas((prev) => [newIdea, ...prev]);
    setIdeaForm({ title: "", type: "Post", description: "", file: null });
    setIdeaSubmitted(true);
    setTimeout(() => setIdeaSubmitted(false), 3000);
  }

  if (!loggedIn) {
    return (
      <div className="min-h-screen flex flex-col items-center justify-center px-6" style={{ backgroundColor: NAVY, fontFamily: FONT }}>
        <a href="/" className="flex items-center gap-2 mb-10 text-white/30 hover:text-white/60 text-xs tracking-widest uppercase transition-colors">
          ← Back to site
        </a>
        <div className="w-full max-w-sm">
          <div className="text-center mb-10">
            <div className="text-xs tracking-[0.6em] uppercase font-semibold mb-3" style={{ color: GOLD }}>Staff Area</div>
            <h1 className="text-white text-3xl font-black uppercase tracking-wide" style={{ fontFamily: FONT }}>
              Old Tigers Head
            </h1>
            <p className="text-white/40 text-sm mt-2">Team portal — staff access only</p>
          </div>

          <form onSubmit={handleLogin} className="space-y-4">
            <div>
              <label className="block text-[10px] font-bold tracking-widest uppercase mb-2" style={{ color: GOLD }}>
                Username
              </label>
              <input
                type="text"
                autoComplete="username"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                className="w-full bg-transparent border px-4 py-3 text-white text-sm placeholder:text-white/30 outline-none focus:border-[#C9A227] transition-colors"
                style={{ borderColor: loginError ? "#ef4444" : "rgba(255,255,255,0.15)" }}
                placeholder="Username"
              />
            </div>
            <div>
              <label className="block text-[10px] font-bold tracking-widest uppercase mb-2" style={{ color: GOLD }}>
                Password
              </label>
              <div className="relative">
                <input
                  type={showPassword ? "text" : "password"}
                  autoComplete="current-password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="w-full bg-transparent border px-4 py-3 pr-12 text-white text-sm placeholder:text-white/30 outline-none focus:border-[#C9A227] transition-colors"
                  style={{ borderColor: loginError ? "#ef4444" : "rgba(255,255,255,0.15)" }}
                  placeholder="Password"
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-4 top-1/2 -translate-y-1/2 text-white/30 hover:text-white/60 transition-colors"
                  aria-label={showPassword ? "Hide password" : "Show password"}
                >
                  {showPassword ? <EyeOff size={16} /> : <Eye size={16} />}
                </button>
              </div>
              {loginError && <p className="text-red-400 text-xs mt-1">{loginError}</p>}
            </div>
            <button
              type="submit"
              className="w-full text-sm font-bold tracking-[0.2em] uppercase py-4 mt-2 transition-all hover:brightness-90"
              style={{ backgroundColor: GOLD, color: NAVY }}
            >
              Sign In
            </button>
          </form>

          <p className="text-white/20 text-xs text-center mt-8">
            This portal is for authorised staff only. Unauthorised access may be monitored.
          </p>
        </div>
      </div>
    );
  }

  const tabs: { id: Tab; label: string; icon: React.ReactNode }[] = [
    { id: "marketing", label: "Marketing", icon: <Megaphone size={15} /> },
    { id: "notes", label: "Team Notes", icon: <FileText size={15} /> },
    { id: "rota", label: "Staff Rota", icon: <Calendar size={15} /> },
  ];

  return (
    <div className="min-h-screen" style={{ backgroundColor: "#001520", fontFamily: FONT }}>
      {/* Header */}
      <div className="border-b border-white/10 px-6 py-4 flex items-center justify-between" style={{ backgroundColor: NAVY }}>
        <div className="flex items-center gap-4">
          <a href="/" className="text-white/40 hover:text-white/70 text-xs tracking-widest uppercase transition-colors flex items-center gap-1">
            ← Site
          </a>
          <div className="w-px h-4 bg-white/10" />
          <div className="font-black uppercase tracking-widest text-sm" style={{ color: GOLD }}>Staff Portal</div>
        </div>
        <button
          onClick={() => setLoggedIn(false)}
          className="flex items-center gap-2 text-white/40 hover:text-white/70 text-xs tracking-widest uppercase transition-colors"
          aria-label="Sign out"
        >
          <LogOut size={14} /> Sign Out
        </button>
      </div>

      <div className="max-w-5xl mx-auto px-6 py-10">
        {/* Tabs */}
        <div className="flex gap-2 mb-10 flex-wrap">
          {tabs.map((tab) => (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id)}
              className="flex items-center gap-2 px-6 py-3 text-xs font-bold tracking-widest uppercase transition-all border"
              style={{
                backgroundColor: activeTab === tab.id ? GOLD : "transparent",
                color: activeTab === tab.id ? NAVY : "rgba(255,255,255,0.6)",
                borderColor: activeTab === tab.id ? GOLD : "rgba(255,255,255,0.15)",
              }}
            >
              {tab.icon} {tab.label}
            </button>
          ))}
        </div>

        {/* ── MARKETING TAB ── */}
        {activeTab === "marketing" && (
          <div>
            <div className="mb-10">
              <div className="text-xs tracking-[0.4em] uppercase font-semibold mb-2" style={{ color: GOLD }}>How it works</div>
              <h2 className="text-white text-2xl font-black uppercase tracking-wide mb-4" style={{ fontFamily: FONT }}>Digital Marketing Creator</h2>
              <div className="border-l-4 px-6 py-5 text-white/65 text-sm leading-relaxed" style={{ borderColor: GOLD, backgroundColor: "rgba(201,162,39,0.06)" }}>
                <strong className="text-white">Here's how the content pipeline works:</strong> Any member of staff can submit a content idea below — whether it's a short video clip, a photo from last night, a caption idea, or a full social media concept. Upload your files or describe your idea in the form, and it will be sent directly to Rob for review. Rob will then approve, tweak, or pass on each submission. Approved content gets scheduled and posted to our social channels. This keeps our social presence authentic and driven by the people who make this pub what it is.
              </div>
            </div>

            {/* Submission form */}
            <div className="border border-white/10 p-8 mb-10" style={{ backgroundColor: "rgba(255,255,255,0.03)" }}>
              <div className="text-[10px] font-bold tracking-widest uppercase mb-6" style={{ color: GOLD }}>Submit a New Idea</div>
              {ideaSubmitted ? (
                <div className="flex items-center gap-3 py-6 justify-center">
                  <div className="w-10 h-10 flex items-center justify-center" style={{ backgroundColor: GOLD }}>
                    <Check size={18} color={NAVY} />
                  </div>
                  <div>
                    <div className="text-white font-bold text-sm">Submitted for review</div>
                    <div className="text-white/50 text-xs">Rob will take a look shortly.</div>
                  </div>
                </div>
              ) : (
                <form onSubmit={handleIdeaSubmit} className="space-y-5">
                  <div className="grid sm:grid-cols-2 gap-5">
                    <div>
                      <label className="block text-[10px] font-bold tracking-widest uppercase mb-2" style={{ color: "rgba(255,255,255,0.5)" }}>
                        Idea Title *
                      </label>
                      <input
                        type="text"
                        placeholder="e.g. Saturday night vibes reel"
                        value={ideaForm.title}
                        onChange={(e) => setIdeaForm((f) => ({ ...f, title: e.target.value }))}
                        className="w-full bg-transparent border px-4 py-3 text-white text-sm placeholder:text-white/25 outline-none focus:border-[#C9A227] transition-colors"
                        style={{ borderColor: "rgba(255,255,255,0.12)" }}
                        required
                      />
                    </div>
                    <div>
                      <label className="block text-[10px] font-bold tracking-widest uppercase mb-2" style={{ color: "rgba(255,255,255,0.5)" }}>
                        Content Type
                      </label>
                      <select
                        value={ideaForm.type}
                        onChange={(e) => setIdeaForm((f) => ({ ...f, type: e.target.value }))}
                        className="w-full border px-4 py-3 text-white text-sm outline-none focus:border-[#C9A227] transition-colors appearance-none cursor-pointer"
                        style={{ backgroundColor: "#001a2e", borderColor: "rgba(255,255,255,0.12)" }}
                      >
                        {["Post", "Reel / Video", "Story", "Photo", "Caption Idea", "Campaign Concept"].map((t) => (
                          <option key={t} value={t}>{t}</option>
                        ))}
                      </select>
                    </div>
                  </div>

                  <div>
                    <label className="block text-[10px] font-bold tracking-widest uppercase mb-2" style={{ color: "rgba(255,255,255,0.5)" }}>
                      Describe Your Idea *
                    </label>
                    <textarea
                      placeholder="What's the idea? What's the vibe? Who's in the video? Any suggested caption or hashtags..."
                      rows={4}
                      value={ideaForm.description}
                      onChange={(e) => setIdeaForm((f) => ({ ...f, description: e.target.value }))}
                      className="w-full bg-transparent border px-4 py-3 text-white text-sm placeholder:text-white/25 outline-none focus:border-[#C9A227] transition-colors resize-none"
                      style={{ borderColor: "rgba(255,255,255,0.12)" }}
                      required
                    />
                  </div>

                  <div>
                    <label className="block text-[10px] font-bold tracking-widest uppercase mb-2" style={{ color: "rgba(255,255,255,0.5)" }}>
                      Attach Files (optional)
                    </label>
                    <div
                      className="border border-dashed px-6 py-6 text-center cursor-pointer hover:border-[#C9A227] transition-colors"
                      style={{ borderColor: ideaForm.file ? GOLD : "rgba(255,255,255,0.12)" }}
                      onClick={() => fileRef.current?.click()}
                    >
                      {ideaForm.file ? (
                        <div className="flex items-center justify-center gap-3">
                          <Check size={14} style={{ color: GOLD }} />
                          <span className="text-sm text-white">{ideaForm.file.name}</span>
                          <button
                            type="button"
                            onClick={(e) => { e.stopPropagation(); setIdeaForm((f) => ({ ...f, file: null })); }}
                            className="text-white/40 hover:text-white transition-colors"
                          >
                            <X size={14} />
                          </button>
                        </div>
                      ) : (
                        <div className="flex flex-col items-center gap-2 text-white/40">
                          <Upload size={20} />
                          <span className="text-xs">Click to attach a photo, video, or document</span>
                        </div>
                      )}
                    </div>
                    <input
                      ref={fileRef}
                      type="file"
                      accept="image/*,video/*,.pdf,.doc,.docx"
                      className="hidden"
                      onChange={(e) => setIdeaForm((f) => ({ ...f, file: e.target.files?.[0] ?? null }))}
                    />
                  </div>

                  <button
                    type="submit"
                    className="text-sm font-bold tracking-widest uppercase px-10 py-4 transition-all hover:brightness-90"
                    style={{ backgroundColor: GOLD, color: NAVY }}
                  >
                    Submit for Review
                  </button>
                </form>
              )}
            </div>

            {/* Submissions queue */}
            <div>
              <div className="text-[10px] font-bold tracking-widest uppercase mb-5" style={{ color: "rgba(255,255,255,0.4)" }}>Submitted Ideas</div>
              <div className="space-y-3">
                {ideas.map((idea) => (
                  <div key={idea.id} className="border border-white/10 p-5 flex items-start gap-5" style={{ backgroundColor: "rgba(255,255,255,0.02)" }}>
                    <div className="flex-1 min-w-0">
                      <div className="flex items-center gap-3 flex-wrap mb-1">
                        <span className="font-bold text-sm text-white">{idea.title}</span>
                        <span className="text-[10px] font-bold tracking-widest uppercase px-2 py-0.5" style={{ backgroundColor: "rgba(255,255,255,0.06)", color: "rgba(255,255,255,0.4)" }}>{idea.type}</span>
                      </div>
                      <p className="text-white/50 text-xs leading-relaxed mb-2">{idea.description}</p>
                      {idea.fileName && <div className="text-white/30 text-[10px]">📎 {idea.fileName}</div>}
                      <div className="text-white/25 text-[10px] mt-1">Submitted {idea.submittedAt}</div>
                    </div>
                    <div className="flex-shrink-0 flex items-center gap-2 pt-0.5">
                      {idea.status === "approved" && (
                        <span className="flex items-center gap-1.5 text-[10px] font-bold tracking-wider uppercase px-3 py-1.5" style={{ backgroundColor: "rgba(34,197,94,0.12)", color: "#4ade80" }}>
                          <Check size={10} /> Approved
                        </span>
                      )}
                      {idea.status === "pending" && (
                        <span className="flex items-center gap-1.5 text-[10px] font-bold tracking-wider uppercase px-3 py-1.5" style={{ backgroundColor: "rgba(201,162,39,0.12)", color: GOLD }}>
                          <Clock size={10} /> Pending
                        </span>
                      )}
                      {idea.status === "rejected" && (
                        <span className="flex items-center gap-1.5 text-[10px] font-bold tracking-wider uppercase px-3 py-1.5" style={{ backgroundColor: "rgba(239,68,68,0.12)", color: "#f87171" }}>
                          <X size={10} /> Passed
                        </span>
                      )}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        )}

        {/* ── TEAM NOTES TAB ── */}
        {activeTab === "notes" && (
          <div>
            <div className="mb-6">
              <h2 className="text-white text-2xl font-black uppercase tracking-wide mb-1" style={{ fontFamily: FONT }}>Team Notes</h2>
              <p className="text-white/40 text-sm">Handover notes, maintenance issues, reminders, and anything the next shift needs to know.</p>
            </div>
            <textarea
              className="w-full bg-transparent border px-6 py-5 text-white/80 text-sm leading-relaxed outline-none focus:border-[#C9A227] transition-colors resize-none"
              style={{ borderColor: "rgba(255,255,255,0.12)", minHeight: "420px" }}
              value={notes}
              onChange={(e) => setNotes(e.target.value)}
              placeholder="Write your handover notes here..."
            />
            <div className="flex items-center gap-4 mt-4">
              <button
                onClick={handleSaveNotes}
                className="text-xs font-bold tracking-widest uppercase px-8 py-3 transition-all hover:brightness-90"
                style={{ backgroundColor: GOLD, color: NAVY }}
              >
                Save Notes
              </button>
              {notesSaved && (
                <span className="flex items-center gap-2 text-xs font-bold tracking-widest uppercase" style={{ color: "#4ade80" }}>
                  <Check size={13} /> Saved
                </span>
              )}
            </div>
          </div>
        )}

        {/* ── ROTA TAB ── */}
        {activeTab === "rota" && (
          <div>
            <div className="mb-6 flex items-start justify-between flex-wrap gap-4">
              <div>
                <h2 className="text-white text-2xl font-black uppercase tracking-wide mb-1" style={{ fontFamily: FONT }}>Staff Rota</h2>
                <p className="text-white/40 text-sm">Week of 14 – 20 April 2026. Contact Rob to request changes.</p>
              </div>
            </div>
            <div className="overflow-x-auto">
              <table className="w-full text-sm border-collapse" role="table">
                <thead>
                  <tr>
                    <th className="text-left px-4 py-3 text-[10px] font-bold tracking-widest uppercase" style={{ color: GOLD, borderBottom: "1px solid rgba(255,255,255,0.1)" }}>
                      Name
                    </th>
                    {days.map((d) => (
                      <th key={d} className="px-4 py-3 text-[10px] font-bold tracking-widest uppercase text-center" style={{ color: "rgba(255,255,255,0.5)", borderBottom: "1px solid rgba(255,255,255,0.1)" }}>
                        {d}
                      </th>
                    ))}
                  </tr>
                </thead>
                <tbody>
                  {rota.map((person, i) => (
                    <tr key={person.name} style={{ backgroundColor: i % 2 === 0 ? "rgba(255,255,255,0.02)" : "transparent" }}>
                      <td className="px-4 py-4" style={{ borderBottom: "1px solid rgba(255,255,255,0.06)" }}>
                        <div className="font-bold text-white text-sm">{person.name}</div>
                        <div className="text-[10px] tracking-wide uppercase" style={{ color: "rgba(201,162,39,0.7)" }}>{person.role}</div>
                      </td>
                      {person.shifts.map((shift, j) => (
                        <td key={j} className="px-4 py-4 text-center" style={{ borderBottom: "1px solid rgba(255,255,255,0.06)" }}>
                          {shift ? (
                            <span className="text-xs font-semibold text-white/80 whitespace-nowrap">{shift}</span>
                          ) : (
                            <span className="text-white/15 text-lg">—</span>
                          )}
                        </td>
                      ))}
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
            <p className="text-white/25 text-xs mt-6">Rota is managed by Rob. To swap a shift or flag an issue, speak to Rob directly or email enquiries@theoldtigershead.com.</p>
          </div>
        )}
      </div>
    </div>
  );
}
