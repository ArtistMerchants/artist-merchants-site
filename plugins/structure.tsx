import { type DocumentDefinition, definePlugin } from 'sanity'
import { DocumentTextIcon, ImagesIcon } from '@sanity/icons'
import { orderableDocumentListDeskItem } from '@sanity/orderable-document-list'

export const structurePlugin = definePlugin<{ type: string | string[] }>(
  ({ type }) => {
    return {
      name: 'settings',
      document: {
        newDocumentOptions: (prev, { creationContext }) => {
          if (creationContext.type === 'global') {
            if (typeof type === 'string') {
              return prev.filter(
                (templateItem) => templateItem.templateId !== type
              )
            }

            return prev.filter(
              (templateItem) => !type.includes(templateItem.templateId)
            )
          }

          return prev
        },
        // Removes the "duplicate" action on the "settings" singleton
        actions: (prev, { schemaType }) => {
          if (
            (typeof type === 'string' && schemaType === type) ||
            type.includes(schemaType)
          ) {
            return prev.filter(({ action }) => action !== 'duplicate')
          }

          return prev
        },
      },
    }
  }
)

export const structureConfig = (typeDefs: DocumentDefinition[]) => {
  return (S, context) => {
    const singletons = typeDefs.map((typeDef) => {
      return S.listItem()
        .title(typeDef.title as string)
        .icon(typeDef.icon)
        .child(
          S.editor()
            .id(typeDef.name)
            .schemaType(typeDef.name)
            .documentId(typeDef.name)
            .views([S.view.form()])
        )
    })

    const defaultListItems = S.documentTypeListItems()
      .filter(
        (listItem) =>
          !typeDefs.find((typeDef) => listItem.getId() === typeDef.name)
      )
      .map((listItem) => {
        return orderableDocumentListDeskItem({
          type: listItem.getId(),
          title: listItem.getTitle(),
          icon: listItem.getId() === 'project' ? ImagesIcon : DocumentTextIcon,
          S,
          context,
        })
      })

    return S.list()
      .title('Content')
      .items([...singletons, S.divider(), ...defaultListItems])
  }
}
