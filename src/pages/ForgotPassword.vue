<template>
  <q-page padding>
    <q-form class="row justify-center" @submit.prevent="handleForgotPassword">
      <p class="col-12 text-h5 text-center">Solicitar nova senha</p>
      <div class="col-md-4 col-sm-6 col-xs-10 q-gutter-y-sm">
        <q-input label="email" v-model="email" />
        <div class="full-width q-pt-md q-gutter-y-sm">
          <q-btn
            label="avançar"
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

export default defineComponent({
  name: "ForgotPassWordPage",

  setup() {
    const { sendPasswordRestEmail } = useAuthUser();

    const email = ref("");

    const handleForgotPassword = async () => {
      await sendPasswordRestEmail(email.value);
      alert(`email enviado para: ${email.value}`);
    };
    return {
      email,
      handleForgotPassword,
    };
  },
});
</script>
