type ButtonVariant = 'primary' | 'filled' | 'transparent' | 'small'

type ButtonProps = {
  id?: string
  children: React.ReactNode
  disabled?: boolean
  variant?: ButtonVariant
  onClick?: (e: React.MouseEvent<HTMLButtonElement>) => void
}

const generateCssClasses = (variant: ButtonVariant, disabled?: boolean) => {
  const baseClasses = 'border text-sm px-3 py-1 rounded-sm'
  const baseClassesSmall = 'border text-xs px-2 py-1 rounded-sm'

  switch (variant) {
    case 'filled':
      return `${
        disabled
          ? 'bg-darkGray text-gray border-gray'
          : 'bg-blue-400 text-white border-blue-400 hover:border-white'
      } ${baseClasses}`
    case 'primary':
      return `${
        disabled
          ? 'bg-darkGray text-gray border-gray'
          : 'bg-blue-400 text-white border-blue-400 hover:border-white'
      } ${baseClasses}`
    case 'transparent':
      return 'border-0'
    case 'small':
      return `${
        disabled
          ? 'bg-darkGray text-gray border-gray'
          : 'bg-blue-400 text-white border-blue-400 hover:border-white'
      } ${baseClassesSmall}`
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
      id={id || undefined}
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
