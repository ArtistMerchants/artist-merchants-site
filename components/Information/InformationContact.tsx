export const InformationContact = ({ title, items }) => {
  if (!items) return null
  return (
    <div className="flex flex-col gap-10">
      {title ? <h2 className="text-caption uppercase">{title}</h2> : null}
      <ul className="flex flex-col items-start">
        {items?.map((item) => (
          <li key={item._key}>
            <a href={item.url} className="underline-offset-3 underline">
              {item.label}
            </a>
          </li>
        ))}
      </ul>
    </div>
  )
}
