<template>
  <div
    class="pr-4 items w-full !overflow-y-auto overflow-hidden max-h-[400px] sm:max-h-[400px] sm:mb-40"
  >
    <ItemTask
      v-for="dado in dados"
      class="mt-8"
      :key="dado.id"
      :task="dado"
      @click:excluir="remover(dado)"
      @click:concluir="concluir({ ...dado, concluida: !dado.concluida }, usuario.id)"
      :modal-type="modalType"
    >
      <template #texto>
        {{ dado.titulo }}
      </template>
    </ItemTask>
  </div>
</template>

<script setup>
import { inject, onMounted } from 'vue'
import ItemTask from './ItemTask.vue'
// Default SortableJS
import Sortable from 'sortablejs'

const usuario = inject('usuario_logado')
const { dados, remover, concluir, modalType } = defineProps({
  dados: { type: Object, default: () => {} },
  remover: { type: Function, default: () => {} },
  concluir: { type: Function, default: () => {} },
  modalType: { type: String, default: '' },
})

onMounted(() => {
  const elItems = document.querySelectorAll('.items')

  const options = {
    group: 'share',
    animation: 100,
  }

  ;['onEnd'].forEach(function (name) {
    options[name] = function (evt) {
      const valorAntigo = dados[evt.newIndex]
      const valorNovo = dados[evt.oldIndex]

      const dadosAtualizados = dados
      dadosAtualizados[evt.newIndex] = valorNovo

      dadosAtualizados[evt.oldIndex] = valorAntigo
      localStorage.setItem(modalType, JSON.stringify([...dadosAtualizados]))
    }
  })

  elItems.forEach((el) => {
    Sortable.create(el, options)
  })
})
</script>
