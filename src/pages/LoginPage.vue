<template>
  <q-page>
    <q-form class="row justify-center" @submit.prevent="handleLogin">
      <p class="col-12 text-h5 text-center">Login</p>
      <div class="col-md-4 col-sm-6 col-xs-10 q-gutter-y-sm">
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
          :rules="[(val) => (val && val.length > 0) || 'Senha necessária']"
        />
        <div class="full-width q-pt-md">
          <q-btn
            label="login"
            color="primary"
            class="full-width"
            outline
            type="subimit"
          />
        </div>
        <div class="full-width">
          <q-btn
            label="register"
            color="primary"
            class="full-width"
            to="/register"
          />
        </div>
        <q-btn
          label="esqueceu sua senha"
          color="blue"
          class="full-width"
          flat
          rounded
          :to="{ name: 'forgot-password' }"
        />
      </div>
    </q-form>
  </q-page>
</template>
<script>
import { defineComponent, ref, onMounted } from "vue";
import useAuthUser from "src/composables/useAuthUser";
import useNotify from "src/composables/useNotify";
import { useRouter } from "vue-router";

export default defineComponent({
  name: "PageLogin",

  setup() {
    const router = useRouter();

    const { login, isLoggedIn } = useAuthUser();

    const { notifySucess, notifyError } = useNotify();

    const form = ref({
      email: "",
      password: "",
    });

    onMounted(() => {
      if (isLoggedIn) {
        router.push({ name: "me" });
      }
    });

    const handleLogin = async () => {
      try {
        await login(form.value);
        notifySucess("Login realizado");
        router.push({ name: "me" });
      } catch (error) {
        notifyError(error.message);
        // alert(error.message);
      }
    };

    return {
      form,
      handleLogin,
    };
  },
});
</script>
