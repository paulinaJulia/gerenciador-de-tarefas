import { ref } from 'vue'
import { useRouter } from 'vue-router'

const usuario = ref({})
export default function useUsuario() {
  const usuarios = ref([])
  const router = useRouter()
  const getUsuariosLocalStorage = () => {
    const usuariosList = localStorage.getItem('usuarios') || []
    if (usuariosList.length === 0) {
      usuarios.value = []
      return
    }

    usuarios.value = JSON.parse(usuariosList)
  }
  const getUsuarioLocalStorage = () => {
    const usuariosList = localStorage.getItem('usuarios') || []
    if (usuariosList.length === 0) {
      usuarios.value = []
      return
    }
    const usuarios = JSON.parse(usuariosList)
    const usuarioEncontrado = usuarios.find((usuario) => {
      console.log(usuario.logado, 'encontrou')
      return usuario.logado
    })
    console.log(usuarioEncontrado)
    usuario.value = usuarioEncontrado
  }
  const removeUsuario = (task) => {
    usuarios.value = usuarios.value.filter((item) => item.id !== task.id)
    localStorage.setItem('usuarios', JSON.stringify([...usuarios.value]))
  }

  const login = (email, senha) => {
    getUsuariosLocalStorage()
    const index = usuarios.value.findIndex((item) => item.email === email && item.senha === senha)
    if (index >= 0) {
      const atualizado = { ...usuarios.value[index], logado: true }
      usuarios.value = usuarios.value.map((usuario) => ({ ...usuario, logado: false }))
      usuarios.value.splice(index, 1, atualizado)
      console.log(atualizado)
      localStorage.setItem('usuarios', JSON.stringify([...usuarios.value]))
      localStorage.setItem('userToken', 'meu-token-seguro')

      router.push('/')
    }
  }

  const logout = () => {
    getUsuariosLocalStorage()

    usuarios.value = usuarios.value.map((usuario) => ({ ...usuario, logado: false }))

    localStorage.setItem('usuarios', JSON.stringify([...usuarios.value]))
    localStorage.removeItem('userToken') // Remove o token

    router.push('/login')
  }

  const addNewItemUsuarios = (obj) => {
    usuarios.value.push(obj)
  }

  return {
    getUsuariosLocalStorage,
    usuarios,
    usuario,
    removeUsuario,
    login,
    addNewItemUsuarios,
    getUsuarioLocalStorage,
    logout,
  }
}
