<template>
  <div class="q-pa-md q-gutter-sm">
    <q-dialog v-model="modalCriarTask.state.open" persistent>
      <q-card style="min-width: 350px">
        <q-card-section>
          <div v-if="visualizar" class="text-h6">{{ `Detalhes da  Tarefa - ${newTask.id}` }}</div>
          <div v-else class="text-h6">
            {{ edit ? `Editar Tarefa - ${newTask.id}` : 'Criar Tarefa' }}
          </div>
        </q-card-section>

        <q-card-section class="q-pt-none flex flex-col gap-12">
          <q-input :disable="visualizar" dense v-model="newTask.titulo" label="titulo" autofocus />
          <q-input
            :disable="visualizar"
            dense
            v-model="newTask.descricao"
            type="textarea"
            label="Descrição"
          />
          <q-input
            :disable="visualizar"
            filled
            v-model="newTask.prazo"
            mask="date"
            :rules="['date']"
            label="Prazo"
          >
            <template v-slot:append>
              <q-icon name="event" class="cursor-pointer">
                <q-popup-proxy cover transition-show="scale" transition-hide="scale">
                  <q-date v-model="newTask.prazo">
                    <div class="row items-center justify-end">
                      <q-btn v-close-popup label="Confirmar" color="primary" flat />
                    </div>
                  </q-date>
                </q-popup-proxy>
              </q-icon>
            </template>
          </q-input>
        </q-card-section>

        <q-card-actions align="right" class="text-primary">
          <q-btn flat label="Fechar" v-close-popup @click="fecharModal" />
          <q-btn
            v-if="!visualizar"
            flat
            :label="edit ? 'Editar Tarefa' : 'Criar Tarefa'"
            v-close-popup
            @click="submit()"
          />
        </q-card-actions>
      </q-card>
    </q-dialog>
  </div>
</template>

<script setup>
import { inject, watch, ref } from 'vue'
import { newTask, NEWTASKDEFAULT } from '../store/task.store.js'

const edit = ref(false)
const visualizar = ref(false)

const { addNewItemTasks, getTasksLocalStorage, task } = inject('tasks')
const modalCriarTask = inject('modalCriarTask')
const usuario = inject('usuario_logado')

watch(
  () => modalCriarTask.value.state.open,
  (v) => {
    if (v) {
      if (modalCriarTask.value.state?.modo === 'editar') {
        edit.value = true
        visualizar.value = false
        newTask.value = task.value
      } else if (modalCriarTask.value.state?.modo === 'visualizar') {
        edit.value = false
        visualizar.value = true
        newTask.value = task.value
      } else {
        edit.value = false
        visualizar.value = false
      }
    }
  },
  { deep: true },
)

const fecharModal = () => {
  edit.value = false
  visualizar.value = false
  newTask.value = NEWTASKDEFAULT
  task.value = {}
  modalCriarTask.value.state.modo = ''
}
const editar = (id) => {
  const tasksList = JSON.parse(localStorage.getItem('tarefas')) || []
  const tasksListRemovedItem = tasksList.filter((item) => item.id !== id)
  console.log(tasksListRemovedItem, tasksList)
  localStorage.setItem(
    'tarefas',
    JSON.stringify([
      ...tasksListRemovedItem,
      {
        id: id,
        descricao: newTask.value.descricao,
        titulo: newTask.value.titulo,
        concluida: newTask.value.conluida,
      },
    ]),
  )
  getTasksLocalStorage(usuario.value?.id)
  newTask.value = NEWTASKDEFAULT
  task.value = {}
}

const criar = () => {
  const tasksList = JSON.parse(localStorage.getItem('tarefas')) || []
  const taskCriar = {
    id: tasksList[tasksList.length - 1]?.id + 1 || 1,
    descricao: newTask.value.descricao,
    titulo: newTask.value.titulo,
    concluida: newTask.value.conluida,
    user_id: usuario.value.id,
    prazo: newTask.value.prazo,
    data_criacao: new Date().toISOString()
  }
  localStorage.setItem('tarefas', JSON.stringify([...tasksList, taskCriar]))
  addNewItemTasks(taskCriar)
  newTask.value = NEWTASKDEFAULT
}

const submit = () => {
  if (edit.value) {
    editar(task.value.id)
  } else {
    criar()
  }
}

</script>
