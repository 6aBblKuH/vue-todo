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
              <i class="fa fa-comment cursor-pointer" @click='openCommentsModal'></i>
              <b-modal ref="commentsModal" title="Add Comment" hide-footer>
                <div class="input-group">
                  <input type="text"
                    class="form-control"
                    aria-describedby='add-comment'
                    @keyup.enter='addComment'
                    v-model='comment'
                    placeholder='Enter Your Comment'>
                  <div class="input-group-append">
                    <span class="input-group-text btn btn-primary" id='add-comment' @click='addComment'>Add</span>
                  </div>
                </div>
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
    showEditTodoBlock: false,
    editedContent: '',
    comments: [],
    comment: ''
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
    addComment() {
      if (!this.comment) return false
      commentRequests.addComment({
        projectId: this.todo.project_id,
        todoId: this.todo.id,
        content: this.comment
      }).then(resp => {
        this.comments.push(resp.data)
        this.comment = ''
      })
    },
    deleteComment(comment) {
      const commentIndex = this.comments.indexOf(comment)
      this.comments.splice(commentIndex, 1)
    }
  },

  mounted() {
    this.editedContent = this.todo.content
    this.doneStatus = this.todo.is_done
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
