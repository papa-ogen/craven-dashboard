type ButtonVariant = 'primary' | 'filled' | 'transparent'
type ButtonProps = {
  id?: string
  children: React.ReactNode
  disabled?: boolean
  variant?: ButtonVariant
  onClick: (e: React.MouseEvent<HTMLButtonElement>) => void
}

const generateCssClasses = (variant: ButtonVariant, disabled?: boolean) => {
  const baseClasses = 'border text-sm px-3 py-1 rounded-sm'

  switch (variant) {
    case 'filled':
      return `${
        disabled
          ? 'bg-darkGray text-gray border-gray'
          : 'bg-blue text-white border-blue hover:border-white'
      } ${baseClasses}`
    case 'primary':
      return `${
        disabled
          ? 'bg-darkGray text-gray border-gray'
          : 'bg-blue text-white border-blue hover:border-white'
      } ${baseClasses}`
    case 'transparent':
      return 'border-0'
  }
}

const Button = ({
  id,
  disabled,
  variant = 'primary',
  onClick,
  children,
}: ButtonProps) => {
  return (
    <button
      id={id || null}
      type="button"
      className={generateCssClasses(variant, disabled)}
      disabled={disabled}
      onClick={onClick}
    >
      {children}
    </button>
  )
}

export default Button
