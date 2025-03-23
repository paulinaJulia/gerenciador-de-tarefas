import { ref } from 'vue'

const habito = ref({})
export default function useHabitos() {
  const habitos = ref([])
  const getHabitosLocalStorage = () => {
    const habitosList = localStorage.getItem('habitos') || []
    if (habitosList.length === 0) {
      habitos.value = []
      return
    }
    habitos.value = JSON.parse(habitosList)
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

  const concluirHabito = (task) => {
    const index = habitos.value.findIndex((item) => item.id === task.id)
    if (index >= 0) {
      habitos.value.splice(index, 1, task)
    }
    localStorage.setItem('habitos', JSON.stringify([...habitos.value]))
  }

  const addNewItemHabitos = (obj) => {
    habitos.value.push(obj)
  }

  return {
    getHabitosLocalStorage,
    habitos,
    habito,
    removeHabito,
    concluirHabito,
    addNewItemHabitos,
    getHabitoLocalStorage,
  }
}
