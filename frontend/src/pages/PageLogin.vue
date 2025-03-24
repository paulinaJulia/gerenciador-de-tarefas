<template>
  <div
    class="flex flex-col p-24 items-center justify-center gap-16 max-w-[40%] sm:max-w-full m-auto overflow-hidden"
  >
    <q-form
      @submit="onSubmit"
      @reset="onReset"
      class="flex flex-col w-full justify-center items-center"
    >
      <img :src="logo" alt="Logo simply+" class="w-[200px] h-[200px]" />
      <q-input
        filled
        v-model="model.email"
        label="Email *"
        class="w-full"
        lazy-rules
        :rules="[(val) => (val && val.length > 0) || 'Please type something']"
      />

      <q-input
        class="w-full"
        filled
        type="password"
        v-model="model.senha"
        label="Senha *"
        lazy-rules
      />

      <div class="w-full flex justify-between mt-32">
        <a href="/cadastrar" class="underline text-primary-pure"> Cadastre-se</a>

        <q-btn
          label="Entrar"
          type="button"
          @click="() => login(model.email, model.senha)"
          class="bg-primary-pure text-[#fff]"
        />
      </div>
    </q-form>
  </div>
</template>

<script setup>
import { ref } from 'vue'
import useUsuario from '../store/usuario'

import logo from '../../public/logo.png'
const { login } = useUsuario()
const model = ref({ email: '', senha: '' })
</script>
