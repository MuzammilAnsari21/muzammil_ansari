import { useState } from "react";
import { Upload, Trash2 } from "../utils/icons.jsx";
import { iconOptions } from "../utils/icons.jsx";

export function Label({ children }) {
  return <label className="mb-1 block text-xs font-semibold uppercase tracking-wide text-slate-500">{children}</label>;
}

export function TextField({ label, value, onChange, placeholder }) {
  return (
    <div>
      {label && <Label>{label}</Label>}
      <input
        type="text"
        value={value ?? ""}
        placeholder={placeholder}
        onChange={(e) => onChange(e.target.value)}
        className="w-full rounded-lg border border-slate-200 bg-white px-3 py-2 text-sm outline-none focus:border-[#83B17F] focus:ring-2 focus:ring-[#83B17F]/30"
      />
    </div>
  );
}

export function TextAreaField({ label, value, onChange, rows = 3, placeholder }) {
  return (
    <div>
      {label && <Label>{label}</Label>}
      <textarea
        value={value ?? ""}
        rows={rows}
        placeholder={placeholder}
        onChange={(e) => onChange(e.target.value)}
        className="w-full resize-none rounded-lg border border-slate-200 bg-white px-3 py-2 text-sm outline-none focus:border-[#83B17F] focus:ring-2 focus:ring-[#83B17F]/30"
      />
    </div>
  );
}

export function IconSelectField({ label, value, onChange }) {
  return (
    <div>
      {label && <Label>{label}</Label>}
      <select
        value={value}
        onChange={(e) => onChange(e.target.value)}
        className="w-full rounded-lg border border-slate-200 bg-white px-3 py-2 text-sm outline-none focus:border-[#83B17F] focus:ring-2 focus:ring-[#83B17F]/30"
      >
        {iconOptions.map((opt) => (
          <option key={opt} value={opt}>
            {opt}
          </option>
        ))}
      </select>
    </div>
  );
}

export function RatingField({ label, value, onChange }) {
  return (
    <div>
      {label && <Label>{label}</Label>}
      <select
        value={value}
        onChange={(e) => onChange(Number(e.target.value))}
        className="w-full rounded-lg border border-slate-200 bg-white px-3 py-2 text-sm outline-none focus:border-[#83B17F] focus:ring-2 focus:ring-[#83B17F]/30"
      >
        {[1, 2, 3, 4, 5].map((n) => (
          <option key={n} value={n}>
            {n} Star{n > 1 ? "s" : ""}
          </option>
        ))}
      </select>
    </div>
  );
}

export function ImageField({ label, value, onChange }) {
  const [uploading, setUploading] = useState(false);
  const [error, setError] = useState("");

  const handleFile = async (e) => {
    const file = e.target.files?.[0];
    if (!file) return;
    setError("");
    setUploading(true);
    try {
      // File ko sirf network transfer ke liye base64 mein convert karte hain.
      // Ye kabhi bhi content.json/DB ke content column mein save NAHI hoga —
      // upload-image function isko images table (BLOB) mein daalta hai aur
      // sirf ek chota /api/image/<id> URL wapis milta hai.
      const dataUrl = await new Promise((resolve, reject) => {
        const reader = new FileReader();
        reader.onload = () => resolve(reader.result);
        reader.onerror = reject;
        reader.readAsDataURL(file);
      });
      const base64Only = dataUrl.split(",")[1];

      const res = await fetch("/api/upload-image", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          filename: file.name,
          dataBase64: base64Only,
          contentType: file.type,
        }),
      });

      if (!res.ok) {
        const errData = await res.json().catch(() => ({}));
        throw new Error(errData.error || `Upload failed (${res.status})`);
      }

      const data = await res.json();
      onChange(data.url); // sirf chota URL save hota hai (jaise /api/image/12)
    } catch (err) {
      setError(err.message || "Upload failed");
    } finally {
      setUploading(false);
      e.target.value = "";
    }
  };

  return (
    <div>
      {label && <Label>{label}</Label>}
      <div className="flex items-center gap-3">
        {value && (
          <img src={value} alt="preview" className="h-14 w-14 rounded-lg border border-slate-200 object-cover" />
        )}
        <div className="flex-1 space-y-2">
          <input
            type="text"
            value={value ?? ""}
            placeholder="Image URL"
            onChange={(e) => onChange(e.target.value)}
            className="w-full rounded-lg border border-slate-200 bg-white px-3 py-2 text-xs outline-none focus:border-[#83B17F] focus:ring-2 focus:ring-[#83B17F]/30"
          />
          <label className="flex w-full cursor-pointer items-center justify-center gap-2 rounded-lg border border-dashed border-slate-300 py-1.5 text-xs font-medium text-slate-500 hover:border-[#83B17F] hover:text-[#5f8f5a]">
            <Upload className="h-3.5 w-3.5" /> {uploading ? "Uploading..." : "Upload Image"}
            <input type="file" accept="image/*" className="hidden" onChange={handleFile} disabled={uploading} />
          </label>
          {error && <p className="text-[11px] text-red-500">{error}</p>}
        </div>
      </div>
    </div>
  );
}

export function SectionCard({ title, children, defaultOpen = false }) {
  return (
    <details open={defaultOpen} className="group rounded-xl border border-slate-200 bg-slate-50/60">
      <summary className="flex cursor-pointer list-none items-center justify-between px-4 py-3 text-sm font-bold text-slate-800">
        {title}
        <span className="text-slate-400 transition-transform group-open:rotate-90">›</span>
      </summary>
      <div className="space-y-4 border-t border-slate-200 p-4">{children}</div>
    </details>
  );
}
