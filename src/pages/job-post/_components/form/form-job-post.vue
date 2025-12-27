<script setup lang="ts">
  import type { FormDataJobPost, PayloadJobPost } from './job-schema'
  import { toTypedSchema } from '@vee-validate/zod'
  import { ErrorMessage, Field, Form } from 'vee-validate'
  import { jobPostSchema } from './job-schema'

  type Props = {
    initialValues?: PayloadJobPost
    buttonSubmit: string
    onSubmit: (params: FormDataJobPost) => void
  }

  const props = defineProps<Props>()
  const validationSchema = toTypedSchema(jobPostSchema)

</script>

<template>

  <!-- @vue-expect-error : type missmatch cause toTypedSchema make the field optional, even at zod is required -->
  <Form
    :key="JSON.stringify(props.initialValues)"
    class="mt-7 my-form"
    :initial-values="props.initialValues"
    :validation-schema="validationSchema"
    @submit="onSubmit"
  >
    <div class="mb-6">
      <v-label>Title</v-label>
      <Field v-slot="{ field, errors, handleChange, handleBlur }" name="title">
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
      <v-label>Department</v-label>
      <Field v-slot="{ field, errors, handleChange, handleBlur }" name="department">
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

    <div class="mb-6">
      <v-label>Description</v-label>
      <Field v-slot="{ field, errors, handleChange, handleBlur }" name="description">
        <v-text-field
          v-bind="field"
          class="mt-2"
          color="primary"
          :error-messages="errors"
          hide-details="auto"
          placeholder="e.g. Anything about jobs needed"
          :required="false"
          type="textarea"
          variant="outlined"
          @blur="handleBlur"
          @update:model-value="handleChange"
        />
      </Field>
    </div>

    <InputArrayString label="Requierement" name="requirements" placeholder="e.g. Anything about jobs needed" type="text" />
    <InputArrayString label="Responsibilities" name="responsibilities" placeholder="e.g. Anything about jobs needed" type="text" />

    <div class="mb-6">
      <v-label>Status of Job Post</v-label>
      <Field v-slot="{ field, errors, handleChange, handleBlur }" name="status">
        <v-select
          v-bind="field"
          class="mt-2"
          color="primary"
          :error-messages="errors"
          hide-details="auto"
          :items="['closed', 'draft', 'published']"
          label="Job Post Status"
          placeholder="Select Status Of Job Post"
          variant="outlined"
          @blur="handleBlur"
          @update:model-value="handleChange"
        />
      </Field>
    </div>

    <div class="mb-6">
      <v-label>Type Employment</v-label>
      <Field v-slot="{ field, errors, handleChange, handleBlur }" name="employmentType">
        <v-select
          v-bind="field"
          class="mt-2"
          color="primary"
          :error-messages="errors"
          hide-details="auto"
          :items="['contract', 'freelance', 'full-time', 'internship', 'part-time']"
          label="Employement Type"
          placeholder="Select Employement Type"
          variant="outlined"
          @blur="handleBlur"
          @update:model-value="handleChange"
        />
      </Field>
    </div>

    <div class="mb-6">
      <v-label>Minimum Salary</v-label>
      <Field v-slot="{ field, errors, handleChange, handleBlur }" name="minSalary">
        <v-text-field
          v-bind="field"
          class="mt-2"
          color="primary"
          :error-messages="errors"
          hide-details="auto"
          :required="false"
          type="number"
          variant="outlined"
          @blur="handleBlur"
          @update:model-value="handleChange"
        />
      </Field>
    </div>

    <div class="mb-6">
      <v-label>Maximum Salary</v-label>
      <Field v-slot="{ field, errors, handleChange, handleBlur }" name="maxSalary">
        <v-text-field
          v-bind="field"
          class="mt-2"
          color="primary"
          :error-messages="errors"
          hide-details="auto"
          :required="false"
          type="number"
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
.my-form {
  .v-text-field .v-field--active input {
    font-weight: 500;
  }
}
</style>
