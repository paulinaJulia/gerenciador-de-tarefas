import { ref } from 'vue'
import { useRouter } from 'vue-router'
import Usuario from '../models/usuario'

const usuario = ref({})
export default function useUsuario() {
  const usuarios = ref([])
  const router = useRouter()

  const getUsuariosLocalStorage = () => {
    const usuariosList = Usuario.buscarTodos()
    if (usuariosList.length === 0) {
      usuarios.value = []
      return
    }
    usuarios.value = usuariosList
  }

  const getUsuarioLocalStorage = () => {
    const usuariosList = Usuario.buscarTodos()
    if (usuariosList.length === 0) {
      usuarios.value = []
      return
    }
    const usuarios = usuariosList
    const usuarioEncontrado = usuarios.find((usuario) => {
      return usuario.logado
    })
    usuario.value = new Usuario(usuarioEncontrado)
  }
  const removeUsuario = (usuario) => {
    Usuario.excluir(usuario.id)
  }

  const login = (email, senha) => {
    Usuario.login(email, senha)

    router.push({ name: 'home' })
  }

  const logout = () => {
    Usuario.logout()

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
