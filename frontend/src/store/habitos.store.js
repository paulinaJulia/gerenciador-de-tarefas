import { ref } from 'vue'
import Habito from '../models/habito'

const habito = ref({})
export default function useHabitos() {
  const habitos = ref([])
  const habitosDoDia = ref([])

  const getHabitosDoDia = (id) => {
    const hoje = new Date()

    const diaSemana = hoje.toLocaleDateString('pt-BR', { weekday: 'short' }).toLowerCase() // seg, ter, qua...
    const diaMes = hoje.getDate() // Número do dia no mês (1 a 31)

    getHabitosLocalStorage(id)
    habitosDoDia.value = habitos.value.filter((habito) => {
      if (habito.frequencia === 'diario') return true // Exibir todos os dias
      if (habito.frequencia === 'semanal') return habito.diasSemana.includes(diaSemana)
      if (habito.frequencia === 'mensal') return habito.diaMes === diaMes
      return false
    })
  }
  const getHabitosLocalStorage = (id) => {
    const habitosList = Habito.buscarTodos()

    if (habitosList.length === 0) {
      habitos.value = []
      return
    }
    habitos.value = habitosList.filter((habito) => habito.user_id === id)
  }
  const getHabitoLocalStorage = (id) => {
    const habitosList = Habito.buscarTodos()
    if (habitosList.length === 0) {
      habitos.value = []
      return
    }
    const habitoEcontrado = habitosList.find((task) => {
      console.log(task.id, id, 'encontrou')
      return task.id === id
    })
    habito.value = habitoEcontrado
  }
  const removeHabito = (habito) => {
    habitos.value = Habito.excluir(habito)
  }

  const concluirHabito = (task, id_user) => {
    Habito.alterarStatus(task)
    getHabitosDoDia(id_user)
  }

  const addNewItemHabitos = (obj) => {
    habitos.value.push(obj)
  }

  return {
    getHabitosLocalStorage,
    habitos,
    habito,
    habitosDoDia,
    removeHabito,
    concluirHabito,
    getHabitosDoDia,
    addNewItemHabitos,
    getHabitoLocalStorage,
  }
}
