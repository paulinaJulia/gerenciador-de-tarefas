import { ref } from 'vue'

const newTask = ref({
  id: '',
  titulo: '',
  descricao: '',
  prazo: '',
  data_criacao: '',
  user_id: '',
  status: '',
  prioridade: '',
  text: '',
  conluida: false,
})

export { newTask }
