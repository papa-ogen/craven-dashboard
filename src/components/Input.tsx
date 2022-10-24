import { ChangeEvent, FocusEvent, forwardRef, KeyboardEvent } from 'react'

type Ref = HTMLInputElement

type InputProps = {
  id: string
  label?: string
  value?: string
  defaultValue?: string
  type?: 'text' | 'password'
  placeholder?: string
  onKeyDown?: (e: KeyboardEvent<HTMLInputElement>) => void
  onFocus?: (e: FocusEvent<HTMLInputElement>) => void
  onChange?: (e: ChangeEvent<HTMLInputElement>) => void
  pb?: boolean
}

const Input = forwardRef<Ref, InputProps>((props, ref) => {
  const {
    id,
    label,
    value,
    defaultValue,
    type = 'text',
    placeholder,
    onKeyDown,
    onFocus,
    onChange,
    pb = true,
  } = props

  const inpurValue = defaultValue ? undefined : value || ''

  return (
    <label className={`flex flex-row ${pb && 'pb-1'} relative`} htmlFor={id}>
      {label && (
        <span className="block text-sm font-medium text-white w-24 pt-2">
          {label}
        </span>
      )}
      <input
        ref={ref}
        id={id}
        type={type}
        defaultValue={defaultValue}
        value={inpurValue}
        className="text-gray-800 rounded-sm px-1 py-0.5 w-full outline-0"
        placeholder={placeholder}
        onKeyDown={onKeyDown}
        onFocus={onFocus}
        onChange={onChange}
      />
    </label>
  )
})

Input.displayName = 'Input'

export default Input
