<template>
  <div
    class="flex pr-4 flex-col gap-12 overflow-y-auto overflow-x-hidden max-h-[300px] sm:max-h-[250px] sm:mb-40"
  >
    <ItemTask
      v-for="dado in dados"
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

