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

  return (
    <button {...props}>
      {children}
    </button>
  );
};

export default Button;
