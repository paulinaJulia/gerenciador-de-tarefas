<script setup>
// import ContainerCreateTask from '../components/ContainerCreateTask.vue'
import ListaTasks from '../components/ListaTasks.vue'
import ModalCriarTask from '../components/ModalCriarTask.vue'
// import ModalVisualizarTask from '../components/ModalVisualizarTask.vue'
import ContainerInfo from '../components/ContainerInfo.vue'
import ListaVazia from '../components/ListaVazia.vue'
import { onMounted, ref, watch, provide } from 'vue'
import useTasks from '../store/tarefas.js'
const tasks_criadas = ref(0)
const tasks_concluidas = ref(0)

const { tasks, task, getTasksLocalStorage, removeTask, concluir, addNewItemTasks } = useTasks()

const calcularConcluidas = () => {
  tasks_concluidas.value = tasks.value.filter((item) => item.concluida === true).length
}

watch(
  () => [tasks.value],
  () => {
    tasks_criadas.value = tasks.value.length
    calcularConcluidas()
  },
  { deep: true },
)
const stateModalCriarTarefa = ref({ open: false })
const openModal = () => {
  stateModalCriarTarefa.value.open = true
}
const closeModal = () => {
  stateModalCriarTarefa.value.open = false
}
provide('tasks', { tasks, addNewItemTasks, getTasksLocalStorage, concluir, removeTask, task })
provide('openModal', openModal)
provide('closeModal', closeModal)
const modalCriarTask = ref({
  state: stateModalCriarTarefa.value,
})
provide('modalCriarTask', modalCriarTask)

const modalVisualizarTask = ref({
  state: stateModalCriarTarefa.value,
})
provide('modalVisualizarTask', modalVisualizarTask)
const onClick = () => {
  console.log('clicou')
}
onMounted(() => {
  getTasksLocalStorage()

  tasks_criadas.value = tasks.value.length
})

const tab = ref('tarefas')
</script>

<template>
  <div class="max-h-screen mt-20 overflow-hidden w-full flex flex-col items-center justify-center">
    <div class="mt-0 max-w-[56rem] w-max md:w-[95vw] pb-40">
      <q-tabs
        v-model="tab"
        dense
        class="text-grey"
        active-color="primary"
        indicator-color="primary"
        align="justify"
        narrow-indicator
      >
        <q-tab name="tarefas" label="Tarefas" />
        <q-tab name="alarms" label="Alarms" />
        <q-tab name="movies" label="Movies" />
      </q-tabs>

      <q-separator />

      <q-tab-panels v-model="tab" animated>
        <q-tab-panel name="tarefas">
          <ContainerInfo :tasks_concluidas="tasks_concluidas" :tasks_criadas="tasks_criadas" />
          <ListaTasks v-if="tasks_criadas > 0" />
          <ListaVazia v-else />
        </q-tab-panel>

        <q-tab-panel name="alarms">
          <div class="text-h6">Alarms</div>
          Lorem ipsum dolor sit amet consectetur adipisicing elit.
        </q-tab-panel>

        <q-tab-panel name="movies">
          <div class="text-h6">Movies</div>
          Lorem ipsum dolor sit amet consectetur adipisicing elit.
        </q-tab-panel>
      </q-tab-panels>

      <q-page-sticky position="bottom-right" :offset="[40, 40]">
        <q-fab icon="add" direction="up" color="accent">
          <q-fab-action @click="openModal" color="primary" icon="add_task" label="Criar tarefa" />
          <q-fab-action @click="onClick" color="primary" icon="loop" label="Criar hábito" />
        </q-fab>
      </q-page-sticky>
    </div>
  </div>
  <ModalCriarTask />
</template>

<style scoped>
/* Scrollbar styles */

/* Firefox */
* {
  scrollbar-width: thin;
  scrollbar-color: #d9d9d9 #8284fa;
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
