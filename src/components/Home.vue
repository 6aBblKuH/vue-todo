<template>
  <div id="">
    <header>
      <div class='container'>
        <div class="row">
          <div class="col-sm-8 offset-sm-1">
            <div class="input-group">
              <input type="text" class="form-control" placeholder="Start typing here to create a project..."
                aria-label="Start typing here to create a project..."
                aria-describedby="create-project"
                @keyup.enter='addProject'
                v-model='new_project_name'>
              <div class="input-group-append">
                <span class="input-group-text cursor-pointer btn-primary" id="create-project" @click='addProject'>
                  <i class="fa fa-plus"></i> Add project
                </span>
              </div>
            </div>
          </div>
          <div class="col-sm-2 offset-sm-1">
            <button type="button" class="btn btn-danger" @click='logOut'>
              Log Out
            </button>
          </div>
        </div>
      </div>
    </header>
    <project v-for="project in projects"
      :key="project.id"
      :project="project"
      @delete-project="deleteProject"></project>
  </div>
</template>

<script>
import Project from './Project'
import * as homeRequests from '@/api/home'

export default {
  name: 'home',

  data: () => ({
    projects: [],
    new_project_name: ''
  }),

  beforeCreate() {
    homeRequests.getProjects().then(resp => {
      this.projects = resp.data
    })
  },

  methods: {
    addProject() {
      homeRequests.addProject({title: this.new_project_name}).then(resp => {
        this.projects.push(resp.data)
        this.new_project_name = ''
      })
    },
    deleteProject(project) {
      const projectIndex = this.projects.indexOf(project)
      this.projects.splice(projectIndex, 1)
    },
    logOut() {
      localStorage.removeItem('headers')
      this.$router.push({ name: 'Login' })
    }
  },

  components: {
    Project
  }
}
</script>
<style lang="scss" scoped>
header {
  background-color: #4473b3;
  position: fixed;
  left: 0;
  right: 0;
  top: 0;
  z-index: 2;

  &:first-child {
    padding: 10px;
  }

  .fa-plus {
    margin-right: 5px;
  }
}
</style>
