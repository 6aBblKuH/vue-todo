<template>
  <div class="comment row">
    <div class="col-sm-3">
      {{ comment.custom_created_at }}
    </div>
    <div class="col-sm-1 offset-sm-8">
      <i class="fa fa-trash cursor-pointer" @click='deleteComment'></i>
    </div>
    <div class="col-sm-12">
      <div class="row">
        <div class="col-sm-8">
          {{ comment.content }}
        </div>
        <div class="col-sm-2" v-if="comment.file.url">
          <a :href="fileURL" download class="btn btn-primary btn-sm">Download file</a>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
import * as commentRequests from '@/api/comment'

export default {
  name: 'comment',

  props: ['comment', 'project-id'],

  data: () => ({
    fileURL: ''
  }),

  methods: {
    deleteComment() {
      commentRequests.deleteComment({
        projectId: this.project_id,
        todoId: this.comment.todo_id,
        commentId: this.comment.id
      }).then(resp => {
        this.$emit('delete-comment', this.comment)
      })
    }
  },

  mounted() {
    const baseURL = process.env.NODE_ENV === 'production' ? 'https://todosio.herokuapp.com/' : 'http://localhost:3000/'
    this.fileURL = baseURL + this.comment.file.url
  }

}
</script>
<style lang="scss" scoped>
</style>
