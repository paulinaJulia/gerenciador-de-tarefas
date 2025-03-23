<template>
  <q-input
    class="h-52"
    type="text"
    placeholder="Adicione uma nova tarefa"
    v-model="newTask.text"
  ></q-input>
</template>

<script setup>
import { inject } from 'vue'
const newTask = inject('newTask')
console.log(newTask)
</script>

<style lang="scss" scoped></style>
