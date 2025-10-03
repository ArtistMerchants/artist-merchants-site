export const InformationContact = ({ title, items }) => {
  if (!items) return null
  return (
    <div className="flex flex-col gap-14 text-body-lg">
      <h2 className="sr-only">Email</h2>
      <ul className="flex flex-col items-center">
        {items?.map((item) => (
          <li key={item._key}>
            <a
              href={item.url}
              className="underline decoration-[0.5px] underline-offset-4"
            >
              {item.label}
            </a>
          </li>
        ))}
      </ul>
    </div>
  )
}
