import { ref } from 'vue'

const NEWTASKDEFAULT = {
  id: '',
  titulo: '',
  descricao: '',
  prazo: '',
  data_criacao: '',
  user_id: '',
  prioridade: '',
  conluida: false,
}
const newTask = ref(NEWTASKDEFAULT)

export { NEWTASKDEFAULT, newTask }
