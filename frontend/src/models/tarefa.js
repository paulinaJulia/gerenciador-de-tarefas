class Tarefa {
  constructor({ id, titulo, descricao, prazo, prioridade, concluida, data_criacao, user }) {
    this.id = id || Date.now()
    this.titulo = titulo
    this.descricao = descricao
    this.prazo = prazo
    this.prioridade = prioridade
    this.concluida = concluida || false
    this.data_criacao = data_criacao || new Date().toISOString()
    this.user = user
  }

  static buscarTodas() {
    return JSON.parse(localStorage.getItem('tarefas')) || []
  }

  static buscarPorId(id) {
    return Tarefa.buscarTodas().find((tarefa) => tarefa.id === id)
  }

  static salvar(task) {
    const tarefas = Tarefa.buscarTodas()
    const index = tarefas.findIndex((item) => item.id === task.id)
    if (index >= 0) {
      tarefas.splice(index, 1, task)
    }
    localStorage.setItem('tarefas', JSON.stringify(tarefas))
  }

  static excluir(id) {
    const tarefas = Tarefa.buscarTodas().filter((t) => t.id !== id)
    localStorage.setItem('tarefas', JSON.stringify(tarefas))
    return tarefas
  }

  static alterarStatus(task) {
    this.salvar(task)
  }
}
export default Tarefa
