<template>
  <div class="flex flex-col p-24">
    <q-form class="flex flex-col gap-16">
      <q-input
        filled
        v-model="model.email"
        label="Email *"
        lazy-rules
        :rules="[(val) => (val && val.length > 0) || 'Campo obrigatório']"
      />

      <q-input
        filled
        v-model="model.nome"
        label="Nome *"
        lazy-rules
        :rules="[(val) => (val && val.length > 0) || 'Campo obrigatório']"
      />

      <q-input filled type="password" v-model="model.senha" label="Senha *" lazy-rules :rules="[(val) => (val && val.length > 0) || 'Campo obrigatório']"/>

      <div class="flex w-full gap-20 justify-between items-center">
        <q-btn label="Limpar" type="button" @click="reset()" color="secondary" flat />
        <q-btn label="Cadastrar" type="button" @click="criar()" color="primary" />
      </div>
    </q-form>
  </div>
</template>

<script setup>
import { ref } from 'vue'
import useUsuario from '../store/usuario'

const { addNewItemUsuarios } = useUsuario()

const model = ref({ email: '', senha: '', nome: '', data_criacao: '' })

const criar = () => {
  const usuariosList = JSON.parse(localStorage.getItem('usuarios')) || []
  localStorage.setItem(
    'usuarios',
    JSON.stringify([
      ...usuariosList,
      {
        id: usuariosList[usuariosList.length - 1]?.id + 1 || 1,
        nome: model.value.nome,
        email: model.value.email,
        senha: model.value.senha,
        data_criacao: model.value.data_criacao,
        logado: false,
      },
    ]),
  )
  console.log(model.value)
  addNewItemUsuarios({
    id: usuariosList[usuariosList.length - 1]?.id + 1 || 1,
    nome: model.value.nome,
    email: model.value.email,
    senha: model.value.senha,
    data_criacao: model.value.data_criacao,
    logado: false,
  })
  model.value = { email: '', senha: '', nome: '', data_criacao: '' }
}

const reset = () => {
  model.value = { email: '', senha: '', nome: '', data_criacao: '' }
}
</script>
