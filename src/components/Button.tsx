import React from "react";
import "../styles/components/_button.scss";

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: "primary" | "secondary" | "danger" | "success";
  size?: "sm" | "md" | "lg";
  loading?: boolean;
  icon?: React.ReactNode;
}

const Button: React.FC<ButtonProps> = ({
  children,
  variant = "primary",
  size = "md",
  loading = false,
  icon,
  disabled,
  ...rest
}) => {
  return (
    <button
      className={`btn btn--${variant} btn--${size}`}
      disabled={disabled || loading}
      {...rest}>
      {loading ? (
        <span className='btn__spinner' />
      ) : (
        icon && <span className='btn__icon'>{icon}</span>
      )}
      <span>{children}</span>
    </button>
  );
};

export default Button;
