<template>
  <div id="">
    <div class="container">
      <div class="row project-header">
        <div class="col-sm-1">
          <i class="fa fa-calendar"></i>
        </div>
        <div class="col-sm-8 project-title">{{ project.title }}</div>
        <div class="col-sm-3">
          <div class="row">
            <div class="col-sm-6">
              <i class="fa fa-pencil"></i>
            </div>
            <div class="col-sm-6">
              <i class="fa fa-trash"></i>
            </div>
          </div>
        </div>
      </div>
      <div class="row create-todo">
        <div class="col-sm-1">
          <i class="fa fa-plus"></i>
        </div>
        <div class="col-sm-11">
          <div class="input-group">
            <input type="text" class="form-control" placeholder="Start typing here to create a task..."
              aria-label="Start typing here to create a task..."
              :aria-describedby="'create-todo-for-project-' + project.id"
              v-model='content'>
            <div class="input-group-append">
              <span class="input-group-text" :id="'create-todo-for-project-' + project.id" @click='add_todo'>Add todo</span>
            </div>
          </div>
        </div>
      </div>
      <div class="row todo-block">
        <todo v-for="todo in project.todos" :key="todo.id" :todo="todo" class="col-sm-12"></todo>
      </div>
    </div>
  </div>
</template>

<script>
// import axios from 'axios'
import Todo from './Todo'

export default {
  name: 'project',

  data: () => ({
    content: ''
  }),
  methods: {
    set_auth_headers(resp) {
      if (resp.headers['access-token']) this.$session.set('headers', resp.headers)
    },
    add_todo() {
      // axios.post()
      console.log(this.project.id)
    }
  },
  props: ['project'],
  components: {
    Todo
  }
}
</script>
<style lang="scss" scoped>
.project-header {
  margin-top: 30px;
  padding: 5px;
  background-color: #4473b3;

  .project-title {
    font-size: 20px;
    color: #fff;
    font-weight: 600;
    text-align: left;
  }

  .fa-calendar, .fa-pencil, .fa-trash {
    padding-top: 5px;
    font-size: 18px;
    cursor: pointer;

    &:hover {
      color: #fff;
    }
  }

  .fa-calendar {
    padding-left: 10px;
  }
}

.create-todo {
  padding: 10px;
  background-color: #cfcfcf;

  .fa-plus {
    padding-top: 7px;
    font-size: 26px;
  }

  .input-group-text {
    cursor: pointer;
  }
}

</style>
