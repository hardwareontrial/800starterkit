<template>
  <div class="auth-wrapper auth-v1 px-2">
    <div class="auth-inner py-2">
      <b-card class="mb-0">
        <b-link class="brand-logo">
          <logo-light-component />
        </b-link>
<!--        -->
        <b-card-title
          class="font-weight-bold mb-1">
          <h3>Selamat Datang! 👋</h3>
        </b-card-title>
        <b-card-text class="mb-2">
          Silahkan masuk menggunakan Email/NIK Anda.
        </b-card-text>

        <alert-notification-component
          :alert="alertProps"
        />

        <b-form
          class="auth-login-form mt-2"
          @submit.prevent
        >
          <!-- username -->
          <b-form-group
            label-for="email"
            label="Username"
          >
            <b-form-input
              id="email"
              v-model="form.username"
              name="login-email"
              placeholder="000 atau anda@mail.com"
              :readonly="processing"
              autofocus
            />
          </b-form-group>

          <!-- password -->
          <b-form-group>
            <div class="d-flex justify-content-between">
              <label for="login-password">Password</label>
            </div>
            <b-input-group
              class="input-group-merge">
              <b-form-input
                id="login-password"
                v-model="form.password"
                :readonly="processing"
                :type="passwordFieldType"
                class="form-control-merge"
                name="login-password"
                placeholder="············"
              />
              <b-input-group-append is-text>
                <div @click="togglePasswordVisibility">
                  <iconify
                    class="cursor-pointer"
                    :icon="passwordToggleIcon"
                    :style="{fontSize: '16px'}"
                  />
                </div>
              </b-input-group-append>
            </b-input-group>
          </b-form-group>

          <!-- submit button -->
          <b-button
            class="mt-3"
            type="button"
            block
            :disabled="processing"
            :variant="processing ? 'secondary':'primary'"
            @click="signIn"
          >
            <b-spinner
              v-if="processing"
              small
              class="mr-1"
            />
            <span>{{ processing ? 'Mohon tunggu' : 'Masuk' }}</span>
          </b-button>

          <b-button
            type="button"
            block
            class="mt-75"
            :variant="processing ? 'secondary':'danger'"
            :to="{name: 'home-view'}"
          >
            <span>Batal</span>
          </b-button>

        </b-form>
      </b-card>
    </div>
  </div>
</template>

<script>
import {
  BCard, BCardTitle, BCardText, BForm, BFormInput, BFormGroup, BInputGroup, BInputGroupAppend, BButton, BSpinner, BLink,
} from 'bootstrap-vue'
import AlertNotificationComponent from '@/migis/components/Alert.vue'
import { togglePasswordVisibility } from '@core/mixins/ui/forms'
import LogoLightComponent from '@/migis/components/Logo.vue'
import store from '@/store'
import AuthorizationService from '@/migis/modules/app/authorization/services'

export default {
  components: {
    BCard,
    BCardTitle,
    BCardText,
    AlertNotificationComponent,
    BForm,
    BFormInput,
    BFormGroup,
    BInputGroup,
    BInputGroupAppend,
    BButton,
    BSpinner,
    LogoLightComponent,
    BLink,
  },
  mixins: [togglePasswordVisibility],
  data() {
    return {
      form: {
        username: '9001',
        password: 'password1',
      },
      processing: false,
      alertProps: { show: false, variant: 'danger', message: null },
    }
  },
  methods: {
    validator() {
      const errors = []
      if(!this.form.username) errors.push('Username tidak boleh kosong.')
      if(!this.form.password) errors.push('Password tidak boleh kosong.')
      return { success: errors.length === 0, message: errors }
    },
    handleAlertNotification(show, variant, message) {
      this.alertProps = { show: show, variant: variant, message: message }
    },
    handleProcessing(value) {
      this.processing = value
    },
    async signIn() {
      this.handleAlertNotification(false, '', null)
      this.handleProcessing(true)
      const isValid = this.validator()
      if (!isValid.success) {
        this.handleAlertNotification(true, 'danger', isValid.message)
        this.handleProcessing(false)
        setTimeout(() => this.handleAlertNotification(false, '', null), 4000)
      } else {
        try {
          const response = await AuthorizationService.signIn(this.form)
          if(response.success) {
            this.$bvToast.toast(`Selamat Datang ${response.data?.fname}.`, {title: 'AUTHORIZATION', toaster: 'b-toaster-top-center', solid: false, variant: 'success'})
            setTimeout(() => {
              this.handleProcessing(false)
              this.$router.replace(this.$route.query.redirect || {name: 'dashboard-view'})
            }, 750)
          } else {
            this.$bvToast.toast(`Failed: ${response.message}`, {title: 'AUTHORIZATION', toaster: 'b-toaster-top-center', solid: false, variant: 'success'})
          }
        } catch (err) {
          console.error(err.response.data.data)
          this.handleAlertNotification(true, 'danger', err.response.data.data || err.response.data)
          this.handleProcessing(false)
          setTimeout(() => this.handleAlertNotification(false, '', null), 4000)
        }
      }
    },
  },
  computed: {
    passwordToggleIcon() {
      return this.passwordFieldType === 'password' ? 'tabler:eye-off' : 'tabler:eye'
    },
  },
}
</script>

<style lang="scss">
  @import '@core/scss/vue/pages/page-auth.scss';
</style>
