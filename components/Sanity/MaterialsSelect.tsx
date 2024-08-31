import { useEffect, useState, useRef } from 'react'
import { uuid } from '@sanity/uuid'
import { compareArrays } from '../../lib/helpers'
import { useFormValue, set } from 'sanity'
import { client } from '../../lib/sanity.client'
import { materialsFromRefsQuery } from '../../lib/sanity.queries'
import Select from 'react-select'

import { Stack, Text } from '@sanity/ui'

export const MaterialsSelect = (props) => {
  const lastMaterialsRefs = useRef<any>(null)
  const [materials, setMaterials] = useState([])
  const { onChange, value } = props
  const materialsRefs: any = (useFormValue(['materials']) as any[])?.map(
    (ref) => ref._ref
  )

  const handleChange = (selected, label) => {
    const newValue = value ? [...value] : []

    const existingItemIndex = newValue.findIndex((item) => item.label === label)

    if (existingItemIndex !== -1) {
      newValue[existingItemIndex] = {
        ...newValue[existingItemIndex],
        items: selected?.map((item) => item.value),
      }
    } else {
      newValue.push({
        _key: uuid(),
        label: label,
        items: selected?.map((item) => item.value),
      })
    }

    onChange(set(newValue))
  }

  useEffect(() => {
    if (
      materialsRefs &&
      !compareArrays(materialsRefs, lastMaterialsRefs.current)
    ) {
      client
        .fetch(materialsFromRefsQuery, { ids: materialsRefs })
        .then((data) => {
          const materialsObj = data?.map((material) => ({
            label: material.title,
            items: material.materials?.map((material) => {
              return {
                value: material,
                label: material,
              }
            }),
          }))
          setMaterials(materialsObj)
        })

      lastMaterialsRefs.current = materialsRefs
    }
  }, [materialsRefs])

  if (!materials?.length) return null

  return (
    <Stack space={3} paddingTop={3}>
      {materials.map((material: any) => {
        const existingItem = value?.find(
          (item) => item.label === material.label
        )
        return (
          <Stack key={material.label} space={3}>
            <Text style={{ fontWeight: 'bold' }}>
              {material.label} Materials
            </Text>
            <Select
              closeMenuOnScroll={true}
              closeMenuOnSelect={false}
              defaultValue={existingItem?.items?.map((item) => ({
                value: item,
                label: item,
              }))}
              isMulti
              options={material.items}
              onChange={(selected) => handleChange(selected, material.label)}
              styles={{
                menu: (base) => ({
                  ...base,
                  backgroundColor: 'var(--card-bg-color)',
                  border: '1px solid var(--card-border-color)',
                }),
                control: (base) => ({
                  ...base,
                  backgroundColor: 'transparent',
                  borderColor: 'var(--card-border-color)',
                  ':hover': {
                    borderColor: 'var(--card-border-color)',
                  },
                }),
                option: (styles, { isFocused, isSelected }) => ({
                  ...styles,
                  color: 'var(--card-fg-color)',
                  backgroundColor: 'var(--card-bg-color)',
                  '&:hover, &:active, &:focus': {
                    backgroundColor: 'var(--card-code-bg-color)',
                  },
                }),
                multiValue: (styles) => ({
                  ...styles,
                  backgroundColor: 'var(--card-code-bg-color)',
                }),
                multiValueLabel: (styles) => ({
                  ...styles,
                  color: 'var(--card-fg-color)',
                  backgroundColor: 'var(--card-code-bg-color)',
                }),
              }}
            />
          </Stack>
        )
      })}
    </Stack>
  )
}
