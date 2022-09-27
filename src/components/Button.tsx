type ButtonProps = {
  id?: string
  label: string
  disabled?: boolean
  onClick: (e: React.MouseEvent<HTMLButtonElement>) => void
}

const Button = ({ id, label, disabled, onClick }: ButtonProps) => {
  return (
    <button
      id={id || null}
      type="button"
      className={`${
        disabled
          ? 'bg-darkGray text-gray border-gray'
          : 'bg-blue text-white border-blue hover:border-white'
      } border text-sm px-3 py-1 rounded-sm`}
      disabled={disabled}
      onClick={onClick}
    >
      {label}
    </button>
  )
}

export default Button
