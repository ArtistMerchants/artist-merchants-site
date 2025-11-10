import { useEffect, useState, useRef } from 'react'
import { uuid } from '@sanity/uuid'
import { useFormValue, set } from 'sanity'
import { compareArrays } from '../../lib/helpers'
import { client } from '../../lib/sanity.client'
import { materialsFromRefsQuery } from '../../lib/sanity.queries'
import Select from 'react-select'

import { Stack, Text } from '@sanity/ui'

export const TechniquesSelect = (props) => {
  const lastMaterialsRefs = useRef<any>(null)
  const [techniques, setTechniques] = useState([])
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
    // Check if materialsRefs has changed
    const hasChanged = !compareArrays(materialsRefs, lastMaterialsRefs.current)

    if (hasChanged) {
      // If materialsRefs is empty or null, remove all entries
      if (!materialsRefs || materialsRefs.length === 0) {
        setTechniques([])
        if (value && Array.isArray(value) && value.length > 0) {
          onChange(set([]))
        }
        lastMaterialsRefs.current = materialsRefs
        return
      }

      // Fetch materials and clean up orphaned entries
      client
        .fetch(materialsFromRefsQuery, { ids: materialsRefs })
        .then((data) => {
          const techniquesObj = data?.map((material) => ({
            label: material.title,
            items: material.techniques?.map((material) => {
              return {
                value: material,
                label: material,
              }
            }),
          }))
          setTechniques(techniquesObj)

          // Remove any entries from value that no longer exist in materialsRefs
          // Use the fetched data directly to get valid material titles
          if (value && Array.isArray(value) && value.length > 0 && data) {
            const validLabels = new Set(data.map((material) => material.title))
            const filteredValue = value.filter((item) =>
              validLabels.has(item.label)
            )

            // Only update if we actually removed something
            if (filteredValue.length !== value.length) {
              onChange(set(filteredValue))
            }
          }
        })

      lastMaterialsRefs.current = materialsRefs
    }
  }, [materialsRefs, value, onChange])

  if (!techniques?.length) return null

  return (
    <Stack space={3} paddingTop={3}>
      {techniques.map((technique: any) => {
        const existingItem = value?.find(
          (item) => item.label === technique.label
        )
        return (
          <Stack key={technique.label} space={3}>
            <Text style={{ fontWeight: 'bold' }}>
              {technique.label} Techniques
            </Text>
            <Select
              closeMenuOnScroll={true}
              closeMenuOnSelect={false}
              defaultValue={existingItem?.items?.map((item) => ({
                value: item,
                label: item,
              }))}
              isMulti
              options={technique.items}
              onChange={(selected) => handleChange(selected, technique.label)}
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
                  color: 'var(--card-fg-color)',
                }),
                multiValue: (styles) => ({
                  ...styles,
                  backgroundColor: 'var(--card-border-color)',
                }),
                multiValueLabel: (styles) => ({
                  ...styles,
                  color: 'var(--card-fg-color)',
                }),
              }}
            />
          </Stack>
        )
      })}
    </Stack>
  )
}
