export const Checkbox = ({ label, value, checked, onChange }) => {
  const handleChange = (e) => {
    onChange(e.target.value)
  }

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter') {
      e.preventDefault()
      onChange(value)
    }
  }

  return (
    <label
      className="am-checkbox flex cursor-pointer items-start gap-8 text-body md:gap-10"
      htmlFor={value}
    >
      <input
        className="peer sr-only"
        id={value}
        type="checkbox"
        value={value}
        onChange={handleChange}
        checked={checked}
        onKeyDown={handleKeyDown}
      />
      <div className="ease h-9 w-9 border-1 border-solid border-black bg-white transition-colors duration-300 peer-checked:bg-black"></div>
      <span className="relative -top-[3.5px] inline-block">{label}</span>
    </label>
  )
}
