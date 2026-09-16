import { useState } from "react";
import { X } from "lucide-react";

export default function TagInput({ tags, onChange, placeholder = "Tambah kata kunci..." }) {
  const [value, setValue] = useState("");

  function addTag() {
    const v = value.trim();
    if (v && !tags.includes(v)) onChange([...tags, v]);
    setValue("");
  }

  function handleKeyDown(e) {
    if (e.key === "Enter" || e.key === ",") {
      e.preventDefault();
      addTag();
    } else if (e.key === "Backspace" && !value && tags.length) {
      onChange(tags.slice(0, -1));
    }
  }

  return (
    <div className="flex flex-wrap items-center gap-1.5 rounded-md border border-slate-300 bg-white px-2 py-1.5 focus-within:ring-2 focus-within:ring-brand-400">
      {tags.map((tag) => (
        <span
          key={tag}
          className="flex items-center gap-1 rounded bg-slate-200 px-2 py-1 text-xs text-slate-600"
        >
          {tag}
          <button
            type="button"
            onClick={() => onChange(tags.filter((t) => t !== tag))}
            className="text-slate-400 hover:text-slate-600"
            aria-label={`Hapus ${tag}`}
          >
            <X size={10} />
          </button>
        </span>
      ))}
      <input
        type="text"
        value={value}
        onChange={(e) => setValue(e.target.value)}
        onKeyDown={handleKeyDown}
        onBlur={addTag}
        placeholder={placeholder}
        className="flex-1 min-w-[140px] border-none bg-transparent py-1 text-xs text-slate-600 placeholder:text-slate-400 focus:outline-none"
      />
    </div>
  );
}
