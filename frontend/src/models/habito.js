class Habito {
  constructor({ id, titulo, descricao, frequencia, prioridade, concluida, data_criacao, user }) {
    this.id = id || Date.now()
    this.titulo = titulo
    this.descricao = descricao
    this.frequencia = frequencia
    this.prioridade = prioridade
    this.concluida = concluida || false
    this.data_criacao = data_criacao || new Date().toISOString()
    this.user = user
  }

  static buscarTodos() {
    return JSON.parse(localStorage.getItem('habitos')) || []
  }

  static buscarPorId(id) {
    return Habito.buscarTodos().find((habito) => habito.id === id)
  }

  static salvar(task) {
    const habitos = Habito.buscarTodos()
    const index = habitos.findIndex((item) => item.id === task.id)
    if (index >= 0) {
      const hoje = new Date().toISOString().split('T')[0]
      const atualizado = { ...habitos[index] }

      if (!atualizado.concluida) {
        atualizado.concluida = {}
      }

      atualizado.concluida[hoje] = !atualizado.concluida[hoje]

      habitos.splice(index, 1, atualizado)
      console.log(atualizado)
      localStorage.setItem('habitos', JSON.stringify([...habitos]))
    }
  }

  static excluir(id) {
    const habitos = Habito.buscarTodos().filter((t) => t.id !== id)
    localStorage.setItem('habitos', JSON.stringify(habitos))
    return habitos
  }

  static alterarStatus(habito) {
    this.salvar(habito)
  }
}
export default Habito
