<template>
  <div class="comment row">
    <div class="col-sm-3">
      {{ comment.custom_created_at }}
    </div>
    <div class="col-sm-1 offset-sm-8">
      <i class="fa fa-trash cursor-pointer" @click='deleteComment'></i>
    </div>
    <div class="col-sm-12">
      {{ comment.content }}
    </div>
  </div>
</template>
<script>
import * as commentRequests from '@/api/comment'

export default {
  name: 'comment',

  props: ['comment', 'project-id'],

  data: () => ({

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
  }

}
</script>
<style lang="scss" scoped>
</style>
