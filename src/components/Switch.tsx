import React from "react";
import "../styles/components/_form.scss";

type SwitchProps = {
  checked: boolean;
  onChange: (checked: boolean) => void;
  labelOn?: string;
  labelOff?: string;
  disabled?: boolean;
  name?: string;
  id?: string;
  className?: string;
  containerClassName?: string;
};

const Switch: React.FC<SwitchProps> = ({
  checked,
  onChange,
  labelOn = "On",
  labelOff = "Off",
  disabled = false,
  name,
  id,
  className = "",
  containerClassName = "form__group",
}) => {
  return (
    <div className={containerClassName}>
      <label className='form__label'>Bko</label>
      <label
        role='button'
        tabIndex={0}
        className={`switch ${className}`.trim()}
        style={{
          display: "block",
          //   width: "100%",
          alignItems: "center",
          gap: 8,
          cursor: disabled ? "not-allowed" : "pointer",
          position: "relative",
          userSelect: "none",
        }}
        onMouseUp={() => {
          if (!disabled) {
            onChange(!checked);
          }
        }}>
        <span style={{ fontSize: 14, color: checked ? "#007bff" : "#888" }}>
          {checked ? labelOn : labelOff}
        </span>
        <span
          className='switch-slider'
          aria-checked={checked}
          tabIndex={0}
          role='switch'
          style={{
            width: 40,
            height: 22,
            background: checked ? "#007bff" : "#ccc",
            borderRadius: 12,
            position: "relative",
            display: "inline-block",
            transition: "background 0.2s",
            verticalAlign: "middle",
            cursor: disabled ? "not-allowed" : "pointer",
          }}
          onKeyDown={(e) => {
            if (!disabled && (e.key === "Enter" || e.key === " "))
              onChange(!checked);
          }}>
          <input
            type='checkbox'
            checked={checked}
            onChange={(e) => e.stopPropagation()}
            disabled={disabled}
            name={name}
            id={id}
            style={{
              position: "absolute",
              left: 0,
              top: 0,
              width: "100%",
              height: "100%",
              opacity: 0,
              margin: 0,
              cursor: disabled ? "not-allowed" : "pointer",
              zIndex: 2,
            }}
          />
          <span
            style={{
              position: "absolute",
              left: checked ? 20 : 2,
              top: 2,
              width: 18,
              height: 18,
              background: "#fff",
              borderRadius: "50%",
              boxShadow: "0 1px 4px rgba(0,0,0,0.12)",
              transition: "left 0.2s",
              zIndex: 1,
            }}
          />
        </span>
      </label>
    </div>
  );
};

export default Switch;
