import { ProjectMediaImage } from './ProjectMediaImage'

export const ProjectMediaList = ({ media = [] }) => {
  return (
    <div className="flex flex-col gap-10">
      {media.map((item: any) => {
        if (item._type === 'image') {
          return <ProjectMediaImage key={item._id} image={item} />
        }
        return <div key={item._id}>Item {item._type}</div>
      })}
    </div>
  )
}
