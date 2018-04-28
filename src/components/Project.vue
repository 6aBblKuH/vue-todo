<template>
  <div id="">
    <div class="container">
      <div class="row project-header">
        <div class="col-sm-1">
          <i class="fa fa-calendar"></i>
        </div>
        <div class="col-sm-8 project-title">
          <div class="" v-if="show_edit_name_block">
            <div class="input-group">
              <input type="text"
                class="form-control"
                :aria-describedby="'rename-project-' + project.id"
                :defaultValue='project.title'
                v-model='editedName'
                @keyup.enter='renameProject'>
              <div class="input-group-append">
                <span class="input-group-text rename-project-btn cursor-pointer"
                  :id="'rename-project-' + project.id"
                  @click='renameProject'>Rename</span>
              </div>
            </div>
          </div>
          <div class="" v-else>{{ project.title }}</div>
        </div>
        <div class="col-sm-3">
          <div class="row">
            <div class="col-sm-6">
              <i class="fa fa-pencil" @click="toggleEditNameBlock"></i>
            </div>
            <div class="col-sm-6">
              <i class="fa fa-trash" @click="deleteProject"></i>
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
              @keyup.esc='toggleEditNameBlock'
              @keyup.enter='addTodo'
              v-model='content'>
            <div class="input-group-append">
              <span class="input-group-text" :id="'create-todo-for-project-' + project.id" @click='addTodo'>Add todo</span>
            </div>
          </div>
        </div>
      </div>
      <div class="row todo-block">
        <draggable v-model="todos"
          @start="drag=true"
          @end="drag=false"
          class="col-sm-12"
          @change='sortTodos'
          :options="{ animation: 200 }">
          <todo v-for="todo in todos"
            :key="todo.id"
            :todo="todo"
            @delete-todo='deleteTodo'
            class='row'></todo>
        </draggable>
      </div>
    </div>
  </div>
</template>

<script>
import Todo from './Todo'
import * as projectRequests from '@/api/project'
import * as todoRequests from '@/api/todo'
import Draggable from 'vuedraggable'

export default {
  name: 'project',

  data: () => ({
    content: '',
    show_edit_name_block: false,
    editedName: '',
    todos: []
  }),

  methods: {
    addTodo() {
      if (!this.content) return false
      projectRequests.addTodo({project: this.project, content: this.content}).then(resp => {
        this.content = ''
        this.todos.push(resp.data)
      })
    },
    renameProject() {
      if (!this.editedName) return false
      projectRequests.renameProject({id: this.project.id, title: this.editedName}).then(resp => {
        this.project.title = resp.data.title
        this.toggleEditNameBlock()
      })
    },
    deleteProject() {
      projectRequests.deleteProject({id: this.project.id}).then(resp => {
        this.$emit('delete-project', this.project)
      })
    },
    deleteTodo(todo) {
      const todoIndex = this.todos.indexOf(todo)
      this.todos.splice(todoIndex, 1)
    },
    toggleEditNameBlock() {
      this.show_edit_name_block = !this.show_edit_name_block
    },
    sortTodos() {
      const sortedTodos = this.todos.map((todo, index) => {
        todo.order = ++index
        return { id: todo.id, order: todo.order }
      })
      todoRequests.sorting({projectId: this.project.id, todos: sortedTodos})
    }
  },

  mounted() {
    this.editedName = this.project.title
    this.todos = this.project.todos.sort((first, second) => first.order - second.order)
  },

  props: ['project'],

  components: {
    Todo,
    Draggable
  }
}
</script>
<style lang="scss" scoped>
.project-header {
  margin-top: 30px;
  padding: 15px 5px;
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
