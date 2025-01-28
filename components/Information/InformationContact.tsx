export const InformationContact = ({ title, items }) => {
  if (!items) return null
  return (
    <div className="flex flex-col gap-14 text-body-lg">
      <h2 className="pb-6 text-caption uppercase">Email</h2>
      <ul className="flex flex-col items-start">
        {items?.map((item) => (
          <li key={item._key}>
            <a href={item.url} className="underline underline-offset-4">
              {item.label}
            </a>
          </li>
        ))}
      </ul>
    </div>
  )
}
