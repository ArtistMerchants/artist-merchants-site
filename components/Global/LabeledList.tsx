import { FC } from 'react'

type LabeledListProps = {
  label: string
  items: string[]
}

export const LabeledList: FC<LabeledListProps> = ({ label, items = [] }) => {
  return (
    <div className="flex flex-col">
      <h3 className="text-10 uppercase tracking-[0.06em]">{label}</h3>
      <ul className="flex flex-col gap-4">
        {items.map((item, index) => (
          <li key={`${item}-${index}`}>{item}</li>
        ))}
      </ul>
    </div>
  )
}
