<template>
  <div id="">
    <project v-for="project in projects" :key="project.id" :project="project"></project>
  </div>
</template>

<script>
import axios from 'axios'
import Project from './Project'

export default {
  name: 'home',

  data: () => ({
    projects: []
  }),

  beforeCreate() {
    axios.get(
      'http://localhost:3000/api/projects',
      { headers: this.$session.get('headers') }
    ).then(resp => {
      console.log(resp)
      this.set_auth_headers(resp)
      this.projects = resp.data
    }).catch(e => {
      this.set_auth_headers(e)
    })
  },

  methods: {
    set_auth_headers(resp) {
      if (resp.headers['access-token']) this.$session.set('headers', resp.headers)
    }
  },
  components: {
    Project
  }
}
</script>
<style lang="scss" scoped>

</style>
