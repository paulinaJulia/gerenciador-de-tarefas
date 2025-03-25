import { ref } from 'vue'

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
    const habitosList = localStorage.getItem('habitos') || []
    if (habitosList.length === 0) {
      habitos.value = []
      return
    }
    const todosHabitos = JSON.parse(habitosList)
    habitos.value = todosHabitos.filter((habito) => habito.user_id === id)
  }
  const getHabitoLocalStorage = (id) => {
    const habitosList = localStorage.getItem('habitos') || []
    if (habitosList.length === 0) {
      habitos.value = []
      return
    }
    const habitos = JSON.parse(habitosList)
    const habitoEcontrado = habitos.find((task) => {
      console.log(task.id, id, 'encontrou')
      return task.id === id
    })
    console.log(habitoEcontrado)
    habito.value = habitoEcontrado
  }
  const removeHabito = (task) => {
    habitos.value = habitos.value.filter((item) => item.id !== task.id)
    localStorage.setItem('habitos', JSON.stringify([...habitos.value]))
  }

  const concluirHabito = (task, id_user) => {
    const index = habitos.value.findIndex((item) => item.id === task.id)
    if (index >= 0) {
      const hoje = new Date().toISOString().split('T')[0] // Formato YYYY-MM-DD
      const atualizado = { ...habitos.value[index] }

      if (!atualizado.concluida) {
        atualizado.concluida = {}
      }

      // Alterna o status do hábito para o dia atual
      atualizado.concluida[hoje] = !atualizado.concluida[hoje]

      habitos.value.splice(index, 1, atualizado)
      console.log(atualizado)
      localStorage.setItem('habitos', JSON.stringify([...habitos.value]))
      getHabitosDoDia(id_user)
    }
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
