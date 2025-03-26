<template>
  <div
    class="flex flex-col p-24 items-center justify-center gap-16 max-w-[40%] sm:max-w-full m-auto h-full overflow-hidden"
  >
    <q-form class="flex flex-col gap-16 w-full mt-20">
      <h3 class="text-h6 font-medium">Editar Perfil</h3>
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

      <div class="flex w-full gap-20 justify-end items-center">
        <q-btn label="Editar" type="button" @click="editar()" class="bg-primary-pure text-[#fff]" />
      </div>
    </q-form>
  </div>
</template>

<script setup>
import { ref, onMounted } from 'vue'
import useUsuario from '../store/usuario.store'

const { getUsuariosLocalStorage, usuario, getUsuarioLocalStorage } = useUsuario()
const model = ref(usuario)

const editar = () => {
  let usuariosList = JSON.parse(localStorage.getItem('usuarios')) || []
  const userExiste = usuariosList.findIndex(
    (user) => user.senha === model.value.senha && user.email === model.value.email,
  )
  if (userExiste) {
    usuariosList[userExiste] = {
      ...usuariosList[userExiste],
      nome: model.value.nome,
      email: model.value.email,
      senha: model.value.senha,
    }
    localStorage.setItem('usuarios', JSON.stringify([...usuariosList]))

    console.log(model.value)
    getUsuariosLocalStorage()
  }
  // model.value = { email: '', senha: '', nome: '', data_criacao: '' }
}

onMounted(() => {
  getUsuarioLocalStorage()
})
</script>
