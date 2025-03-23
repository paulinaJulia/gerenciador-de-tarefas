<template>
  <div class="flex flex-col p-24">
    <q-form @submit="onSubmit" @reset="onReset" class="flex flex-col gap-16">
      <q-input
        filled
        v-model="model.email"
        label="Email *"
        lazy-rules
        :rules="[(val) => (val && val.length > 0) || 'Please type something']"
      />

      <q-input
        filled
        v-model="model.nome"
        label="Nome *"
        lazy-rules
        :rules="[(val) => (val && val.length > 0) || 'Please type something']"
      />

      <q-input filled type="password" v-model="model.senha" label="Senha *" lazy-rules />

      <div>
        <q-btn label="Submit" type="button" @click="criar()" color="primary" />
        <q-btn label="Reset" type="button" @click="reset()" color="primary" flat class="q-ml-sm" />
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
