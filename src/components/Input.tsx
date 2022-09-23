const Input = ({
  id,
  label,
  value,
  type = 'text',
  placeholder,
  onKeyDown,
  ref,
}: {
  id: string
  label?: string
  value?: string
  type?: 'text' | 'password'
  placeholder?: string
  ref?: HTMLInputElement
  onKeyDown?: (e: any) => void
}) => {
  return (
    <label className="flex flex-row pb-1" htmlFor={id}>
      {label && (
        <span className="font-medium text-white w-24 pt-2">{label}</span>
      )}
      <input
        // ref={ref}
        id={id}
        type={type}
        value={value || ''}
        onFocus={() => ref.select()}
        className="text-darkGray rounded-sm"
        placeholder={placeholder}
        onKeyDown={onKeyDown}
      />
    </label>
  )
}

export default Input
