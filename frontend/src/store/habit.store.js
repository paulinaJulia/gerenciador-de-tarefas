import { ref } from 'vue'

const newHabit = ref({
  id: '',
  titulo: '',
  descricao: '',
  frequencia: 'diario',
  data_criacao: '',
  user_id: '',
  status: '',
  conluida: {},
})

export { newHabit }
