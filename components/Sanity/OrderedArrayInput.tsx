import React, { useCallback } from 'react'
import { AddIcon } from '@sanity/icons'
import { Button, Stack } from '@sanity/ui'

export const OrderedArrayInput = (props) => {
  return (
    <Stack space={3}>
      {props.renderDefault({
        ...props,
        arrayFunctions: (props) => {
          const { onItemPrepend, onValueCreate, schemaType } = props

          const insertItem = (itemType: any) => {
            onItemPrepend(onValueCreate(itemType))
          }

          const handleAddBtnClick = () => {
            insertItem(schemaType.of[0])
          }

          return (
            <Button
              icon={AddIcon}
              mode="ghost"
              text="Add Image"
              onClick={handleAddBtnClick}
            ></Button>
          )
        },
      })}
    </Stack>
  )
}
