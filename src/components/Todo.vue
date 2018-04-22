<template>
  <div id="">
    <div class="row todo">
      <div class="col-sm-1">
        <form>
          <div class='checkbox-inline'>
            <label>
              <input type='checkbox' v-model='doneStatus' @click='changeDoneStatus'>
            </label>
          </div>
        </form>
      </div>
      <div class="col-sm-9">
        <div class="input-group" v-if="showEditTodoBlock">
          <input type="text" class="form-control"
            :aria-describedby="'edit-todo-' + todo.id"
            @keyup.esc='toggleEditTodoBlock'
            @keyup.enter='editTodoContent'
            v-model='editedContent'>
          <div class="input-group-append">
            <span class="input-group-text" :id="'edit-todo-' + todo.id" @click='editTodoContent'>Edit todo</span>
          </div>
        </div>
        <span :style="doneStyles" v-else>{{ todo.content }}</span>
      </div>
      <div class="col-sm-2">
        <div class="row">
          <div class="col-sm-4">

          </div>
          <div class="col-sm-4">
            <i class="fa fa-pencil cursor-pointer" @click='toggleEditTodoBlock'></i>
          </div>
          <div class="col-sm-4">
            <i class="fa fa-trash cursor-pointer" @click='deleteTodo'></i>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import * as todoRequests from '@/api/todo'

export default {
  name: 'todo',

  data: () => ({
    doneStatus: false,
    showEditTodoBlock: false,
    editedContent: ''
  }),

  methods: {
    changeDoneStatus() {
      todoRequests.changeDoneStatus({
        projectId: this.todo.project_id,
        todoId: this.todo.id,
        doneStatus: !this.doneStatus
      })
    },
    editTodoContent() {
      if (!this.editedContent) return false
      todoRequests.editTodoContent({
        projectId: this.todo.project_id,
        todoId: this.todo.id,
        content: this.editedContent
      }).then(resp => {
        this.todo.content = resp.data.content
        this.toggleEditTodoBlock()
      })
    },
    deleteTodo() {
      todoRequests.deleteTodo({projectId: this.todo.project_id, todoId: this.todo.id}).then(resp => {
        this.$emit('delete-todo', this.todo)
      })
    },
    toggleEditTodoBlock() {
      this.showEditTodoBlock = !this.showEditTodoBlock
    }
  },

  mounted() {
    this.editedContent = this.todo.content
    this.doneStatus = this.todo.is_done
  },

  computed: {
    doneStyles: vm => ({ 'text-decoration': vm.doneStatus ? 'line-through' : 'none' })
  },

  props: ['todo']
}
</script>
<style lang="scss" scoped>
.todo {
  padding: 15px 10px 5px;
  background-color: #fff;
  border-bottom: 1px solid #cfcfcf;
}
</style>
