import { FC } from 'react'

type LabeledListProps = {
  label: string
  items: string[]
}

export const LabeledList: FC<LabeledListProps> = ({ label, items = [] }) => {
  if (items?.length < 1) return null

  return (
    <div className="flex flex-col">
      <h3 className="text-caption uppercase">{label}</h3>
      <ul className="flex flex-col gap-0 pt-1">
        {items.map((item, index) => (
          <li key={`${item}-${index}`}>{item}</li>
        ))}
      </ul>
    </div>
  )
}
