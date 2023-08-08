<template>
  <q-page padding>
    <div class="row justify-center">
      <div class="col-12 text-center text-h6">
        <p>Form Category</p>
      </div>
      <q-form
        class="col-md-7 col-xs-12 col-sm-12 q-gutter-y-md"
        @submit.prevent="handleSubmit"
      >
        <q-input label="Name" v-model="form.name" />
        <q-btn
          label="salvar"
          color="primary"
          class="full-width"
          rounded
          type="submit"
        />
        <q-btn
          label="cancelar"
          color="primary"
          class="full-width"
          rounded
          flat
          :to="{ name: 'category' }"
        />
      </q-form>
    </div>
  </q-page>
</template>
<script>
import { defineComponent, ref } from "vue";
import { useRouter } from "vue-router";
import useApi from "src/composables/useApi.js";
import useNotify from "src/composables/useNotify";
export default defineComponent({
  name: "PageFormCategory",

  setup() {
    const table = "category";
    const router = useRouter();
    const { post } = useApi();
    const { notifyError, notifySucess } = useNotify();

    const form = {
      name: "",
    };

    const handleSubmit = async () => {
      try {
        await post(table, form.value);
        notifySucess("Adicionado com sucesso");
        router.push({ name: "category" });
      } catch (error) {
        notifyError(error.message);
      }
      return {};
    };
    return {
      handleSubmit,
      form,
    };
  },
});
</script>
