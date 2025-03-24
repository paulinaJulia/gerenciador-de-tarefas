<template>
  <div
    class=" pr-4  w-full  !overflow-y-auto overflow-hidden max-h-[400px] sm:max-h-[400px] sm:mb-40"
  >
    <ItemTask
      v-for="dado in dados"
      class="mt-8"
      :key="dado.id"
      :task="dado"
      @click:excluir="remover(dado)"
      @click:concluir="concluir({ ...dado, concluida: !dado.concluida })"
    :modal-type="modalType"
    >
      <template #texto>
        {{ dado.titulo }}
      </template>
    </ItemTask>
  </div>
</template>

<script setup>
import ItemTask from './ItemTask.vue'

const {dados, remover, concluir, modalType} = defineProps({
  dados: { type: Object, default: () => { } },
  remover: {type: Function, default: () => {}},
  concluir: { type: Function, default: () => { } },
  modalType: {type: String, default: ''}
})
</script>

