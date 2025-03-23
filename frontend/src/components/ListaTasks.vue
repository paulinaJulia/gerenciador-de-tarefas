<template>
  <div
    class="flex pr-4 flex-col gap-12 overflow-y-auto overflow-x-hidden max-h-[300px] sm:max-h-[250px] sm:mb-40"
  >
    <ItemTask
      v-for="task in tasks"
      :key="task.id"
      :task="task"
      @click:excluir="removeTask(task)"
      @click:concluir="concluir({ ...task, concluida: !task.concluida })"
    >
      <template #texto>
        {{ task.titulo }}
      </template>
    </ItemTask>
  </div>
</template>

<script setup>
import { inject } from 'vue'
import ItemTask from './ItemTask.vue'

const { tasks, concluir, removeTask } = inject('tasks')
</script>

<style lang="scss" scoped></style>
