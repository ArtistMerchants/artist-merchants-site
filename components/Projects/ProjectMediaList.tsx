import { ProjectMediaImage } from './ProjectMediaImage'

export const ProjectMediaList = ({ media = [] }) => {
  return (
    <div className="flex flex-col gap-10">
      {media.map((item: any) => {
        return <ProjectMediaImage key={item._key} image={item} />
      })}
    </div>
  )
}
