<script setup lang="ts">
  import { EyeInvisibleOutlined, EyeOutlined } from '@ant-design/icons-vue'
  import { toTypedSchema } from '@vee-validate/zod'
  import { ErrorMessage, Field, Form } from 'vee-validate'
  import { ref } from 'vue'
  import { useAuthStore } from '@/stores/auth'
  import { type LoginFormValues, loginSchema } from './login-schema'

  const validationSchema = toTypedSchema(loginSchema)
  const showPassword = ref(false)
  const authStore = useAuthStore()
  const initialValues: LoginFormValues = {
    email: 'info@codedthemes.com',
    password: 'admin123',
  }

  async function onSubmit (values: LoginFormValues) {
    await authStore.login(values.email, values.password)
    console.log(values)
  }
</script>

<template>
  <div class="d-flex justify-space-between align-center">
    <h3 class="text-h3 mb-0">Login</h3>
    <router-link class="text-primary text-decoration-none" to="/auth/register">
      Don't Have an account?
    </router-link>
  </div>

  <!-- @vue-expect-error : type missmatch cause toTypedSchema make the field optional, even at zod is required -->
  <Form
    class="mt-7 loginForm"
    :initial-values="initialValues"
    :validation-schema="validationSchema"
    @submit="onSubmit"
  >
    <!-- Email -->
    <div class="mb-6">
      <v-label>Email Address</v-label>
      <Field v-slot="{ field, errors }" name="email">
        <v-text-field
          v-bind="field"
          class="mt-2"
          color="primary"
          :error-messages="errors"
          hide-details="auto"
          variant="outlined"
        />
      </Field>
    </div>

    <!-- Password -->
    <div>
      <v-label>Password</v-label>
      <Field v-slot="{ field, errors }" name="password">
        <v-text-field
          v-bind="field"
          class="mt-2"
          color="primary"
          :error-messages="errors"
          hide-details="auto"
          :type="showPassword ? 'text' : 'password'"
          variant="outlined"
        >
          <template #append-inner>
            <v-btn icon variant="text" @click="showPassword = !showPassword">
              <EyeInvisibleOutlined v-if="!showPassword" />
              <EyeOutlined v-else />
            </v-btn>
          </template>
        </v-text-field>
      </Field>
    </div>

    <!-- Remember -->
    <div class="d-flex align-center mt-4 mb-7">
      <Field v-slot="{ field, errors }" name="remember" type="checkbox">
        <v-checkbox
          v-bind="field"
          color="primary"
          :error-messages="errors"
          hide-details
          label="Keep me sign in"
        />
      </Field>

      <div class="ml-auto">
        <router-link class="text-darkText link-hover" to="/auth/login">
          Forgot Password?
        </router-link>
      </div>
    </div>

    <!-- Submit -->
    <v-btn
      block
      color="primary"
      size="large"
      type="submit"
      variant="flat"
    >
      Login
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
.loginForm {
  .v-text-field .v-field--active input {
    font-weight: 500;
  }
}
</style>
