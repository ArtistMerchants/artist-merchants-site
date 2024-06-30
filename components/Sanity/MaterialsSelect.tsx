import { useEffect, useState, useRef } from 'react'
import { uuid } from '@sanity/uuid'
import { useFormValue, set, unset } from 'sanity'
import { client } from 'lib/sanity.client'
import { materialsFromRefsQuery } from 'lib/sanity.queries'
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
      materialsRefs?.length !== lastMaterialsRefs.current?.length
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
                control: (base) => ({
                  ...base,
                  backgroundColor: 'transparent',
                  borderColor: 'var(--card-border-color)',
                  ':hover': {
                    borderColor: 'var(--card-border-color)',
                  },
                }),
                option: (styles) => ({
                  ...styles,
                  color: 'black',
                }),
                multiValue: (styles) => ({
                  ...styles,
                  backgroundColor: 'var(--card-border-color)',
                }),
                multiValueLabel: (styles) => ({
                  ...styles,
                  color: 'white',
                }),
              }}
            />
          </Stack>
        )
      })}
    </Stack>
  )
}
