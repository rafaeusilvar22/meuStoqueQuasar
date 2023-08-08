<template>
  <q-page padding>
    <q-form class="row justify-center" @submit.prevent="handlePasswordReset">
      <p class="col-12 text-h5 text-center">nova senha:</p>
      <div class="col-md-4 col-sm-6 col-xs-10 q-gutter-y-sm">
        <q-input label="new password" v-model="password" />
        <div class="full-width q-pt-md q-gutter-y-sm">
          <q-btn
            label="avançar"
            color="primary"
            class="full-width"
            outline
            type="subimit"
          />
        </div>
      </div>
    </q-form>
  </q-page>
</template>
<script>
import { defineComponent, ref, onMounted } from "vue";
import useAuthUser from "src/composables/useAuthUser";
import useNotify from "src/composables/useNotify";
import { useRoute, useRouter } from "vue-router";

export default defineComponent({
  name: "PageResetPassword",

  setup() {
    const { resetPassword } = useAuthUser();
    const { notifyError, notifySucess } = useNotify();

    const router = useRouter();
    const route = useRoute();

    const password = ref("");

    const handlePasswordReset = async () => {
      await resetPassword(password.value);
      notifySucess("Senha alterada com sucesso");
      router.push({ name: "login" });
    };
    return {
      password,
      handlePasswordReset,
    };
  },
});
</script>
