import { ref } from 'vue'

const newHabit = ref({
  id: '',
  titulo: '',
  descricao: '',
  frequencia: '',
  data_criacao: '',
  user_id: '',
  status: '',
  conluida: false,
})

export { newHabit }
