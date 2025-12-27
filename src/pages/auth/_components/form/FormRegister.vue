<script setup lang="ts">
  // icons
  import { EyeInvisibleOutlined, EyeOutlined } from '@ant-design/icons-vue'
  import { ref } from 'vue'
  const show1 = ref(false)
  const password = ref('')
  const email = ref('')
  const Regform = ref()
  const firstname = ref('')
  const lastname = ref('')
  // Password validation rules
  const passwordRules = ref([
    (v: string) => !!v || 'Password is required',
    (v: string) => v === v.trim() || 'Password cannot start or end with spaces',
    (v: string) => v.length <= 10 || 'Password must be less than 10 characters',
  ])
  const firstRules = ref([(v: string) => !!v || 'First Name is required'])
  const lastRules = ref([(v: string) => !!v || 'Last Name is required'])
  // Email validation rules
  const emailRules = ref([
    (v: string) => !!v.trim() || 'E-mail is required',
    (v: string) => {
      const trimmedEmail = v.trim()
      return !/\s/.test(trimmedEmail) || 'E-mail must not contain spaces'
    },
    (v: string) => /.+@.+\..+/.test(v.trim()) || 'E-mail must be valid',
  ])

  function validate () {
    Regform.value.validate()
  }
</script>

<template>
  <div class="d-flex justify-space-between align-center">
    <h3 class="text-h3 text-center mb-0">Sign up</h3>
    <router-link class="text-primary text-decoration-none" to="/login1">Already have an account?</router-link>
  </div>
  <v-form ref="Regform" action="/dashboards/analytical" class="mt-7 loginForm" lazy-validation>
    <v-row class="my-0">
      <v-col class="py-0" cols="12" sm="6">
        <div class="mb-6">
          <v-label>First Name*</v-label>
          <v-text-field
            v-model="firstname"
            class="mt-2"
            color="primary"
            hide-details="auto"
            placeholder="John"
            required
            :rules="firstRules"
            variant="outlined"
          />
        </div>
      </v-col>
      <v-col class="py-0" cols="12" sm="6">
        <div class="mb-6">
          <v-label>Last Name*</v-label>
          <v-text-field
            v-model="lastname"
            class="mt-2"
            color="primary"
            hide-details="auto"
            placeholder="Doe"
            required
            :rules="lastRules"
            variant="outlined"
          />
        </div>
      </v-col>
    </v-row>
    <div class="mb-6">
      <v-label>Company</v-label>
      <v-text-field
        class="mt-2"
        color="primary"
        hide-details="auto"
        placeholder="Demo Inc."
        variant="outlined"
      />
    </div>
    <div class="mb-6">
      <v-label>Email Address*</v-label>
      <v-text-field
        v-model="email"
        class="mt-2"
        color="primary"
        hide-details="auto"
        placeholder="demo@company.com"
        required
        :rules="emailRules"
        variant="outlined"
        @input="email"
      />
    </div>
    <div class="mb-6">
      <v-label>Password</v-label>
      <v-text-field
        v-model="password"
        class="mt-2"
        color="primary"
        hide-details="auto"
        placeholder="*****"
        required
        :rules="passwordRules"
        :type="show1 ? 'text' : 'password'"
        variant="outlined"
        @input="password"
      >
        <template #append-inner>
          <v-btn color="secondary" icon rounded variant="text">
            <EyeInvisibleOutlined v-if="show1 == false" :style="{ color: 'rgb(var(--v-theme-secondary))' }" @click="show1 = !show1" />
            <EyeOutlined v-if="show1 == true" :style="{ color: 'rgb(var(--v-theme-secondary))' }" @click="show1 = !show1" />
          </v-btn>
        </template>
      </v-text-field>
    </div>

    <div class="d-sm-inline-flex align-center mt-2 mb-7 mb-sm-0 font-weight-bold">
      <h6 class="text-caption">
        By Signing up, you agree to our
        <router-link class="text-primary link-hover font-weight-medium" to="/auth/register">Terms of Service </router-link>
        and
        <router-link class="text-primary link-hover font-weight-medium" to="/auth/register">Privacy Policy</router-link>
      </h6>
    </div>
    <v-btn
      block
      class="mt-4"
      color="primary"
      size="large"
      variant="flat"
      @click="validate()"
    >Create Account</v-btn>
  </v-form>
</template>
