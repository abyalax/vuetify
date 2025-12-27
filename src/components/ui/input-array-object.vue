<script setup lang="ts" generic="T extends Record<string, any>, O extends Record<string, any>">
  import type { FieldConfig } from '.'
  import { useFieldArray } from 'vee-validate'

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
        v-for="(field, index) in fields"
        :key="field.key"
        class="pa-4"
        variant="outlined"
      >
        <div class="d-flex flex-column ga-3">
          <template v-for="([key, config]) in Object.entries(shape)" :key="key">
            <v-textarea
              v-if="config.type === 'textarea'"
              v-model="field.value[key]"
              density="compact"
              :label="config.label"
              :name="`${name}[${index}].${key}`"
              variant="outlined"
            />

            <v-text-field
              v-else-if="config.type === 'number'"
              v-model.number="field.value[key]"
              density="compact"
              :label="config.label"
              :name="`${name}[${index}].${key}`"
              type="number"
              variant="outlined"
            />

            <v-text-field
              v-else
              v-model="field.value[key]"
              density="compact"
              :label="config.label"
              :name="`${name}[${index}].${key}`"
              :type="config.type ?? 'text'"
              variant="outlined"
            />
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
