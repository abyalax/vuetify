<template>
  <v-card class="bg-surface" variant="outlined">
    <v-card-text>
      <div class="d-flex align-center justify-space-between">
        <div>
          <h5 class="text-h5 mb-0">Help & Support Chat</h5>
          <span class="text-caption text-lightText">Typical replay within 5 min</span>
        </div>
        <div class="d-flex align-center justify-center flex-wrap flex-row-reverse">
          <v-avatar class="ml-n2" color="surface" size="35" variant="outlined">
            <img alt="vector" src="@/assets/images/users/avatar-4.png" width="35">
          </v-avatar>
          <v-avatar class="ml-n2" color="surface" size="35" variant="outlined">
            <img alt="vector" src="@/assets/images/users/avatar-3.png" width="35">
          </v-avatar>
          <v-avatar class="ml-n2" color="surface" size="35" variant="outlined">
            <img alt="vector" src="@/assets/images/users/avatar-2.png" width="35">
          </v-avatar>
          <v-avatar color="surface" size="35" variant="outlined">
            <img alt="vector" src="@/assets/images/users/avatar-1.png" width="35">
          </v-avatar>
        </div>
      </div>
      <v-btn
        block
        class="mt-6"
        color="primary"
        density="comfortable"
        href="https://codedthemes.support-hub.io/"
        target="_"
        variant="flat"
      >Need Help?</v-btn>
    </v-card-text>
  </v-card>
</template>
