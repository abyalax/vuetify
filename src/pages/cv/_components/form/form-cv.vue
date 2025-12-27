<script setup lang="ts">
  import { toTypedSchema } from '@vee-validate/zod'
  import { ErrorMessage, Field, Form } from 'vee-validate'
  import { cvSchema, educationShape, experienceShape, type FormDataCV, type PayloadCV } from './cv-schema'

  type Props = {
    initialValues?: PayloadCV
    buttonSubmit: string
    onSubmit: (params: FormDataCV) => void
  }

  const props = defineProps<Props>()
  const validationSchema = toTypedSchema(cvSchema)

</script>

<template>

  <!-- @vue-expect-error : type missmatch cause toTypedSchema make the field optional, even at zod is required -->
  <Form
    :key="JSON.stringify(props.initialValues)"
    class="mt-7 cv-form"
    :initial-values="props.initialValues"
    :validation-schema="validationSchema"
    @submit="onSubmit"
  >
    <!-- Name -->
    <div class="mb-6">
      <v-label>Name</v-label>
      <Field v-slot="{ field, errors, handleChange, handleBlur }" name="name">
        <v-text-field
          v-bind="field"
          class="mt-2"
          color="primary"
          :error-messages="errors"
          hide-details="auto"
          variant="outlined"
          @blur="handleBlur"
          @update:model-value="handleChange"
        />
      </Field>
    </div>

    <!-- Skill -->
    <InputArrayString label="Skill" name="skills" placeholder="e.g. JavaScript" />

    <InputArrayObject label="Experiences" name="experiences" :shape="experienceShape" />

    <InputArrayObject label="Educations" name="educations" :shape="educationShape" />

    <!-- Expected Sallary -->
    <div class="mb-6">
      <v-label>Expected Salary</v-label>
      <Field v-slot="{ field, errors, handleChange, handleBlur }" name="expectedSalary">
        <v-number-input
          v-bind="field"
          class="mt-2"
          color="primary"
          :error-messages="errors"
          hide-details="auto"
          type="number"
          variant="outlined"
          @blur="handleBlur"
          @change="handleChange"
        />
      </Field>
    </div>

    <!-- Submit -->
    <v-btn
      block
      color="primary"
      size="large"
      type="submit"
      variant="flat"
    >
      {{ props.buttonSubmit }}
    </v-btn>

    <!-- FORM ERROR -->
    <ErrorMessage v-slot="{ message }" name="_form">
      <v-alert class="mt-4" color="error">
        {{ message }}
      </v-alert>
    </ErrorMessage>
  </Form>
</template>

<style lang="scss">
.cv-form {
  .v-text-field .v-field--active input {
    font-weight: 500;
  }
}
</style>
