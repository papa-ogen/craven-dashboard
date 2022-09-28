import { ChangeEvent, FocusEvent, forwardRef, KeyboardEvent } from 'react'

type Ref = HTMLInputElement

type InputProps = {
  id: string
  label?: string
  value?: string
  type?: 'text' | 'password'
  placeholder?: string
  onKeyDown?: (e: KeyboardEvent<HTMLInputElement>) => void
  onFocus?: (e: FocusEvent<HTMLInputElement>) => void
  onChange?: (e: ChangeEvent<HTMLInputElement>) => void
}

const Input = forwardRef<Ref, InputProps>((props, ref) => {
  const {
    id,
    label,
    value,
    type = 'text',
    placeholder,
    onKeyDown,
    onFocus,
    onChange,
  } = props
  return (
    <label className="flex flex-row pb-1" htmlFor={id}>
      {label && (
        <span className="font-medium text-white w-24 pt-2">{label}</span>
      )}
      <input
        ref={ref}
        id={id}
        type={type}
        defaultValue={value || ''}
        className="text-darkGray rounded-sm px-1 py-0.5 w-full outline-0"
        placeholder={placeholder}
        onKeyDown={onKeyDown}
        onFocus={onFocus}
        onChange={onChange}
      />
    </label>
  )
})

export default Input
