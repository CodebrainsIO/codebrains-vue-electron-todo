<template>
  <el-form
    :model="todoForm"
    :inline="true"
    class="demo-form-inline"
  >
    <el-form-item label="Title" prop="title">
      <el-input v-model="todoForm.title" placeholder="Enter Todo"></el-input>
    </el-form-item>
    <el-form-item>
      <el-button type="primary" @click="submitForm">Add</el-button>
    </el-form-item>
  </el-form>
</template>

<script lang="ts">
// executed only once
export const componentName = 'TodoForm';

export default {
  name: 'TodoForm',
  inheritAttrs: false,
  customOptions: {}
}
</script>
<script lang="ts" setup>
import { reactive, ref, defineProps } from "vue";
import { ElMessage } from 'element-plus'
import type { FormInstance } from "element-plus";

const props = defineProps(['submitTodo']);
const todoForm = reactive({
  title: "",
});


const submitForm = () => {
  console.log('Title', todoForm.title);
  if (todoForm.title.length > 3) {
    props.submitTodo({ title: todoForm.title, completed: false });
    todoForm.title = "";
  } else {
    ElMessage.error('Title must be at least 3 characters long.');
  }
}

</script>
