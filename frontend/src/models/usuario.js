class Usuario {
  constructor({ id, nome, email, senha, logado = false, data_criacao }) {
    this.id = id || Date.now()
    this.nome = nome
    this.email = email
    this.senha = senha
    this.logado = logado
    this.data_criacao = data_criacao || new Date().toISOString()
  }

  static buscarTodos() {
    return JSON.parse(localStorage.getItem('usuarios')) || []
  }

  static buscarPorId(id) {
    return Usuario.buscarTodos().find((usuario) => usuario.id === id)
  }

  static salvar(usuario) {
    const usuarios = Usuario.buscarTodos()
    const index = usuarios.findIndex((item) => item.id === usuario.id)
    if (index >= 0) {
      usuarios[index] = usuario
    } else {
      usuarios.push(usuario)
    }
    localStorage.setItem('usuarios', JSON.stringify(usuarios))
  }

  static excluir(id) {
    const usuarios = Usuario.buscarTodos().filter((usuario) => usuario.id !== id)
    localStorage.setItem('usuarios', JSON.stringify(usuarios))
    return usuarios
  }

  static login(email, senha) {
    const usuarios = Usuario.buscarTodos()
    const usuario = usuarios.find((u) => u.email === email && u.senha === senha)
    if (usuario) {
      usuarios.forEach((u) => (u.logado = false)) // Desloga todos
      usuario.logado = true
      localStorage.setItem('usuarios', JSON.stringify(usuarios))
      localStorage.setItem('userToken', 'meu-token-seguro')
      return usuario
    }
    return null
  }

  static logout() {
    const usuarios = Usuario.buscarTodos().map((usuario) => ({ ...usuario, logado: false }))
    localStorage.setItem('usuarios', JSON.stringify(usuarios))
    localStorage.removeItem('userToken')
  }
}

export default Usuario
