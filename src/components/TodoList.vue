<template>
    <el-row>
      <el-col :span="12" :offset="7" style="width: 100%">
        <h1>Codebrains Todos</h1>
        <TodoForm :submitTodo="createTodo"></TodoForm>
        <el-table :data="todos">
          <el-table-column prop="title" label="Title" width="350" />
          <el-table-column fixed="right" label="Operations" width="240">
            <template #default="scope">
              <el-space wrap>
              <el-switch
                v-model="scope.row.completed"
                @click="updateTodo(scope.row)"
              />

              <el-popconfirm
                confirm-button-text="Yes"
                cancel-button-text="No"
                icon="el-icon-info"
                icon-color="red"
                title="Are you sure to delete this?"
                @confirm="handleDelete(scope.row)"
                @cancel="cancelDelete"
              >
                <template #reference>
                  <el-button
                    size="default"
                    type="danger"
                    >Delete</el-button
                  >
                </template>
              </el-popconfirm>
              </el-space>
            </template>
          </el-table-column>
        </el-table>
      </el-col>
    </el-row>
</template>


<script lang="ts">

export default {
  name: 'TodoList',
  inheritAttrs: false,
  customOptions: {}
}
</script>

<script lang="ts" setup>
import { ref, onMounted } from "vue";
import { ElMessage } from "element-plus";
import TodoForm from './TodoForm.vue';
import axios from 'axios';

interface Todo {
  id?: number;
  title: string;
  completed: boolean;
}

const todos = ref([]);

onMounted(async () => {
    await loadTodos();
});

const loadTodos = async () => {
    const response = await axios.get(`http://localhost:8000/todos`);
    todos.value = response.data;
}
const createTodo = async (todo: Todo) => {
    console.log('From the child:', todo);
    await axios.post(`http://localhost:8000/todos`, {
      title: todo.title,
      completed: todo.completed,
    });
    ElMessage({
        message: "Todo Created",
        type: "success",
      });
    await loadTodos();
}
const updateTodo = async (todo: Todo) => {
    console.log('Update Todo', todo);
    await axios.put(`http://localhost:8000/todos/${todo.id}`, {
      title: todo.title,
      completed: todo.completed,
    });
    ElMessage({
        message: "Todo Updated",
        type: "success",
      });
    await loadTodos();
}
const handleDelete = async (todo: Todo) => {
    await axios.delete(`http://localhost:8000/todos/${todo.id}`);
    ElMessage({
        message: "Todo Deleted",
        type: "success",
      });
    await loadTodos();
}


const cancelDelete = () => {
    ElMessage({
        message: "Delete Cancelled",
        type: "info",
});
}


</script>