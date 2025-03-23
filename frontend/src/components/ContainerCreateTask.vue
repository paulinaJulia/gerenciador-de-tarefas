<template>
  <div class="gap-16 m-auto flex flex-wrap items-center justify-center">
    <InputTask :value="newTask" />
    <ButtonCreateTask @click:criar="criar()" :disabled="!disabled" />
  </div>
</template>

<script setup>
import InputTask from './InputTask.vue'
import ButtonCreateTask from './ButtonCreateTask.vue'
import { newTask } from '../store/task.store.js'
import { inject, onMounted, ref, watch, provide } from 'vue'
const { addNewItemTasks } = inject('tasks')

// const newTask = ref({ id: '', text: '', titulo: '', conluida: false })
const disabled = ref(false)
watch(
  () => [newTask.value],
  () => {
    if (newTask.value.text === '') {
      disabled.value = false
    } else {
      disabled.value = true
    }
  },
  { deep: true },
)

const criar = () => {
  if (newTask.value.text === '') return
  const tasksList = JSON.parse(localStorage.getItem('tasks')) || []
  localStorage.setItem(
    'tasks',
    JSON.stringify([
      ...tasksList,
      {
        id: tasksList[tasksList.length - 1]?.id + 1 || 1,
        text: newTask.value.text,
        concluida: newTask.value.conluida,
      },
    ]),
  )
  console.log(newTask.value)
  addNewItemTasks({
    id: tasksList[tasksList.length - 1]?.id + 1 || 1,
    text: newTask.value.text,
    concluida: newTask.value.conluida,
  })
  newTask.value = { id: '', text: '', conluida: false }
}

const handleClickEnter = () => {
  const input = document.querySelector('.input')
  if (input) {
    input.addEventListener('keypress', (event) => {
      if (event.key === 'Enter') {
        criar()
      }
    })
  }
}

onMounted(() => [handleClickEnter()])
provide('newTask', newTask)
</script>

<style lang="scss" scoped></style>
