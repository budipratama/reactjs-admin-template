import React, { useState, useEffect, useRef } from "react";

type Option = { label: string; value: string };

type SearchableSelectProps = {
  options?: Option[];
  value: string;
  onChange: (value: string) => void;
  placeholder?: string;
  label?: string;
  name?: string;
  searchMode?: "local" | "api";
  apiSearchUrl?: string;
};

// Komponen filter input terpisah
function FilterInput({
  inputRef,
  search,
  setSearch,
  setOpen,
  setHighlighted,
  setIsSearching,
  open,
  filtered,
  highlighted,
  onSelect,
}: any) {
  return (
    <div style={{ marginBottom: 8 }}>
      <input
        ref={inputRef}
        type='text'
        className='form__input'
        placeholder='Cari...'
        value={search}
        autoFocus
        onFocus={() => setOpen(true)}
        onChange={(e) => {
          setSearch(e.target.value);
          setOpen(true);
          setHighlighted(0);
        }}
        onBlur={() => {
          setIsSearching(false);
          setSearch("");
        }}
        onKeyDown={(e) => {
          if (!open) setOpen(true);
          if (e.key === "ArrowDown") {
            setHighlighted((h: number) => Math.min(h + 1, filtered.length - 1));
            e.preventDefault();
          } else if (e.key === "ArrowUp") {
            setHighlighted((h: number) => Math.max(h - 1, 0));
            e.preventDefault();
          } else if (
            e.key === "Enter" &&
            open &&
            highlighted >= 0 &&
            filtered[highlighted]
          ) {
            onSelect(filtered[highlighted].value);
            e.preventDefault();
          } else if (e.key === "Escape") {
            setOpen(false);
            setIsSearching(false);
            setSearch("");
          }
        }}
        autoComplete='off'
      />
    </div>
  );
}

const SearchableSelect: React.FC<SearchableSelectProps> = ({
  options = [],
  value,
  onChange,
  placeholder = "Select...",
  label,
  name,
  searchMode = "local",
  apiSearchUrl,
}) => {
  const [search, setSearch] = useState("");
  const [open, setOpen] = useState(false);
  const [highlighted, setHighlighted] = useState<number>(-1);
  const [isSearching, setIsSearching] = useState(false);
  const [apiOptions, setApiOptions] = useState<Option[]>([]);
  const [loading, setLoading] = useState(false);
  const [selectedOption, setSelectedOption] = useState<Option | undefined>(
    undefined
  );
  const [dropdownAbove, setDropdownAbove] = useState(false);
  const inputRef = useRef<HTMLInputElement>(null);

  // Fetch API jika searchMode === 'api' dan search tidak kosong
  useEffect(() => {
    if (searchMode === "api" && search.length > 1 && apiSearchUrl) {
      setLoading(true);
      fetch(`${apiSearchUrl}${encodeURIComponent(search)}`)
        .then((res) => res.json())
        .then((data) => {
          // Untuk restcountries, ambil nama negara
          if (Array.isArray(data)) {
            setApiOptions(
              data.map((item: any) => ({
                label: item.name?.common || item.name || "",
                value:
                  item.cca2 ||
                  item.cca3 ||
                  item.name?.common ||
                  item.name ||
                  "",
              }))
            );
          } else {
            setApiOptions([]);
          }
        })
        .catch(() => setApiOptions([]))
        .finally(() => setLoading(false));
    } else {
      setApiOptions([]);
    }
  }, [search, searchMode, apiSearchUrl]);

  const filtered =
    searchMode === "api"
      ? apiOptions
      : options.filter((opt) =>
          opt.label.toLowerCase().includes(search.toLowerCase())
        );

  // Reset search input setiap kali value berubah
  useEffect(() => {
    console.log("Value changed, resetting search input", value);
    setSearch("");
  }, [value]);

  // Update selectedOption setiap kali value berubah
  useEffect(() => {
    if (!value) {
      setSelectedOption(undefined);
      return;
    }
    // Cari di apiOptions (jika ada), lalu di options
    let found: Option | undefined;
    if (searchMode === "api") {
      found =
        apiOptions.find((o) => o.value === value) ||
        options.find((o) => o.value === value);
    } else {
      found = options.find((o) => o.value === value);
    }
    if (found && found.value !== selectedOption?.value) {
      setSelectedOption(found);
    }
  }, [value, apiOptions, options, searchMode]);

  // Close dropdown on click outside
  useEffect(() => {
    function handleClick(e: MouseEvent) {
      if (inputRef.current && !inputRef.current.contains(e.target as Node)) {
        setOpen(false);
      }
    }
    if (open) document.addEventListener("mousedown", handleClick);
    return () => document.removeEventListener("mousedown", handleClick);
  }, [open]);

  // Cek posisi dropdown saat open/isSearching berubah
  useEffect(() => {
    if (open && isSearching && inputRef.current) {
      const rect = inputRef.current.getBoundingClientRect();
      const dropdownHeight = 180; // sama dengan maxHeight dropdown
      const spaceBelow = window.innerHeight - rect.bottom;
      const spaceAbove = rect.top;
      if (spaceBelow < dropdownHeight && spaceAbove > dropdownHeight) {
        setDropdownAbove(true);
      } else {
        setDropdownAbove(false);
      }
    }
  }, [open, isSearching]);

  return (
    <div className='form__group' style={{ position: "relative" }}>
      {label && <label className='form__label'>{label}</label>}
      {/* Layout 1: Value terpilih atau placeholder, selalu tampil */}
      <button
        type='button'
        className={`form__input form__input--selected${
          !value ? " form__input--placeholder" : ""
        }`}
        style={{
          marginBottom: 8,
          cursor: "pointer",
          textAlign: "left",
          color: !value ? "#888" : undefined,
        }}
        tabIndex={0}
        onClick={() => {
          setIsSearching(true);
          setOpen(true);
          setSearch("");
        }}
        onKeyDown={(e) => {
          if (e.key === "Enter" || e.key === " ") {
            setIsSearching(true);
            setOpen(true);
            setSearch("");
          }
        }}>
        {value
          ? selectedOption?.label || placeholder || "Pilih..."
          : placeholder || "Pilih..."}
      </button>
      {/* Layout 2 & 3: Filter input dan List pilihan, tampil bersama di dropdown */}
      {open && isSearching && (
        <ul
          className='form__dropdown-list'
          style={{
            position: "absolute",
            zIndex: 10,
            background: "#fff",
            border: "1px solid #d1d5db",
            width: "100%",
            maxHeight: 220, // lebih tinggi agar muat input + list
            overflowY: "auto",
            margin: 0,
            padding: 0,
            listStyle: "none",
            top: dropdownAbove ? undefined : "100%",
            bottom: dropdownAbove ? "100%" : undefined,
            display: "flex",
            flexDirection: "column", // Selalu column, filter di atas hasil
          }}>
          <li
            style={{
              padding: 8,
              borderBottom: "1px solid #eee",
            }}>
            <FilterInput
              inputRef={inputRef}
              search={search}
              setSearch={setSearch}
              setOpen={setOpen}
              setHighlighted={setHighlighted}
              setIsSearching={setIsSearching}
              open={open}
              filtered={filtered}
              highlighted={highlighted}
              onSelect={(val: string) => {
                onChange(val);
                setOpen(false);
                setIsSearching(false);
                setSearch("");
              }}
            />
          </li>
          {filtered.length === 0 && (
            <li
              className='form__dropdown-item'
              style={{ padding: 8, color: "#888" }}>
              Tidak ada pilihan
            </li>
          )}
          {filtered.map((opt, i) => (
            <li
              key={opt.value}
              className='form__dropdown-item'
              style={{
                padding: 8,
                cursor: "pointer",
                background:
                  value === opt.value
                    ? "#f0f4ff"
                    : highlighted === i
                      ? "#e6eaff"
                      : "#fff",
              }}
              onMouseDown={(e) => {
                e.preventDefault();
                onChange(opt.value);
                setSelectedOption(opt); // Simpan label/value yang dipilih
                setOpen(false);
                setIsSearching(false);
                setSearch("");
              }}
              onMouseEnter={() => setHighlighted(i)}>
              {opt.label}
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default SearchableSelect;
