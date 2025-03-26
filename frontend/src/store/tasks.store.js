import { ref } from 'vue'
import Tarefa from '../models/tarefa.js'

const task = ref({})
export default function useTasks() {
  const tasks = ref([])
  const getTasksLocalStorage = (id) => {
    const tasksList = Tarefa.buscarTodas()
    tasks.value = tasksList.filter((task) => task.user_id === id)
  }
  const getTaskLocalStorage = (id) => {
    const tasksList = Tarefa.buscarTodas()
    const taskEcontrada = tasksList.find((task) => {
      return task.id === id
    })
    task.value = new Tarefa(taskEcontrada)
  }
  const removeTask = (task) => {
    tasks.value = Tarefa.excluir(task.id)
  }

  const concluir = (task) => {
    Tarefa.alterarStatus(task)
    getTasksLocalStorage(task.user_id)
  }

  const addNewItemTasks = (obj) => {
    tasks.value.push(obj)
  }

  return {
    getTasksLocalStorage,
    tasks,
    task,
    removeTask,
    concluir,
    addNewItemTasks,
    getTaskLocalStorage,
  }
}
