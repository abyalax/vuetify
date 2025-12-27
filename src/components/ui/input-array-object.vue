<script setup lang="ts" generic="T extends Record<string, any>, O extends Record<string, any>">
  import type { FieldConfig } from '.'
  import { Field, useFieldArray } from 'vee-validate'

  export interface Props<O> {
    name: string
    label: string
    shape: { [K in keyof O]: FieldConfig }
  }

  const props = defineProps<Props<O>>()

  const { fields, push, remove } = useFieldArray<O>(props.name)

  function addItem () {
    const empty: any = {}
    for (const key of Object.keys(props.shape)) {
      empty[key] = ''
    }
    push(empty)
  }

  function removeItem (index: number) {
    remove(index)
  }
</script>

<template>
  <div class="mb-4">
    <label class="text-subtitle-2 font-weight-medium mb-2 d-block">
      {{ label }}
    </label>

    <div class="d-flex flex-column ga-4">
      <v-card
        v-for="(f, index) in fields"
        :key="f.key"
        class="pa-4"
        variant="outlined"
      >
        <div class="d-flex flex-column ga-3">
          <template v-for="([key, config]) in Object.entries(shape)" :key="key">
            <Field
              v-if="config.type === 'textarea'"
              v-slot="{ field, errors, handleChange, handleBlur }"
              :name="`${name}[${index}].${key}`"
            >
              <v-textarea
                v-bind="field"
                density="compact"
                :error-messages="errors"
                :label="config.label"
                variant="outlined"
                @blur="handleBlur"
                @update:model-value="handleChange"
              />
            </Field>
            <Field
              v-else-if="config.type === 'number'"
              v-slot="{ field, errors, handleChange, handleBlur }"
              :name="`${name}[${index}].${key}`"
            >
              <v-text-field
                density="compact"
                v-bind="field"
                :error-messages="errors"
                :label="config.label"
                :name="`${name}[${index}].${key}`"
                type="number"
                variant="outlined"
                @blur="handleBlur"
                @update:model-value="handleChange"
              />
            </Field>

            <Field
              v-else
              v-slot="{ field, errors, handleChange, handleBlur }"
              :name="`${name}[${index}].${key}`"
            >
              <v-text-field
                v-bind="field"
                density="compact"
                :error-messages="errors"
                :label="config.label"
                :name="`${name}[${index}].${key}`"
                :type="config.type ?? 'text'"
                variant="outlined"
                @blur="handleBlur"
                @update:model-value="handleChange"
              />
            </Field>

          </template>

          <v-btn
            color="error"
            size="small"
            variant="outlined"
            @click="removeItem(index)"
          >
            Remove
          </v-btn>
        </div>
      </v-card>

      <v-btn
        variant="outlined"
        @click="addItem"
      >
        Add {{ label }}
      </v-btn>
    </div>
  </div>
</template>
