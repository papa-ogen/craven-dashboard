const Input = ({
  id,
  label,
  value,
  type = "text",
  placeholder,
  onKeyDown,
  ref,
}: {
  id: string;
  label?: string;
  value?: string;
  type?: "text" | "password";
  placeholder?: string;
  ref?: HTMLInputElement;
  onKeyDown?: (e: any) => void;
}) => {
  return (
    <label class="flex flex-row pb-1" for={id}>
      {label && <span class="font-medium text-white w-24 pt-2">{label}</span>}
      <input
        ref={ref}
        id={id}
        type={type}
        value={value || ""}
        onFocus={() => ref.select()}
        class="text-darkGray rounded-sm"
        placeholder={placeholder}
        onKeyDown={onKeyDown}
      />
    </label>
  );
};

export default Input;
