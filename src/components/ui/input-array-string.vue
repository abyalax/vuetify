<!-- <script setup lang="ts">
  import { mdiDelete, mdiPlus } from '@mdi/js'
  import { Field, useFieldArray } from 'vee-validate'

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
        v-for="(f, index) in fields"
        :key="f.key"
        class="d-flex ga-2 align-center"
      >
        <Field :name="`${name}[${index}]`">
          <template #default="{ field, errors, handleChange, handleBlur }">
            <v-text-field
              v-if="type === 'number'"
              class="flex-grow-1"
              density="compact"
              :error-messages="errors"
              hide-details="auto"
              :placeholder="placeholder"
              v-bind="field"
              type="number"
              variant="outlined"
              @blur="handleBlur"
              @update:model-value="handleChange"
            />

            <v-text-field
              v-else
              class="flex-grow-1"
              density="compact"
              :error-messages="errors"
              hide-details="auto"
              :placeholder="placeholder"
              :type="type"
              variant="outlined"
              v-bind="field"
              @blur="handleBlur"
              @update:model-value="handleChange"
            />
          </template>
        </Field>

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
</template> -->

<script setup lang="ts">
  import { mdiDelete, mdiPlus } from '@mdi/js'
  import { Field, useFieldArray } from 'vee-validate'

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
        v-for="(f, index) in fields"
        :key="f.key"
        class="d-flex ga-2 align-center"
      >
        <Field
          v-slot="{ field, errors }"
          :name="`${name}[${index}]`"
        >
          <v-text-field
            v-bind="field"
            class="flex-grow-1"
            density="compact"
            :error-messages="errors"
            hide-details="auto"
            :placeholder="placeholder"
            :type="type"
            variant="outlined"
          />
        </Field>

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
