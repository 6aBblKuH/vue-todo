<template>
  <div id="">
    <div class="row todo">
      <div class="col-sm-1">
        <form>
          <div class='checkbox-inline'>
            <label>
              <input type='checkbox' :value='todo.is_done'>
            </label>
          </div>
        </form>
      </div>
      <div class="col-sm-9">
        {{ todo.content }}
      </div>
      <div class="col-sm-2">
        <div class="row">
          <div class="col-sm-4">

          </div>
          <div class="col-sm-4">
            <i class="fa fa-pencil"></i>
          </div>
          <div class="col-sm-4">
            <i class="fa fa-trash"></i>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
export default {
  name: 'todo',
  data: () => ({

  }),
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
