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
  const handleFile = (e) => {
    const file = e.target.files?.[0];
    if (!file) return;
    const reader = new FileReader();
    reader.onload = () => onChange(reader.result);
    reader.readAsDataURL(file);
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
            <Upload className="h-3.5 w-3.5" /> Upload Image
            <input type="file" accept="image/*" className="hidden" onChange={handleFile} />
          </label>
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

export function ArrayItemShell({ children, onRemove, title }) {
  return (
    <div className="relative space-y-3 rounded-lg border border-slate-200 bg-white p-3">
      <div className="flex items-center justify-between">
        <span className="text-xs font-bold text-slate-400">{title}</span>
        <button
          type="button"
          onClick={onRemove}
          className="flex h-7 w-7 items-center justify-center rounded-md text-red-400 hover:bg-red-50 hover:text-red-600"
          aria-label="Remove item"
        >
          <Trash2 className="h-3.5 w-3.5" />
        </button>
      </div>
      {children}
    </div>
  );
}
