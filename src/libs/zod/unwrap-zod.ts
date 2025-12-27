import { z } from 'zod'
import { ZodEffects } from 'zod/v3'

export function unwrapZodType (type: z.ZodTypeAny): z.ZodTypeAny {
  if (type instanceof z.ZodOptional || type instanceof z.ZodNullable) {
    // @ts-expect-error
    return unwrapZodType(type.unwrap())
  }

  if (type instanceof ZodEffects) {
    return unwrapZodType(type.innerType())
  }

  return type
}
