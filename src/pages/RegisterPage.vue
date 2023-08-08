<template>
  <q-page padding>
    <q-form class="row justify-center" @submit.prevent="handleRegister">
      <p class="col-12 text-h5 text-center">Register</p>
      <div class="col-md-4 col-sm-6 col-xs-10 q-gutter-y-sm">
        <q-input label="name" v-model="form.name" />
        <q-input
          label="email"
          v-model="form.email"
          lazy-rules
          :rules="[(val) => (val && val.length > 0) || 'E-mail necessário']"
          type="email"
        />
        <q-input
          label="password"
          v-model="form.password"
          lazy-rules
          :rules="[
            (val) =>
              (val && val.length > 7) || 'Necessário maior que 7 caracteres',
          ]"
        />
        <div class="full-width q-pt-md q-gutter-y-sm">
          <q-btn
            label="register"
            color="primary"
            class="full-width"
            outline
            type="subimit"
          />
        </div>
        <q-btn
          label="voltar"
          color="blue"
          class="full-width"
          flat
          rounded
          :to="{ name: 'login' }"
        />
      </div>
    </q-form>
  </q-page>
</template>

<script>
import { defineComponent, ref } from "vue";
import useAuthUser from "src/composables/useAuthUser";
import useNotify from "src/composables/useNotify";
import { useRouter } from "vue-router";

export default defineComponent({
  name: "RegisterPage",

  setup() {
    const router = useRouter();

    const { register } = useAuthUser();
    const { notifyError, notifySucess } = useNotify();
    const form = ref({
      name: "",
      email: "",
      password: "",
    });
    const handleRegister = async () => {
      try {
        await register(form.value);
        notifySucess();
        router.push({
          name: "email-confirmation",
          query: { email: form.value.email },
        });
      } catch (error) {
        notifyError(error.message);
      }
    };
    return {
      form,
      handleRegister,
    };
  },
});
</script>
