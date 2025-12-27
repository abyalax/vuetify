<script setup lang="ts">
  import { toTypedSchema } from '@vee-validate/zod'
  import { ErrorMessage, Field, Form } from 'vee-validate'
  import { candidateSchema, type FormDataCandidate, type PayloadCandidate } from './candidate-schema'

  type Props = {
    initialValues?: PayloadCandidate
    buttonSubmit: string
    onSubmit: (params: FormDataCandidate) => void
  }

  const props = defineProps<Props>()
  const validationSchema = toTypedSchema(candidateSchema)

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
    <div class="mb-6">
      <v-label>Full Name</v-label>
      <Field v-slot="{ field, errors, handleChange, handleBlur }" name="fullName">
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

    <div class="mb-6">
      <v-label>Email</v-label>
      <Field v-slot="{ field, errors, handleChange, handleBlur }" name="email">
        <v-text-field
          v-bind="field"
          class="mt-2"
          color="primary"
          :error-messages="errors"
          hide-details="auto"
          type="email"
          variant="outlined"
          @blur="handleBlur"
          @update:model-value="handleChange"
        />
      </Field>
    </div>

    <div class="mb-6">
      <v-label>Address</v-label>
      <Field v-slot="{ field, errors, handleChange, handleBlur }" name="location">
        <v-text-field
          v-bind="field"
          class="mt-2"
          color="primary"
          :error-messages="errors"
          hide-details="auto"
          :required="false"
          type="email"
          variant="outlined"
          @blur="handleBlur"
          @update:model-value="handleChange"
        />
      </Field>
    </div>

    <InputArrayString label="Phone" name="phoneNumbers" placeholder="e.g. 085765290292" type="text" />

    <div class="mb-6">
      <v-label>Status</v-label>
      <Field v-slot="{ field, errors, handleChange, handleBlur }" name="status">
        <v-select
          v-bind="field"
          class="mt-2"
          color="primary"
          :error-messages="errors"
          hide-details="auto"
          :items="['active', 'blacklisted', 'inactive']"
          label="Select"
          placeholder="Select Status Of Candidate"
          variant="outlined"
          @blur="handleBlur"
          @update:model-value="handleChange"
        />
      </Field>
    </div>

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
