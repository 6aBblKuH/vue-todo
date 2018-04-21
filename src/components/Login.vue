<template>
  <div id="">
    <div class='container auth-form'>
      <div class="row">
        <div class="col-8 offset-sm-2">
          <div class="h1 text-primary">Log in</div>
          <form @keyup.enter='logIn'>
            <div class="alert alert-danger" v-if="errors">
              {{ errors }}
            </div>
            <div class="form-group">
              <input type="email" class="form-control" id="email" placeholder="Email" v-model='credentials.email'>
            </div>
            <div class="form-group">
              <input type="password" class="form-control" id="password" placeholder="Password" v-model='credentials.password'>
            </div>
            <div class="form-group">
              <button type="button" class="btn btn-primary" @click='logIn' >Log In</button>
            </div>
          </form>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
import * as authRequests from '@/api/auth'

export default {
  name: 'login',
  data: () => ({
    credentials: {
      email: '',
      password: ''
    },
    errors: ''
  }),
  methods: {
    logIn() {
      authRequests.auth({credentials: this.credentials}).then(resp => {
        this.$router.push({ name: 'Home' })
      }).catch(e => {
        this.errors = e.response.data.errors.join('\n')
      })
    }
  }
}
</script>
<style lang="scss" scoped>
.auth-form {
  background-color: rgba(255, 255, 255, 0.3);
}
</style>
