export const Checkbox = ({ label, value, checked, onChange }) => {
  const handleChange = (e) => {
    onChange(e.target.value)
  }

  return (
    <label
      htmlFor={value}
      className="flex cursor-pointer items-start gap-8 text-13 leading-100 md:gap-12 md:text-14"
    >
      <input
        className="peer hidden"
        id={value}
        type="checkbox"
        value={value}
        onChange={handleChange}
        checked={checked}
      />
      <div className="ease h-10 w-10 border-1 border-solid border-black bg-white transition-colors duration-300 peer-checked:bg-black"></div>
      <span className="relative -top-1 inline-block">{label}</span>
    </label>
  )
}
