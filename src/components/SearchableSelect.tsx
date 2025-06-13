import React, { useState, useEffect, useRef } from "react";

type Option = { label: string; value: string };

type SearchableSelectProps = {
  options?: Option[];
  value: string;
  onChange: (value: string) => void;
  placeholder?: string;
  label?: string;
  searchMode?: "local" | "api";
  rawOptions?: any[];
  optionMapper?: (item: any) => Option;
  onSearch?: (search: string) => void;
  minSearchLength?: number;
  errorMessage?: string;
  required?: boolean;
  onBlur?: () => void; // trigger blur ke parent
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
  searchMode = "local",
  rawOptions,
  optionMapper,
  onSearch,
  minSearchLength = 0,
  errorMessage,
  onBlur,
  required = false,
}) => {
  // Validasi props sesuai searchMode
  let validationError: string | null = null;
  if (searchMode === "api") {
    if (!onSearch || !rawOptions || !optionMapper) {
      validationError =
        'SearchableSelect: For searchMode="api", you must provide the props onSearch, rawOptions, and optionMapper.';
    }
  }
  if (searchMode !== "api" && (onSearch || rawOptions)) {
    validationError =
      'SearchableSelect: For searchMode other than "api", do not provide onSearch or rawOptions.';
  }
  if (validationError) {
    // Show error in UI (English), no stack trace, just message and props
    return (
      <div
        style={{
          color: "red",
          fontWeight: "bold",
          whiteSpace: "pre-wrap",
          background: "#fff0f0",
          padding: 12,
          border: "1px solid #f99",
          borderRadius: 4,
        }}>
        <div>{validationError}</div>
        <div style={{ fontSize: 12, marginTop: 8, color: "#a00" }}>
          <b>Props passed:</b>
          <br />
          <code style={{ fontSize: 11, color: "#a00" }}>
            {JSON.stringify(
              {
                value,
                searchMode,
                rawOptions:
                  typeof rawOptions === "undefined" ? "undefined" : "provided",
                optionMapper:
                  typeof optionMapper === "function"
                    ? "function"
                    : String(optionMapper),
                onSearch:
                  typeof onSearch === "function"
                    ? "function"
                    : String(onSearch),
              },
              null,
              2
            )}
          </code>
        </div>
      </div>
    );
  }

  const [search, setSearch] = useState("");
  const [open, setOpen] = useState(false);
  const [highlighted, setHighlighted] = useState<number>(-1);
  const [isSearching, setIsSearching] = useState(false);
  const [apiOptions, setApiOptions] = useState<Option[]>([]);
  const [selectedOption, setSelectedOption] = useState<Option | undefined>(
    undefined
  );
  const [dropdownAbove, setDropdownAbove] = useState(false);
  const inputRef = useRef<HTMLInputElement>(null);

  // Gunakan rawOptions + optionMapper jika ada, override apiOptions
  useEffect(() => {
    if (rawOptions && optionMapper) {
      setApiOptions(rawOptions.map(optionMapper));
    }
  }, [rawOptions, optionMapper]);

  // Fetch API jika searchMode === 'api' dan search tidak kosong
  useEffect(() => {
    if (searchMode === "api" && !rawOptions && search.length > 1) {
      // Tidak fetch apapun, biarkan parent yang handle
    } else if (!rawOptions) {
      setApiOptions([]);
    }
  }, [search, searchMode, rawOptions, optionMapper]);

  // Trigger onSearch setiap kali search berubah (khusus mode api)
  useEffect(() => {
    if (searchMode === "api" && onSearch) {
      // Debounce onSearch agar tidak looping dan tidak terlalu sering request
      console.log(
        `Search changed, triggering onSearch: ${search.length} >= ${minSearchLength}`
      );
      if (search.length >= minSearchLength) {
        const handler = setTimeout(() => {
          onSearch(search);
        }, 400); // 400ms debounce
        return () => clearTimeout(handler);
      } else {
        // Jika search kurang dari minSearchLength, kosongkan hasil
        onSearch("");
      }
    }
  }, [search, searchMode, onSearch, minSearchLength]);

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
    <div
      role='button'
      className='form__group'
      style={{ position: "relative" }}
      tabIndex={0}
      onBlur={(e) => {
        if (!e.currentTarget.contains(e.relatedTarget)) {
          if (typeof onBlur === "function") onBlur();
          setOpen(false);
          setIsSearching(false);
        }
      }}>
      {label && (
        <label className='form__label'>
          {label} {required && <span className='form__required'> *</span>}
        </label>
      )}
      <div style={{ position: "relative" }}>
        <button
          type='button'
          className={`form__input form__input--selected${
            !value ? " form__input--placeholder" : ""
          }${errorMessage ? " form__input--error" : ""}`}
          style={{
            marginBottom: 8,
            cursor: "pointer",
            textAlign: "left",
            color: !value ? "#888" : undefined,
            borderColor: errorMessage ? "#f99" : undefined,
            paddingRight: value ? 32 : undefined, // beri ruang untuk icon X
          }}
          tabIndex={-1}
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
        {/* Icon X untuk clear value */}
        {value && (
          <button
            className='form__input-clear'
            onClick={(e) => {
              e.stopPropagation();
              onChange("");
              setSelectedOption(undefined);
            }}
            title='Clear selection'
            aria-label='Clear selection'
            type='button'>
            ×
          </button>
        )}
      </div>
      {/* Layout 2 & 3: Filter input dan List pilihan, tampil bersama di dropdown */}
      {open && isSearching && (
        <ul
          className='form__dropdown-list'
          style={{
            top: dropdownAbove ? undefined : "100%",
            bottom: dropdownAbove ? "100%" : undefined,
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
          {search.length < minSearchLength ? (
            <li className='form__dropdown-item--search-hint'>
              Type at least {minSearchLength} character
              {minSearchLength > 1 ? "s" : ""} to search
            </li>
          ) : filtered.length === 0 ? (
            <li className='form__dropdown-item--empty'>No options</li>
          ) : (
            filtered.map((opt, i) => (
              <li
                key={opt.value}
                className='form__dropdown-item'
                style={{
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
            ))
          )}
        </ul>
      )}
      {errorMessage && <div className='form__error'>{errorMessage}</div>}
    </div>
  );
};

export default SearchableSelect;
