import { JSX, useEffect, useRef, useState } from "react";
import "../styles/components/_select.scss";
type Option = { label: string; value: string };

interface BasicSelectProps {
  name: string;
  required?: boolean;
  containerClassName?: string;
  label: string;
  errorMessage: string;
  options: Option[];
  onChange: (value: string | string[]) => void;
  value?: string | string[];
  placeholder?: string;
  multiple?: boolean;
  disabled?: boolean;
}
const BasicSelect = ({
  name,
  label,
  onChange,
  placeholder,
  required = false,
  value = "",
  containerClassName = "form__group",
  errorMessage = "",

  options = [],
  multiple = false,
  disabled = false,
}: BasicSelectProps): JSX.Element => {
  const defaultPlaceholder = `Choose ${name}`;
  const [search, setSearch] = useState<string>("");
  const [openFilter, setOpenFilter] = useState<boolean>(false);
  const [highlighted, setHighlighted] = useState<number>(-1);
  const [dropdownFilterPosition, setDropdownFilterPosition] =
    useState<boolean>(false);
  const [selectedOption, setSelectedOption] = useState<Option | undefined>(
    undefined
  );
  const selectRef = useRef<HTMLDivElement>(null);
  const filteredOptions = options.filter((opt) =>
    opt.label.toLowerCase().includes(search.toLowerCase())
  );
  const handleOpenFilter = () => setOpenFilter((prev) => !prev);

  useEffect(() => {
    const el = selectRef.current;
    if (!el) return;
    const handleClick = (event: MouseEvent) => {
      const target = event.target as HTMLElement;
      // Only handle if the event is inside this BasicSelect
      if (!selectRef.current?.contains(target)) return;
      if (target.classList.contains("select__clear")) {
        onChange("");
        setSelectedOption(undefined);
      } else if (target.closest(".select__input")) {
        handleOpenFilter();
        setOpenFilter(true);
        console.log("[BasicSelect] Open filter");
      }
    };
    selectRef?.current?.addEventListener("click", handleClick);
    return () => {
      selectRef?.current?.removeEventListener("click", handleClick);
    };
  }, []);

  useEffect(() => {
    if (!value) {
      setSelectedOption(undefined);
      return;
    }
    const foundOption = options.find((opt) => opt.value === value);
    if (foundOption) {
      setSelectedOption(foundOption);
    } else {
      setSelectedOption(undefined);
    }
  }, [value]);

  useEffect(() => {
    console.log(
      `[BasicSelect] openFilter: `,
      selectRef,
      "openFilter:",
      openFilter
    );

    if (openFilter) {
      const rect = selectRef.current?.getBoundingClientRect();
      const dropdownHeight = 180; // sama dengan maxHeight dropdown
      if (rect) {
        const spaceBelow = window.innerHeight - rect.bottom;
        const spaceAbove = rect.top;
        if (spaceBelow < dropdownHeight && spaceAbove > dropdownHeight) {
          setDropdownFilterPosition(true);
        } else {
          setDropdownFilterPosition(false);
        }
      }
      console.log(
        `[BasicSelect] findInput : `,
        selectRef.current?.nextElementSibling
      );
      selectRef.current?.nextElementSibling?.querySelector("input")?.focus();
    }

    const handleClickOutside = (event: MouseEvent) => {
      const target = event.target as HTMLElement;
      // Only close if click is outside this BasicSelect
      if (
        !selectRef.current?.contains(target) &&
        target !== selectRef.current?.nextElementSibling?.querySelector("input")
      ) {
        setOpenFilter(false);
      }
    };

    document.addEventListener("click", handleClickOutside);
    return () => {
      document.removeEventListener("click", handleClickOutside);
    };
  }, [openFilter]);

  // Helper for selected values
  const isSelected = (val: string) => {
    if (multiple && Array.isArray(value)) return value.includes(val);
    return value === val;
  };

  // Render selected labels for multiple
  const renderSelectedLabels = () => {
    if (!multiple)
      return selectedOption?.label ?? placeholder ?? defaultPlaceholder;
    if (Array.isArray(value) && value.length > 0) {
      return (
        <span style={{ display: "flex", gap: 4, flexWrap: "wrap" }}>
          {value.map((val) => {
            const opt = options.find((o) => o.value === val);
            return (
              <span
                key={val}
                style={{
                  background: "#e6eaff",
                  borderRadius: 4,
                  padding: "0 6px",
                  marginRight: 2,
                }}>
                {opt?.label ?? val}
                <span style={{ marginLeft: 4, cursor: "pointer" }}>
                  <button
                    style={{ fontSize: "0.8rem" }}
                    onClick={(e) => {
                      e.stopPropagation();
                      const newVals = value.filter((v: string) => v !== val);
                      onChange(newVals);
                    }}>
                    x
                  </button>
                </span>
              </span>
            );
          })}
        </span>
      );
    }
    return placeholder ?? defaultPlaceholder;
  };

  // Prevent interaction if disabled
  if (disabled) {
    console.log("[BasicSelect] Disabled, rendering static view", disabled);
    return (
      <div
        className={containerClassName}
        style={{
          position: "relative",
          opacity: 0.6,
        }}>
        <label className='form__label'>
          {label}
          {required && <span className='form__required'> *</span>}
        </label>
        <div
          className={
            errorMessage
              ? "select__error select__input"
              : "select__input select__disabled"
          }>
          <span>
            {(() => {
              if (multiple && Array.isArray(value)) {
                if (value.length > 0) {
                  return value.map((val) => {
                    const opt = options.find((o) => o.value === val);
                    return (
                      <span
                        key={val}
                        style={{
                          background: "#e6eaff",
                          borderRadius: 4,
                          padding: "0 6px",
                          marginRight: 2,
                        }}>
                        {opt?.label ?? val}
                      </span>
                    );
                  });
                } else {
                  return placeholder ?? `Choose ${name}`;
                }
              } else if (typeof value === "string" && value) {
                return options.find((o) => o.value === value)?.label ?? value;
              } else {
                return placeholder ?? `Choose ${name}`;
              }
            })()}
          </span>
        </div>
        {errorMessage && <div className='form__error'>{errorMessage}</div>}
      </div>
    );
  }

  return (
    <div className={containerClassName} style={{ position: "relative" }}>
      <label className='form__label'>
        {label}
        {required && <span className='form__required'> *</span>}
      </label>
      <div
        className={
          errorMessage ? "select__error select__input" : " select__input"
        }
        ref={selectRef}>
        <span>{renderSelectedLabels()}</span>
        {(multiple ? Array.isArray(value) && value.length > 0 : value) && (
          <button
            className='select__clear'
            onClick={(e) => {
              e.stopPropagation();
              onChange(multiple ? [] : "");
              setSelectedOption(undefined);
            }}>
            X
          </button>
        )}
      </div>
      {errorMessage && <div className='form__error'>{errorMessage}</div>}

      <div
        className='select__search-container'
        style={{
          opacity: openFilter ? 1 : 0,
          visibility: openFilter ? "visible" : "hidden",
        }}>
        <input
          type='text'
          placeholder='Cari...'
          className='select__search'
          style={{ width: "100%", marginBottom: "0.5rem" }}
          autoFocus
          autoComplete='off'
          value={search}
          onChange={(e) => {
            setHighlighted(0);
            setSearch(e.currentTarget.value);
          }}
          onKeyDown={(e) => {
            if (e.key === "ArrowDown") {
              setHighlighted((h: number) =>
                Math.min(h + 1, filteredOptions.length - 1)
              );
              e.preventDefault();
            } else if (e.key === "ArrowUp") {
              setHighlighted((h: number) => Math.max(h - 1, 0));
              e.preventDefault();
            } else if (
              e.key === "Enter" &&
              openFilter &&
              highlighted >= 0 &&
              filteredOptions[highlighted]
            ) {
              if (multiple) {
                let newVals = Array.isArray(value) ? [...value] : [];
                const val = filteredOptions[highlighted].value;
                if (newVals.includes(val)) {
                  newVals = newVals.filter((v) => v !== val);
                } else {
                  newVals.push(val);
                }
                onChange(newVals);
                // Jangan tutup dropdown pada multiple
              } else {
                setOpenFilter(false);
                setSelectedOption(filteredOptions[highlighted]);
                onChange(filteredOptions[highlighted].value);
                setSearch("");
              }
            } else if (e.key === "Escape") {
              setOpenFilter(false);
              setSearch("");
            }
          }}
        />
        <hr />
        <ul
          style={{
            top: dropdownFilterPosition ? undefined : "100%",
            bottom: dropdownFilterPosition ? "100%" : undefined,
          }}>
          {filteredOptions.map((opt, i) => {
            let backgroundColor = "#fff";
            if (isSelected(opt.value)) {
              backgroundColor = "#f0f4ff";
            } else if (highlighted === i) {
              backgroundColor = "#e6eaff";
            }
            return (
              <li
                key={opt.value}
                style={{
                  backgroundColor: backgroundColor,
                }}>
                <button
                  style={{
                    width: "100%",
                    textAlign: "left",
                  }}
                  onMouseDown={() => {
                    if (multiple) {
                      let newVals = Array.isArray(value) ? [...value] : [];
                      if (newVals.includes(opt.value)) {
                        newVals = newVals.filter((v) => v !== opt.value);
                      } else {
                        newVals.push(opt.value);
                      }
                      onChange(newVals);
                    } else {
                      onChange(opt.value);
                      setSelectedOption(opt);
                      setOpenFilter(false);
                      setSearch("");
                    }
                  }}
                  onMouseEnter={() => setHighlighted(i)}>
                  {opt.label}
                  {multiple &&
                    Array.isArray(value) &&
                    value.includes(opt.value) && (
                      <span style={{ marginLeft: 6, color: "#888" }}>✔</span>
                    )}
                </button>
              </li>
            );
          })}
        </ul>
      </div>
    </div>
  );
};
export default BasicSelect;
