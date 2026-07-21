import { useRef, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { useContent } from "../context/ContentContext";
import { Settings, X, Plus, Download, Upload, RotateCcw, Save } from "../utils/icons.jsx";
import {
  TextField,
  TextAreaField,
  ImageField,
  IconSelectField,
  RatingField,
  SectionCard,
  ArrayItemShell,
} from "./Fields";
import { socialIconOptions } from "../utils/icons.jsx";

export default function AdminPanel() {
  const {
    content,
    updateContent,
    resetContent,
    saveContent,
    exportContent,
    importContent,
    isAdminOpen,
    setIsAdminOpen,
    isOwnerUnlocked,
    unlockAdminPortal,
    lockAdminPortal,
    revokeOwnerAccess,
  } = useContent();
  const importRef = useRef(null);
  const [saved, setSaved] = useState(false);
  const [saving, setSaving] = useState(false);

  const set = (section, value) => updateContent((prev) => ({ ...prev, [section]: value }));
  const patch = (section, field, value) => updateContent((prev) => ({ ...prev, [section]: { ...prev[section], [field]: value } }));

  const handleImportFile = (e) => {
    const file = e.target.files?.[0];
    if (!file) return;
    const reader = new FileReader();
    reader.onload = () => {
      try {
        const json = JSON.parse(reader.result);
        importContent(json);
      } catch (err) {
        alert("Invalid JSON file");
      }
    };
    reader.readAsText(file);
    e.target.value = "";
  };

  const handleSave = async () => {
    if (saving) return;
    setSaving(true);
    try {
      await saveContent(content);
      setSaved(true);
      setTimeout(() => setSaved(false), 2500);
    } catch (e) {
      alert("Save failed: " + e.message);
    } finally {
      setSaving(false);
    }
  };

  if (!isOwnerUnlocked) return null;

  return (
    <>
      {/* Floating toggle button */}
      <motion.button
        onClick={() => setIsAdminOpen(true)}
        whileHover={{ scale: 1.08, rotate: 20 }}
        whileTap={{ scale: 0.92 }}
        className="fixed bottom-6 right-6 z-[60] flex h-14 w-14 items-center justify-center rounded-full bg-slate-900 text-white shadow-2xl shadow-black/30"
        aria-label="Open content editor"
        title="Edit Content"
      >
        <Settings className="h-6 w-6" />
      </motion.button>

      <AnimatePresence>
        {isAdminOpen && (
          <>
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setIsAdminOpen(false)}
              className="fixed inset-0 z-50 bg-black/40 backdrop-blur-sm"
            />
            <motion.div
              initial={{ x: "100%" }}
              animate={{ x: 0 }}
              exit={{ x: "100%" }}
              transition={{ type: "spring", damping: 28, stiffness: 260 }}
              className="fixed right-0 top-0 z-50 flex h-full w-full max-w-md flex-col bg-white shadow-2xl"
            >
              {/* Header */}
              <div className="flex items-center justify-between border-b border-slate-200 px-5 py-4">
                <div>
                  <h2 className="font-display text-lg font-extrabold text-slate-900">Portfolio Portal</h2>
                  <p className="text-xs text-slate-500">Update your content, images, and site copy in real time.</p>
                </div>
                <button
                  onClick={() => lockAdminPortal()}
                  className="flex h-9 w-9 items-center justify-center rounded-lg hover:bg-slate-100"
                  title="Close panel"
                >
                  <X className="h-5 w-5" />
                </button>
              </div>

              {/* Toolbar */}
              <div className="flex flex-wrap gap-2 border-b border-slate-200 px-5 py-3">
                <button
                  onClick={handleSave}
                  disabled={saving}
                  className={`flex items-center gap-1.5 rounded-lg px-3 py-1.5 text-xs font-semibold transition-all disabled:opacity-60 disabled:cursor-not-allowed ${
                    saved
                      ? "bg-green-100 text-green-700 ring-1 ring-green-300"
                      : "bg-[#83B17F] text-white hover:bg-[#5f8f5a] shadow-sm shadow-[#83B17F]/30"
                  }`}
                >
                  <Save className="h-3.5 w-3.5" />
                  {saving ? "Saving…" : saved ? "Saved ✓" : "Save"}
                </button>
                <button
                  onClick={exportContent}
                  className="flex items-center gap-1.5 rounded-lg bg-slate-100 px-3 py-1.5 text-xs font-semibold text-slate-700 hover:bg-slate-200"
                >
                  <Download className="h-3.5 w-3.5" /> Export
                </button>
                <button
                  onClick={() => importRef.current?.click()}
                  className="flex items-center gap-1.5 rounded-lg bg-slate-100 px-3 py-1.5 text-xs font-semibold text-slate-700 hover:bg-slate-200"
                >
                  <Upload className="h-3.5 w-3.5" /> Import
                </button>
                <input ref={importRef} type="file" accept="application/json" onChange={handleImportFile} className="hidden" />
                <button
                  onClick={() => {
                    if (confirm("Reset all content to default? This cannot be undone.")) resetContent();
                  }}
                  className="ml-auto flex items-center gap-1.5 rounded-lg bg-red-50 px-3 py-1.5 text-xs font-semibold text-red-600 hover:bg-red-100"
                >
                  <RotateCcw className="h-3.5 w-3.5" /> Reset
                </button>
              </div>

              {/* Scrollable form */}
              <div className="flex-1 space-y-3 overflow-y-auto p-5">
                <div className="rounded-xl border border-[#83B17F]/20 bg-gradient-to-br from-[#EBF0DA] to-white p-4">
                  <p className="text-[11px] font-semibold uppercase tracking-[0.25em] text-[#5f8f5a]">Live editing</p>
                  <p className="mt-1 text-sm text-slate-600">Adjust your copy, swap images, and instantly preview the updated experience.</p>
                </div>

                {/* COLOR THEME */}
                <SectionCard title="🎨 Color Theme" defaultOpen>
                  <div>
                    <label className="mb-2 block text-xs font-semibold uppercase tracking-wide text-slate-500">
                      Primary / Accent Color
                    </label>
                    <div className="flex items-center gap-3">
                      <input
                        type="color"
                        value={content.theme?.primary || "#83B17F"}
                        onChange={(v) => updateContent((prev) => ({ ...prev, theme: { ...prev.theme, primary: v.target.value } }))}
                        className="h-10 w-16 cursor-pointer rounded-lg border border-slate-200 p-0.5"
                      />
                      <span className="font-mono text-sm text-slate-700">{content.theme?.primary || "#83B17F"}</span>
                      <button
                        onClick={() => updateContent((prev) => ({ ...prev, theme: { ...prev.theme, primary: "#83B17F" } }))}
                        className="ml-auto rounded-lg bg-slate-100 px-3 py-1.5 text-xs font-semibold text-slate-600 hover:bg-slate-200"
                      >
                        Reset
                      </button>
                    </div>
                    <p className="mt-2 text-[11px] text-slate-400">Changes apply instantly — click Save to persist.</p>
                    {/* Preset swatches */}
                    <div className="mt-3 flex flex-wrap gap-2">
                      {[
                        { label: "Sage", color: "#83B17F" },
                        { label: "Ocean", color: "#4f8fb5" },
                        { label: "Coral", color: "#e07b6a" },
                        { label: "Purple", color: "#8b6bb1" },
                        { label: "Gold", color: "#c49a28" },
                        { label: "Navy", color: "#3b5278" },
                        { label: "Rose", color: "#b56b7e" },
                        { label: "Teal", color: "#3a9e8f" },
                      ].map((s) => (
                        <button
                          key={s.color}
                          onClick={() => updateContent((prev) => ({ ...prev, theme: { ...prev.theme, primary: s.color } }))}
                          title={s.label}
                          className="group relative h-7 w-7 rounded-full border-2 border-white shadow-md transition hover:scale-110"
                          style={{ backgroundColor: s.color, outline: content.theme?.primary === s.color ? `2px solid ${s.color}` : "none", outlineOffset: "2px" }}
                        >
                          <span className="absolute -top-7 left-1/2 -translate-x-1/2 whitespace-nowrap rounded bg-slate-900 px-1.5 py-0.5 text-[10px] text-white opacity-0 group-hover:opacity-100">{s.label}</span>
                        </button>
                      ))}
                    </div>
                  </div>
                </SectionCard>

                <SectionCard title="Brand & Navbar" defaultOpen>
                  <TextField label="Initials" value={content.brand.initials} onChange={(v) => patch("brand", "initials", v)} />
                  <TextField label="Name" value={content.brand.name} onChange={(v) => patch("brand", "name", v)} />
                  <TextField label="Role / Tagline" value={content.brand.role} onChange={(v) => patch("brand", "role", v)} />
                </SectionCard>

                {/* HERO */}
                <SectionCard title="Hero Section">
                  <TextField label="Badge Text" value={content.hero.badge} onChange={(v) => patch("hero", "badge", v)} />
                  <TextField label="Title Line 1" value={content.hero.titleLine1} onChange={(v) => patch("hero", "titleLine1", v)} />
                  <TextField label="Title Line 2 (accent)" value={content.hero.titleLine2} onChange={(v) => patch("hero", "titleLine2", v)} />
                  <TextAreaField label="Description" value={content.hero.description} onChange={(v) => patch("hero", "description", v)} />
                  <div className="grid grid-cols-2 gap-3">
                    <TextField label="Primary Button" value={content.hero.primaryBtnText} onChange={(v) => patch("hero", "primaryBtnText", v)} />
                    <TextField label="Primary Link" value={content.hero.primaryBtnHref} onChange={(v) => patch("hero", "primaryBtnHref", v)} />
                  </div>
                  <div className="grid grid-cols-2 gap-3">
                    <TextField label="Secondary Button" value={content.hero.secondaryBtnText} onChange={(v) => patch("hero", "secondaryBtnText", v)} />
                    <TextField label="Secondary Link" value={content.hero.secondaryBtnHref} onChange={(v) => patch("hero", "secondaryBtnHref", v)} />
                  </div>
                  <ImageField label="Hero Image" value={content.hero.image} onChange={(v) => patch("hero", "image", v)} />
                  <div className="grid grid-cols-2 gap-3">
                    <TextField label="Floating Tag 1" value={content.hero.tagOne} onChange={(v) => patch("hero", "tagOne", v)} />
                    <TextField label="Floating Tag 2" value={content.hero.tagTwo} onChange={(v) => patch("hero", "tagTwo", v)} />
                  </div>
                  <TextAreaField label="Code Snippet" rows={4} value={content.hero.codeSnippet} onChange={(v) => patch("hero", "codeSnippet", v)} />
                </SectionCard>

                {/* STATS */}
                <SectionCard title="Stats Bar">
                  {content.stats.map((s, i) => (
                    <ArrayItemShell
                      key={i}
                      title={`Stat ${i + 1}`}
                      onRemove={() => set("stats", content.stats.filter((_, idx) => idx !== i))}
                    >
                      <IconSelectField label="Icon" value={s.icon} onChange={(v) => set("stats", content.stats.map((x, idx) => (idx === i ? { ...x, icon: v } : x)))} />
                      <div className="grid grid-cols-2 gap-3">
                        <TextField label="Value" value={s.value} onChange={(v) => set("stats", content.stats.map((x, idx) => (idx === i ? { ...x, value: v } : x)))} />
                        <TextField label="Label" value={s.label} onChange={(v) => set("stats", content.stats.map((x, idx) => (idx === i ? { ...x, label: v } : x)))} />
                      </div>
                    </ArrayItemShell>
                  ))}
                  <AddButton onClick={() => set("stats", [...content.stats, { icon: "star", value: "0", label: "New Stat" }])} label="Add Stat" />
                </SectionCard>

                {/* SERVICES */}
                <SectionCard title="Services">
                  <TextField label="Section Tag" value={content.services.tag} onChange={(v) => patch("services", "tag", v)} />
                  <TextField label="Section Title" value={content.services.title} onChange={(v) => patch("services", "title", v)} />
                  <TextAreaField label="Section Description" value={content.services.description} onChange={(v) => patch("services", "description", v)} />
                  {content.services.items.map((it, i) => (
                    <ArrayItemShell
                      key={i}
                      title={`Service ${i + 1}`}
                      onRemove={() => patch("services", "items", content.services.items.filter((_, idx) => idx !== i))}
                    >
                      <IconSelectField label="Icon" value={it.icon} onChange={(v) => patch("services", "items", content.services.items.map((x, idx) => (idx === i ? { ...x, icon: v } : x)))} />
                      <TextField label="Title" value={it.title} onChange={(v) => patch("services", "items", content.services.items.map((x, idx) => (idx === i ? { ...x, title: v } : x)))} />
                      <TextAreaField label="Description" value={it.desc} onChange={(v) => patch("services", "items", content.services.items.map((x, idx) => (idx === i ? { ...x, desc: v } : x)))} />
                    </ArrayItemShell>
                  ))}
                  <AddButton
                    onClick={() => patch("services", "items", [...content.services.items, { icon: "code", title: "New Service", desc: "Description here." }])}
                    label="Add Service"
                  />
                </SectionCard>

                {/* PROJECTS */}
                <SectionCard title="Projects / Work">
                  <TextField label="Section Tag" value={content.projects.tag} onChange={(v) => patch("projects", "tag", v)} />
                  <TextField label="Section Title" value={content.projects.title} onChange={(v) => patch("projects", "title", v)} />
                  {content.projects.items.map((it, i) => (
                    <ArrayItemShell
                      key={i}
                      title={`Project ${i + 1}`}
                      onRemove={() => patch("projects", "items", content.projects.items.filter((_, idx) => idx !== i))}
                    >
                      <ImageField label="Image" value={it.image} onChange={(v) => patch("projects", "items", content.projects.items.map((x, idx) => (idx === i ? { ...x, image: v } : x)))} />
                      <TextField label="Title" value={it.title} onChange={(v) => patch("projects", "items", content.projects.items.map((x, idx) => (idx === i ? { ...x, title: v } : x)))} />
                      <TextField label="Tags / Tech" value={it.tags} onChange={(v) => patch("projects", "items", content.projects.items.map((x, idx) => (idx === i ? { ...x, tags: v } : x)))} />
                      <TextField label="Project URL (link)" value={it.link || ""} onChange={(v) => patch("projects", "items", content.projects.items.map((x, idx) => (idx === i ? { ...x, link: v } : x)))} />
                    </ArrayItemShell>
                  ))}
                  <AddButton
                    onClick={() => patch("projects", "items", [...content.projects.items, { image: "", title: "New Project", tags: "Tech, Stack", link: "#" }])}
                    label="Add Project"
                  />
                </SectionCard>

                {/* PROCESS */}
                <SectionCard title="Working Process">
                  <TextField label="Section Tag" value={content.process.tag} onChange={(v) => patch("process", "tag", v)} />
                  <TextField label="Section Title" value={content.process.title} onChange={(v) => patch("process", "title", v)} />
                  {content.process.steps.map((it, i) => (
                    <ArrayItemShell
                      key={i}
                      title={`Step ${i + 1}`}
                      onRemove={() => patch("process", "steps", content.process.steps.filter((_, idx) => idx !== i))}
                    >
                      <IconSelectField label="Icon" value={it.icon} onChange={(v) => patch("process", "steps", content.process.steps.map((x, idx) => (idx === i ? { ...x, icon: v } : x)))} />
                      <TextField label="Title" value={it.title} onChange={(v) => patch("process", "steps", content.process.steps.map((x, idx) => (idx === i ? { ...x, title: v } : x)))} />
                      <TextAreaField label="Description" value={it.desc} onChange={(v) => patch("process", "steps", content.process.steps.map((x, idx) => (idx === i ? { ...x, desc: v } : x)))} />
                    </ArrayItemShell>
                  ))}
                  <AddButton
                    onClick={() => patch("process", "steps", [...content.process.steps, { icon: "rocket", title: "New Step", desc: "Description here." }])}
                    label="Add Step"
                  />
                </SectionCard>

                {/* TESTIMONIALS */}
                <SectionCard title="Testimonials">
                  <TextField label="Section Tag" value={content.testimonials.tag} onChange={(v) => patch("testimonials", "tag", v)} />
                  <TextField label="Section Title" value={content.testimonials.title} onChange={(v) => patch("testimonials", "title", v)} />
                  {content.testimonials.items.map((it, i) => (
                    <ArrayItemShell
                      key={i}
                      title={`Testimonial ${i + 1}`}
                      onRemove={() => patch("testimonials", "items", content.testimonials.items.filter((_, idx) => idx !== i))}
                    >
                      <ImageField label="Avatar" value={it.image} onChange={(v) => patch("testimonials", "items", content.testimonials.items.map((x, idx) => (idx === i ? { ...x, image: v } : x)))} />
                      <div className="grid grid-cols-2 gap-3">
                        <TextField label="Name" value={it.name} onChange={(v) => patch("testimonials", "items", content.testimonials.items.map((x, idx) => (idx === i ? { ...x, name: v } : x)))} />
                        <TextField label="Role" value={it.role} onChange={(v) => patch("testimonials", "items", content.testimonials.items.map((x, idx) => (idx === i ? { ...x, role: v } : x)))} />
                      </div>
                      <TextAreaField label="Testimonial Text" value={it.text} onChange={(v) => patch("testimonials", "items", content.testimonials.items.map((x, idx) => (idx === i ? { ...x, text: v } : x)))} />
                      <RatingField label="Rating" value={it.rating} onChange={(v) => patch("testimonials", "items", content.testimonials.items.map((x, idx) => (idx === i ? { ...x, rating: v } : x)))} />
                    </ArrayItemShell>
                  ))}
                  <AddButton
                    onClick={() => patch("testimonials", "items", [...content.testimonials.items, { image: "", name: "New Client", role: "Role", text: "Great work!", rating: 5 }])}
                    label="Add Testimonial"
                  />
                </SectionCard>

                {/* TECH STACK */}
                <SectionCard title="Tech Stack">
                  <TextField label="Section Tag" value={content.techStack.tag} onChange={(v) => patch("techStack", "tag", v)} />
                  <TextField label="Section Title" value={content.techStack.title} onChange={(v) => patch("techStack", "title", v)} />
                  {content.techStack.items.map((it, i) => (
                    <ArrayItemShell
                      key={i}
                      title={`Tech ${i + 1}`}
                      onRemove={() => patch("techStack", "items", content.techStack.items.filter((_, idx) => idx !== i))}
                    >
                      <TextField label="Label" value={it.label} onChange={(v) => patch("techStack", "items", content.techStack.items.map((x, idx) => (idx === i ? { ...x, label: v } : x)))} />
                    </ArrayItemShell>
                  ))}
                  <AddButton
                    onClick={() => patch("techStack", "items", [...content.techStack.items, { label: "New Tech" }])}
                    label="Add Technology"
                  />
                </SectionCard>

                {/* CONTACT */}
                <SectionCard title="Contact Section">
                  <TextField label="Section Tag" value={content.contact.tag} onChange={(v) => patch("contact", "tag", v)} />
                  <TextField label="Section Title" value={content.contact.title} onChange={(v) => patch("contact", "title", v)} />
                  <TextAreaField label="Description" value={content.contact.description} onChange={(v) => patch("contact", "description", v)} />
                  <TextField label="Email" value={content.contact.email} onChange={(v) => patch("contact", "email", v)} />
                  <TextField label="Location" value={content.contact.location} onChange={(v) => patch("contact", "location", v)} />
                  <TextField
                    label="Project Types (comma separated)"
                    value={content.contact.projectTypes}
                    onChange={(v) => patch("contact", "projectTypes", v)}
                  />
                  {content.contact.socials.map((s, i) => (
                    <ArrayItemShell
                      key={i}
                      title={`Social ${i + 1}`}
                      onRemove={() => patch("contact", "socials", content.contact.socials.filter((_, idx) => idx !== i))}
                    >
                      <div>
                        <label className="mb-1 block text-xs font-semibold uppercase tracking-wide text-slate-500">Platform</label>
                        <select
                          value={s.icon}
                          onChange={(v) => patch("contact", "socials", content.contact.socials.map((x, idx) => (idx === i ? { ...x, icon: v.target.value } : x)))}
                          className="w-full rounded-lg border border-slate-200 bg-white px-3 py-2 text-sm outline-none focus:border-[#83B17F] focus:ring-2 focus:ring-[#83B17F]/30"
                        >
                          {socialIconOptions.map((opt) => (
                            <option key={opt} value={opt}>
                              {opt}
                            </option>
                          ))}
                        </select>
                      </div>
                      <TextField label="URL" value={s.href} onChange={(v) => patch("contact", "socials", content.contact.socials.map((x, idx) => (idx === i ? { ...x, href: v } : x)))} />
                    </ArrayItemShell>
                  ))}
                  <AddButton
                    onClick={() => patch("contact", "socials", [...content.contact.socials, { icon: "github", href: "#" }])}
                    label="Add Social Link"
                  />
                </SectionCard>

                {/* FOOTER */}
                <SectionCard title="Footer">
                  <TextField label="Footer Text" value={content.footer.text} onChange={(v) => patch("footer", "text", v)} />
                </SectionCard>

                <div className="h-4" />
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </>
  );
}

function AddButton({ onClick, label }) {
  return (
    <button
      type="button"
      onClick={onClick}
      className="flex w-full items-center justify-center gap-1.5 rounded-lg border border-dashed border-[#83B17F] py-2 text-xs font-bold text-[#5f8f5a] hover:bg-[#83B17F]/10"
    >
      <Plus className="h-3.5 w-3.5" /> {label}
    </button>
  );
}
