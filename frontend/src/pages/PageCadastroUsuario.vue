<template>
  <div
    class="flex flex-col p-24 items-center justify-center gap-16 max-w-[40%] sm:max-w-full m-auto h-full overflow-hidden"
  >
    <img :src="logo" alt="Logo simply+" class="w-[200px] h-[200px]" />

    <q-form class="flex flex-col gap-16 w-full">
      <q-input
        filled
        class="w-full"
        v-model="model.email"
        label="Email *"
        lazy-rules
        :rules="[(val) => (val && val.length > 0) || 'Campo obrigatório']"
      />

      <q-input
        filled
        class="w-full"
        v-model="model.nome"
        label="Nome *"
        lazy-rules
        :rules="[(val) => (val && val.length > 0) || 'Campo obrigatório']"
      />

      <q-input
        class="w-full"
        filled
        type="password"
        v-model="model.senha"
        label="Senha *"
        lazy-rules
        :rules="[(val) => (val && val.length > 0) || 'Campo obrigatório']"
      />

      <div class="flex w-full gap-20 justify-between items-center">
        <a href="/login" class="underline text-primary-pure"> Entrar</a>

        <q-btn
          label="Cadastrar"
          type="button"
          @click="criar()"
          class="bg-primary-pure text-[#fff]"
        />
      </div>
    </q-form>
  </div>
</template>

<script setup>
import { ref } from 'vue'
import useUsuario from '../store/usuario.store'
import logo from '../../public/logo.png'
import { useRouter } from 'vue-router'

const router = useRouter()
const { addNewItemUsuarios } = useUsuario()

const model = ref({ email: '', senha: '', nome: '', data_criacao: '' })

const criar = () => {
  const usuariosList = JSON.parse(localStorage.getItem('usuarios')) || []
  const userExiste = usuariosList.find(
    (user) => user.senha === model.value.senha && user.email === model.value.email,
  )
  if (userExiste) return
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
  router.push({ name: 'login' })
}


</script>
