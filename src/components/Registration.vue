<template>
  <div id="">
    <div class='container registration-form'>
      <div class="row">
        <div class="col-8 offset-sm-2">
          <div class="h1 text-primary">Sign up</div>
          <form @keyup.enter='signUp'>
            <div class="alert alert-danger" v-if="errors">
              {{ errors }}
            </div>
            <div class="form-group">
              <input type="email" class="form-control" placeholder="Email" v-model='credentials.email'>
            </div>
            <div class="form-group">
              <input type="password" class="form-control" placeholder="Password" v-model='credentials.password'>
            </div>
            <div class="form-group">
              <input type="password" class="form-control" placeholder="Confirm password" v-model='credentials.password_confirmation'>
            </div>
            <div class="form-group">
              <button type="button" class="btn btn-primary" @click='signUp' >Sign up</button>
              <router-link :to="{ name: 'Login' }" class="btn btn-success">Login</router-link>
            </div>
          </form>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import * as registrationRequests from '@/api/registration'

export default {
  name: 'registration',

  data: () => ({
    credentials: {
      email: '',
      password: '',
      password_confirmation: ''
    },
    errors: ''
  }),

  methods: {
    signUp() {
      registrationRequests.registrate({credentials: this.credentials}).then(resp => {
        this.$router.push({ name: 'Home' })
      }).catch(e => {
        this.errors = e.response.data.errors.join('\n')
      })
    }
  }
}
</script>
<style lang="scss" scoped>
.registration-form {
  background-color: rgba(255, 255, 255, 0.3);
}
</style>
