<template>
  <q-page>
    <q-form class="row justify-center" @submit.prevent="handleLogin">
      <p class="col-12 text-h5 text-center">Login</p>
      <div class="col-md-4 col-sm-6 col-xs-10 q-gutter-y-sm">
        <q-input label="email" v-model="form.email" />
        <q-input label="password" v-model="form.password" />
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
import { useRouter } from "vue-router";

export default defineComponent({
  name: "PageLogin",

  setup() {
    const router = useRouter();
    const { login, isLoggedIn } = useAuthUser();

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
        router.push({ name: "me" });
      } catch (error) {
        alert(error.message);
      }
    };

    return {
      form,
      handleLogin,
    };
  },
});
</script>
