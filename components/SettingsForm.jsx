import React from 'react'
import {Card, Stack} from '@sanity/ui'
import {useSchema} from 'sanity'

export function SettingsForm(props) {
  const {document, onChange} = props
  const schema = useSchema()
  const settingsType = schema.get('settings')

  return (
    <Card padding={4}>
      <Stack space={4}>
        {settingsType.fields.map((field) => {
          const InputComponent = schema.get(field.type).component
          return (
            <InputComponent
              key={field.name}
              type={field}
              value={document.displayed[field.name]}
              onChange={(patchEvent) => onChange(patchEvent, field)}
              path={[field.name]}
            />
          )
        })}
      </Stack>
    </Card>
  )
}