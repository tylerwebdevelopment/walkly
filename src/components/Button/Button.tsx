import clsx from 'clsx';
import React from 'react';

import styles from './Button.module.css';

type ButtonProps = {
  variant?: 'primary' | 'secondary' | 'outline-primary' | 'outline-secondary' | 'ghost' | 'link';
  size?: 'sm' | 'md' | 'lg';
  children: React.ReactNode;
} & React.ButtonHTMLAttributes<HTMLButtonElement>;

const Button = ({
  variant = 'primary',
  size = 'sm',
  children,
  className = '',
  ...props
}: ButtonProps) => {
  // Build Classname
  const buttonStyles = clsx(`btn ${styles[`btn-${variant}`]} ${styles[`btn-${size}`]} ${className}`);

  return (
    <button className={buttonStyles} {...props}>
      {children}
    </button>
  );
};

export default Button;
