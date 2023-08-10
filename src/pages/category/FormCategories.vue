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
        <q-input
          label="Name"
          v-model="form.name"
          :rules="[(val) => (val && val.length > 0) || 'Nome obrigatorio']"
        />
        <q-btn
          :label="isUpdate ? 'Atualizar' : 'Salvar'"
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
import { defineComponent, ref, onMounted, computed } from "vue";
import { useRouter, useRoute } from "vue-router";
import useApi from "src/composables/useApi.js";
import useNotify from "src/composables/useNotify";
export default defineComponent({
  name: "PageFormCategory",

  setup() {
    const table = "category";
    const router = useRouter();
    const route = useRoute();
    const { post, getById, update } = useApi();
    const { notifyError, notifySucess } = useNotify();

    const isUpdate = computed(() => route.params.id);

    let category = {};
    const form = ref({
      name: "",
    });
    onMounted(() => {
      if (isUpdate.value) {
        handleGetCategory(isUpdate.value);
      }
    });

    const handleSubmit = async () => {
      try {
        if (isUpdate.value) {
          console.log(form.value);
          await update(table, {
            ...form.value,
          });
          notifySucess("Nome atualizado");
        } else {
          await post(table, form.value);
          notifySucess("Adicionado com sucesso");
        }
        router.push({ name: "category" });
      } catch (error) {
        notifyError(error.message);
      }
    };

    const handleGetCategory = async (id) => {
      try {
        category = await getById(table, id);
        form.value = category;
      } catch (error) {
        notifyError(error.message);
      }
    };
    return {
      handleSubmit,
      form,
      isUpdate,
    };
  },
});
</script>
