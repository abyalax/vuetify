<script setup lang="ts">
  import { mdiDelete, mdiPlus } from '@mdi/js'
  import { useFieldArray } from 'vee-validate'

  interface Props {
    name: string
    label: string
    placeholder?: string
    type?: 'text' | 'number' | 'email' | 'url'
  }

  const props = withDefaults(defineProps<Props>(), {
    placeholder: '',
    type: 'text',
  })

  const { fields, push, remove } = useFieldArray<string>(props.name)

  function addItem () {
    push('')
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

    <div class="d-flex flex-column ga-3">
      <div
        v-for="(field, index) in fields"
        :key="field.key"
        class="d-flex ga-2 align-center"
      >
        <v-text-field
          v-if="type === 'number'"
          v-model.number="field.value"
          class="flex-grow-1"
          density="compact"
          hide-details="auto"
          :name="`${name}[${index}]`"
          :placeholder="placeholder"
          type="number"
          variant="outlined"
        />

        <v-text-field
          v-else
          v-model="field.value"
          class="flex-grow-1"
          density="compact"
          hide-details="auto"
          :name="`${name}[${index}]`"
          :placeholder="placeholder"
          :type="type"
          variant="outlined"
        />

        <v-btn
          color="error"
          :icon="mdiDelete"
          size="small"
          variant="text"
          @click="removeItem(index)"
        />
      </div>

      <v-btn
        :prepend-icon="mdiPlus"
        variant="outlined"
        @click="addItem"
      >
        Add {{ label }}
      </v-btn>
    </div>
  </div>
</template>
