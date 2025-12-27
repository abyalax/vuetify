import type { ZodObject, ZodRawShape } from 'zod'
import { unwrapZodType } from './unwrap-zod'

export interface FieldConfig {
  label: string
  type?: 'text' | 'textarea' | 'number'
}

export function zodObjectToShape<T extends ZodRawShape> (
  schema: ZodObject<T>,
): Record<keyof T, FieldConfig> {
  const shape = schema.shape
  const result = {} as Record<keyof T, FieldConfig>

  for (const key in shape) {
    const rawField = shape[key]
    // @ts-expect-error
    const field = unwrapZodType(rawField)

    result[key] = {
      // @ts-expect-error
      label: rawField?.description ?? key,
      type: mapZodTypeToInput(field as unknown as string),
    }
  }

  return result
}

function mapZodTypeToInput (typeName: string): FieldConfig['type'] {
  switch (typeName) {
    case 'ZodNumber': {
      return 'number'
    }
    case 'ZodString': {
      return 'text'
    }
    default: {
      return 'text'
    }
  }
}
