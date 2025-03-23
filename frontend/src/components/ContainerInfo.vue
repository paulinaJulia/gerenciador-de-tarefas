<template>
  <div class="w-full pb-24 pt-52 sm:pb-12 flex gap-24 justify-between flex-wrap items-center">
    <div class="flex gap-8">
      <span class="text-secondary font-bold text-sm">Itens Criados</span>
      <span
        class="bg-gray-400 rounded-full flex py-2 px-8 flex-col justify-center items-center gap-10"
      >
        <span class="counter-text">{{ props.tasks_criadas }}</span></span
      >
    </div>
    <div class="flex gap-8">
      <span class="text-primary font-bold text-sm">Concluídos</span>

      <span
        class="bg-gray-400 rounded-full flex py-2 px-8 flex-col justify-center items-center gap-10"
      >
        <span class="counter-text">{{ concluidas }}</span></span
      >
    </div>
  </div>
</template>

<script setup>
import { computed } from 'vue'

const props = defineProps({
  tasks_concluidas: {
    type: Number,
    default: 0,
  },
  tasks_criadas: {
    type: Number,
    default: 0,
  },
})

const concluidas = computed(() => {
  if (props.tasks_concluidas === 0) return 0
  else return `${props.tasks_concluidas} de ${props.tasks_criadas}`
})
</script>

<style lang="css" scoped>
.counter-text {
  color: var(--gray-200, #d9d9d9);
  font-family: Inter, sans-serif;
  font-size: 12px;
  font-style: normal;
  font-weight: 700;
  line-height: normal;
}
</style>
