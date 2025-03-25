<script setup>
import ListaTasks from '../components/ListaTasks.vue'
import ModalCriarTask from '../components/ModalCriarTask.vue'
import ModalCriarHabito from '../components/ModalCriarHabito.vue'
import ContainerInfo from '../components/ContainerInfo.vue'
import ListaVazia from '../components/ListaVazia.vue'
import { onMounted, ref, watch, provide } from 'vue'
import useTasks from '../store/tarefas.js'
import useHabitos from '../store/habitos.js'
import useUsuario from '../store/usuario'


const { getUsuarioLocalStorage, usuario } = useUsuario()

const tasks_criadas = ref(0)
const tasks_concluidas = ref(0)
const habitos_criados = ref(0)
const habitos_concluidos = ref(0)

const { tasks, task, getTasksLocalStorage, removeTask, concluir, addNewItemTasks } = useTasks()
const {
  habitos,
  habito,
  getHabitosDoDia,
  habitosDoDia,
  getHabitosLocalStorage,
  removeHabito,
  concluirHabito,
  addNewItemHabitos,
} = useHabitos()

const calcularConcluidas = () => {
  tasks_concluidas.value = tasks.value.filter((item) => item.concluida === true).length
}

const calcularHabitosConcluidos = () => {
  const hoje = new Date().toISOString().split('T')[0] // Formato YYYY-MM-DD

  habitos_concluidos.value = habitosDoDia.value.filter(
    (item) => item.concluida[hoje] === true,
  ).length
}

watch(
  () => [tasks.value],
  () => {
    tasks_criadas.value = tasks.value.length
    calcularConcluidas()
  },
  { deep: true },
)

watch(
  () => [habitos.value, habitosDoDia],
  () => {
    habitos_criados.value = habitosDoDia.value.length
    calcularHabitosConcluidos()
  },
  { deep: true },
)
const stateModalCriarTarefa = ref({ open: false })
const stateModalCriarHabito = ref({ open: false })
const openModal = () => {
  console.log('aqq')
  stateModalCriarTarefa.value.open = true
}
const closeModal = () => {
  stateModalCriarTarefa.value.open = false
}
provide('tasks', { tasks, addNewItemTasks, getTasksLocalStorage, concluir, removeTask, task })
provide('habitos', {
  habitos,
  habitosDoDia,
  habito,
  getHabitosLocalStorage,
  removeHabito,
  getHabitosDoDia,
  concluirHabito,
  addNewItemHabitos,
})
provide('openModal', openModal)
provide('closeModal', closeModal)

const calcularPorcentagem = () => {
  if (tasks_concluidas.value === 0) return 0
  const porc = (100 * tasks_concluidas.value) / tasks.value.length
  return porc
}
const modalCriarTask = ref({
  state: stateModalCriarTarefa.value,
})
provide('modalCriarTask', modalCriarTask)

const modalCriarHabito = ref({
  state: stateModalCriarHabito.value,
})

const openModalHabito = () => {
  stateModalCriarHabito.value.open = true
}
const closeModalHabito = () => {
  stateModalCriarHabito.value.open = false
}
provide('op_modal_habito', { closeModalHabito, openModalHabito })
provide('modalCriarHabito', modalCriarHabito)
provide('usuario_logado', usuario)

onMounted(() => {
  getUsuarioLocalStorage()
  getTasksLocalStorage(usuario.value?.id)
  getHabitosDoDia(usuario.value.id)
  getHabitosLocalStorage(usuario.value.id)

  tasks_criadas.value = tasks.value.length
  habitos_criados.value = habitos.value.length
})

const tab = ref('tarefas')

const columns = [
  { name: 'titulo', align: 'center', label: 'Hábito', field: 'titulo', sortable: true },
  { name: 'concluida', label: 'Dias concluidos', field: 'concluida', sortable: true },
]

const formatValues = (col) => {
  if (col.name !== 'concluida') return [col.value] // Retorna um array para manter a consistência

  return Object.keys(col?.value) || []
}
</script>

<template>
  <div class="max-h-full mt-20 overflow-hidden w-full flex flex-col items-center justify-center">
    <div class="mt-0 max-w-[56rem] w-max md:w-[95vw] pb-40 h-full">
      <q-tabs
        v-model="tab"
        dense
        class="text-gray-400 "
        active-color="primary"
        indicator-color="primary"
        align="justify"
        narrow-indicator
      >
        <q-tab name="tarefas" label="Tarefas" />
        <q-tab name="habitos" label="Hábitos" />
        <q-tab name="relatorios" label="Relatórios" />
      </q-tabs>

      <q-separator />

      <q-tab-panels v-model="tab" animated>
        <q-tab-panel name="tarefas">
          <ContainerInfo :tasks_concluidas="tasks_concluidas" :tasks_criadas="tasks_criadas" />
          <ListaTasks
            v-if="tasks_criadas > 0"
            modal-type="tarefas"
            :dados="tasks"
            :remover="removeTask"
            :concluir="concluir"
          />
          <ListaVazia v-else />
        </q-tab-panel>

        <q-tab-panel name="habitos" class="">
          <ContainerInfo :tasks_concluidas="habitos_concluidos" :tasks_criadas="habitos_criados" />
          <ListaTasks
            v-if="habitos_criados > 0"
            modal-type="habitos"
            :dados="habitosDoDia"
            :remover="removeHabito"
            :concluir="concluirHabito"
          />
          <ListaVazia v-else />
        </q-tab-panel>

        <q-tab-panel name="relatorios" class="flex flex-col gap-16">
          <div class="text-h6">Relatórios</div>
          <div class="w-full flex gap-20 items-center">
            <div class="flex flex-col gap-4">
              <q-card class="p-20">
                <p>Total de Tarefas</p>
                <span class="font-semibold text-2xl">{{ tasks_criadas }}</span>
              </q-card>
            </div>

            <div class="flex flex-col gap-16">
              <q-card class="p-20">
                <p>Total de Hábitos</p>
                <span class="font-semibold text-2xl">{{ habitos.length }}</span>
              </q-card>
            </div>
          </div>
          <div class="flex flex-col gap-4">
            <p class="text-lg font-medium">Tarefas Concluídas</p>
            <q-circular-progress
              show-value
              font-size="12px"
              :value="calcularPorcentagem()"
              size="50px"
              :thickness="0.22"
              color="primary-pure"
              track-color="grey-3"
              class="q-ma-md"
            >
              {{ calcularPorcentagem() + '%' }}
            </q-circular-progress>
          </div>
          <div class="flex gap-12 flex-col">
            <p class="text-lg font-medium">Hábitos</p>
            <q-table :rows="habitos" :columns="columns" row-key="name" grid hide-header>
              <template #item="props">
                <div class="q-pa-xs col-xs-12 col-sm-6 col-md-4 col-lg-3 grid-style-transition">
                  <q-card bordered flat>
                    <q-separator />
                    <q-list dense>
                      <q-item
                        v-for="col in props.cols.filter((col) => col.name !== 'desc')"
                        :key="col.name"
                      >
                        <q-item-section>
                          <q-item-label>{{ col.label }}</q-item-label>
                        </q-item-section>
                        <q-item-section side>
                          <q-item-label
                            caption
                            v-for="(item, index) in formatValues(col)"
                            :key="index"
                          >
                            {{ item }}
                          </q-item-label>
                        </q-item-section>
                      </q-item>
                    </q-list>
                  </q-card>
                </div>
              </template>
            </q-table>
          </div>
        </q-tab-panel>
      </q-tab-panels>

      <q-page-sticky position="bottom-right" :offset="[40, 40]">
        <q-fab icon="add" direction="up" color="primary-pure">
          <q-fab-action @click="openModal()" color="secondary" icon="add_task" label="Criar tarefa" />
          <q-fab-action
            @click="openModalHabito()"
            color="secondary"
            icon="loop"
            label="Criar hábito"
          />
        </q-fab>
      </q-page-sticky>
    </div>
  </div>
  <ModalCriarTask />
  <ModalCriarHabito />
</template>

<style scoped>
/* Scrollbar styles */

/* Firefox */
* {
  scrollbar-width: thin;
  scrollbar-color: #d9d9d9 #fff;
}

/* Chrome, Edge, and Safari */
*::-webkit-scrollbar {
  width: 8px;
}

*::-webkit-scrollbar-track {
  background: #d9d9d9;
  border-radius: 20px;
}

*::-webkit-scrollbar-thumb {
  background-color: #8284fa;

  border-radius: 20px;
  border: 3px solid #d9d9d9;
}

.logo {
  display: block;
  margin: 0 auto 2rem;
}

nav {
  width: 100%;
  font-size: 12px;
  text-align: center;
  margin-top: 2rem;
}

nav a.router-link-exact-active {
  color: var(--color-text);
}

nav a.router-link-exact-active:hover {
  background-color: transparent;
}

nav a {
  display: inline-block;
  padding: 0 1rem;
  border-left: 1px solid var(--color-border);
}

nav a:first-of-type {
  border: 0;
}

@media (min-width: 1024px) {
  header {
    display: flex;
    place-items: center;
    padding-right: calc(var(--section-gap) / 2);
  }

  .logo {
    margin: 0 2rem 0 0;
  }

  header .wrapper {
    display: flex;
    place-items: flex-start;
    flex-wrap: wrap;
  }

  nav {
    text-align: left;
    margin-left: -1rem;
    font-size: 1rem;

    padding: 1rem 0;
    margin-top: 1rem;
  }
}
</style>
