<template>
  <div>
    <div class="col-sm-12">
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
        <div class="col-sm-9 todo-content">
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
              {{ this.comments.length }}
              <i class="fa fa-comment cursor-pointer" @click='openCommentsModal'></i>
              <b-modal ref="commentsModal" title="Add Comment" hide-footer>
                <form @submit.prevent='addComment'>
                  <div class="form-group">
                    <input type="text"
                      class="form-control"
                      aria-describedby='add-comment'
                      v-model='comment'
                      name='content'
                      placeholder='Enter Your Comment'>
                  </div>
                  <div class="form-group">
                    <input type="file"
                      class="form-control"
                      ref='fileinput'
                      name='file'>
                  </div>
                  <div class="form-group">
                    <button class='btn btn-primary'>Save</button>
                    <button class='btn btn-danger' @click='resetComment'>Cancel</button>
                  </div>
                </form>
                <hr/>
                <comment v-for="comment in comments"
                  :key="comment.id"
                  :comment='comment'
                  :project-id='todo.project_id'
                  @delete-comment='deleteComment(comment)'></comment>
              </b-modal>
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
  </div>
</template>

<script>
import * as todoRequests from '@/api/todo'
import * as commentRequests from '@/api/comment'
import bModal from 'bootstrap-vue/es/components/modal/modal'
import bModalDirective from 'bootstrap-vue/es/directives/modal/modal'
import Comment from './Comment'

export default {
  name: 'todo',

  data: () => ({
    doneStatus: false,
    headers: null,
    showEditTodoBlock: false,
    editedContent: '',
    comments: [],
    comment: '',
    file: null
  }),

  beforeCreate() {
    commentRequests.getComments({
      projectId: this.$options.propsData.todo.project_id,
      todoId: this.$options.propsData.todo.id
    }).then(resp => {
      this.comments = resp.data
    })
  },

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
    },
    openCommentsModal() {
      this.$refs.commentsModal.show()
    },
    addComment(e) {
      if (!this.comment) return false
      let formData = new FormData()
      formData.append('content', this.comment)
      formData.append('file', this.$refs.fileinput.files[0])

      commentRequests.addComment({
        projectId: this.todo.project_id,
        todoId: this.todo.id,
        data: formData
      }).then(resp => {
        this.comments.push(resp.data)
        this.resetComment()
      })
    },
    deleteComment(comment) {
      const commentIndex = this.comments.indexOf(comment)
      this.comments.splice(commentIndex, 1)
    },
    resetComment() {
      this.comment = ''
      this.$refs.fileinput.value = null
    }
  },

  mounted() {
    this.editedContent = this.todo.content
    this.doneStatus = this.todo.is_done
    this.headers = JSON.parse(localStorage.getItem('headers'))
  },

  computed: {
    doneStyles: vm => ({ 'text-decoration': vm.doneStatus ? 'line-through' : 'none' })
  },

  components: {
    'b-modal': bModal,
    Comment
  },

  directives: {
    'b-modal': bModalDirective
  },

  props: ['todo']
}
</script>
<style lang="scss" scoped>
.todo {
  padding: 15px 10px 5px;
  background-color: #fff;
  border-bottom: 1px solid #cfcfcf;

  &-content {
    cursor: move;
  }
}
</style>
