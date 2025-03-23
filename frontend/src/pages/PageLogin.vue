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

      <q-input filled type="password" v-model="model.senha" label="Senha *" lazy-rules />

      <div>
        <q-btn
          label="Submit"
          type="button"
          @click="() => login(model.email, model.senha)"
          color="primary"
        />
        <q-btn label="Reset" type="reset" color="primary" flat class="q-ml-sm" />
      </div>
    </q-form>
  </div>
</template>

<script setup>
import { ref } from 'vue'
import useUsuario from '../store/usuario'

const { login } = useUsuario()
const model = ref({ email: '', senha: '' })
</script>
