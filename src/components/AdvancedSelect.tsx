import { JSX, use, useEffect, useRef, useState } from "react";
import "../styles/components/_select.scss";
type Option = { label: string; value: string };

interface AdvancedSelectProps {
  name: string;
  required?: boolean;
  containerClassName?: string;
  label: string;
  errorMessage: string;
  onChange: (value: string) => void;
  value?: string;
  placeholder?: string;
  minSearchLength?: number;
  optionMapper: (item: any) => Option;
  rawOptions: any[];
  onSearch: (search: string) => void;
}
const AdvancedSelect = ({
  name,
  label,
  onChange,
  minSearchLength = 1,
  placeholder,
  required = false,
  value = "",
  containerClassName = "form__group",
  errorMessage = "",
  optionMapper,
  onSearch,
  rawOptions,
}: AdvancedSelectProps): JSX.Element => {
  const defaultPlaceholder = `Choose ${name}`;
  const [search, setSearch] = useState<string>("");
  const [openFilter, setOpenFilter] = useState<boolean>(false);
  const [highlighted, setHighlighted] = useState<number>(-1);
  const [apiOptions, setApiOptions] = useState<Option[]>([]);
  const [dropdownFilterPosition, setDropdownFilterPosition] =
    useState<boolean>(false);
  const [selectedOption, setSelectedOption] = useState<Option | undefined>(
    undefined
  );
  const selectRef = useRef<HTMLDivElement>(null);
  const filteredOptions = apiOptions;
  const handleOpenFilter = () => setOpenFilter((prev) => !prev);

  useEffect(() => {
    if (!optionMapper && !rawOptions) {
      console.error(
        "[AdvancedSelect] optionMapper is required. Please provide a function to map options."
      );
      return;
    }
    // Map options using the provided optionMapper
    const mappedOptions = rawOptions.map(optionMapper);
    setApiOptions(mappedOptions);
  }, [rawOptions, optionMapper]);
  useEffect(() => {
    const el = selectRef.current;
    if (!el) return;
    const handleClick = (event: MouseEvent) => {
      const target = event.target as HTMLElement;
      // Only handle if the event is inside this AdvancedSelect
      if (!selectRef.current?.contains(target)) return;
      if (target.classList.contains("select__clear")) {
        onChange("");
        setSelectedOption(undefined);
      } else if (target.closest(".select__input")) {
        handleOpenFilter();
        setOpenFilter(true);
        console.log("[AdvancedSelect] Open filter");
      }
    };
    selectRef?.current?.addEventListener("click", handleClick);
    return () => {
      selectRef?.current?.removeEventListener("click", handleClick);
    };
  }, []);

  useEffect(() => {
    console.log(
      `[AdvancedSelect] value changed: ${value}, selectedOption: `,
      selectedOption
    );
    if (!value) {
      setSelectedOption(undefined);
      return;
    }
    const foundOption = apiOptions.find((opt) => opt.value === value);
    if (foundOption) {
      setSelectedOption(foundOption);
    } else {
      setSelectedOption(undefined);
    }
  }, [value]);

  useEffect(() => {
    if (search.length >= minSearchLength) {
      const handler = setTimeout(() => {
        onSearch(search);
      }, 400); // 400ms debounce
      return () => clearTimeout(handler);
    } else {
      onSearch(""); // Clear search if below min length
      setSearch(""); // Reset search input
    }
  }, [search, onSearch]);
  useEffect(() => {
    console.log(
      `[AdvancedSelect] openFilter: `,
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
        `[AdvancedSelect] findInput : `,
        selectRef.current?.nextElementSibling
      );
      selectRef.current?.nextElementSibling?.querySelector("input")?.focus();
    }

    const handleClickOutside = (event: MouseEvent) => {
      const target = event.target as HTMLElement;
      console.log(
        `[AdvancedSelect] Click outside: `,
        selectRef.current?.nextElementSibling?.querySelector("input"),
        target.nextElementSibling,
        !selectRef.current?.contains(target)
      );
      if (
        !selectRef.current?.contains(target) &&
        target !== selectRef.current?.nextElementSibling?.querySelector("input")
      ) {
        setOpenFilter(false);
        setSearch("");
      }
    };

    document.addEventListener("click", handleClickOutside);
    return () => {
      document.removeEventListener("click", handleClickOutside);
    };
  }, [openFilter]);
  console.log(
    `[AdvancedSelect] Search: ${search.length} characters. Min length: ${minSearchLength}`
  );
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
        <span>
          {value
            ? (selectedOption?.label ?? placeholder ?? defaultPlaceholder)
            : (placeholder ?? defaultPlaceholder)}
        </span>
        {value && <span className='select__clear'>X</span>}
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
              setOpenFilter(false);
              setSelectedOption(filteredOptions[highlighted]);
              onChange(filteredOptions[highlighted].value);
              setSearch("");
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
          {search.length < minSearchLength ? (
            <li className='form__dropdown-item--search-hint'>
              Type at least {minSearchLength} character
              {minSearchLength > 1 ? "s" : ""} to search
            </li>
          ) : (
            filteredOptions.map((opt, i) => {
              let backgroundColor = "#fff";
              if (value === opt.value) {
                backgroundColor = "#f0f4ff";
              } else if (highlighted === i) {
                backgroundColor = "#e6eaff";
              }
              return (
                <li
                  key={opt.value}
                  style={{
                    backgroundColor,
                  }}>
                  <button
                    onMouseDown={() => {
                      onChange(opt.value);
                      setSelectedOption(opt);
                      setOpenFilter(false);
                      setSearch("");
                    }}
                    onMouseEnter={() => setHighlighted(i)}>
                    {opt.label}
                  </button>
                </li>
              );
            })
          )}
        </ul>
      </div>
    </div>
  );
};
export default AdvancedSelect;
