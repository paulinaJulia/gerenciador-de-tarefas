<template>
  <div class="q-pa-md q-gutter-sm">
    <q-dialog v-model="modalCriarHabito.state.open" persistent>
      <q-card style="min-width: 350px">
        <q-card-section>
          <div v-if="visualizar" class="text-h6">{{ `Detalhes da  Hábito - ${newHabit.id}` }}</div>
          <div v-else class="text-h6">
            {{ edit ? `Editar Hábito - ${newHabit.id}` : 'Criar Hábito' }}
          </div>
        </q-card-section>

        <q-card-section class="q-pt-none flex flex-col gap-12">
          <q-input :disable="visualizar" dense v-model="newHabit.titulo" label="titulo" autofocus />
          <q-input
            :disable="visualizar"
            dense
            v-model="newHabit.descricao"
            type="textarea"
            label="Descrição"
          />

          <q-select
            emit-value
            map-options
            v-model="newHabit.frequencia"
            :options="options"
            label="Frequência"
          />
        </q-card-section>

        <q-card-actions align="right" class="text-primary">
          <q-btn flat label="Fechar" v-close-popup @click="fecharModal" />
          <q-btn
            v-if="!visualizar"
            flat
            :label="edit ? 'Editar Hábito' : 'Criar Hábito'"
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
import { newHabit } from '../store/habit.store.js'

const edit = ref(false)
const visualizar = ref(false)
const { addNewItemHabitos, getHabitosLocalStorage, habito, getHabitosDoDia } = inject('habitos')
const usuario = inject('usuario_logado')
const modalCriarHabito = inject('modalCriarHabito')
const options = ref([
  { value: 'diario', label: 'Diário' },
  // { value: 'semanal', label: 'Semanal' },
  { value: 'mensal', label: 'Mensal' },
])
watch(
  () => modalCriarHabito.value.state.open,
  (v) => {
    if (v) {
      if (modalCriarHabito.value.state?.modo === 'editar') {
        edit.value = true
        visualizar.value = false
        newHabit.value = habito.value
      } else if (modalCriarHabito.value.state?.modo === 'visualizar') {
        edit.value = false
        visualizar.value = true
        newHabit.value = habito.value
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
  newHabit.value = { id: '', text: '', conluida: false }
  habito.value = {}
  modalCriarHabito.value.state.modo = ''
}
const editar = (id) => {
  const habitosList = JSON.parse(localStorage.getItem('habitos')) || []
  const habitosListRemovedItem = habitosList.filter((item) => item.id !== id)
  localStorage.setItem(
    'habitos',
    JSON.stringify([
      ...habitosListRemovedItem,
      {
        id: id,
        descricao: newHabit.value.descricao,
        titulo: newHabit.value.titulo,
        concluida: newHabit.value.conluida,
      },
    ]),
  )
  getHabitosLocalStorage(usuario.value.id)
  newHabit.value = { id: '', text: '', conluida: false }
  habito.value = {}
}

const criar = () => {
  const habitosList = JSON.parse(localStorage.getItem('habitos')) || []
  localStorage.setItem(
    'habitos',
    JSON.stringify([
      ...habitosList,
      {
        id: habitosList[habitosList.length - 1]?.id + 1 || 1,
        descricao: newHabit.value.descricao,
        titulo: newHabit.value.titulo,
        diasSemana:
          newHabit.value.frequencia === 'semanal'
            ? ['seg.', 'ter.', 'qua.', 'qui.', 'sex.', 'sab.', 'dom.']
            : null,
        diaMes: newHabit.value.frequencia === 'mensal' ? 26 : null,
        concluida: {},
        frequencia: newHabit.value.frequencia,
        user_id: usuario.value.id,
      },
    ]),
  )
  addNewItemHabitos({
    id: habitosList[habitosList.length - 1]?.id + 1 || 1,
    descricao: newHabit.value.descricao,
    titulo: newHabit.value.titulo,
    diasSemana:
      newHabit.value.frequencia === 'semanal'
        ? ['seg.', 'ter.', 'qua.', 'qui.', 'sex.', 'sab.', 'dom.']
        : null,
    diaMes: newHabit.value.frequencia === 'mensal' ? 26 : null,
    concluida: {},
    frequencia: newHabit.value.frequencia,
    user_id: usuario.value.id,
  })
  getHabitosDoDia(usuario.value.id)
  newHabit.value = {
    id: '',
    titulo: '',
    descricao: '',
    frequencia: '',
    data_criacao: '',
    user_id: '',
    status: '',
    conluida: {},
  }
}

const submit = () => {
  if (edit.value) {
    editar(habito.value.id)
  } else {
    criar()
  }
}
</script>
