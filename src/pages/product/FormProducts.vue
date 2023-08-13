<template>
  <q-page padding>
    <div class="row justify-center">
      <div class="col-12 text-center text-h6">
        <p>Formulario de Produto</p>
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
        <q-editor v-model="form.description" min-height="5rem" />
        <q-input
          label="Image"
          stack-label
          v-model="img"
          type="file"
          accept="image/*"
        />
        <q-input
          label="Quantidade"
          v-model="form.amount"
          :rules="[(val) => !!val || 'Informe a quantidade']"
          type="number"
        />
        <q-input
          label="Preço"
          v-model="form.price"
          :rules="[(val) => !!val || 'Informe o preço']"
          type="number"
          prefix="R$"
        />
        <q-select
          v-model="form.category_id"
          :options="optionsCategory"
          label="Categoria"
          option-value="id"
          option-label="name"
          map-options
          emit-value
          :rules="[(val) => !!val || 'Categoria é obrigátorio']"
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
          :to="{ name: 'product' }"
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
  name: "PageFormProduct",

  setup() {
    const table = "product";
    const optionsCategory = ref([]);
    const router = useRouter();
    const route = useRoute();
    const { post, getById, update, list, uploadImg, getUrlPublic } = useApi();
    const { notifyError, notifySucess } = useNotify();

    const isUpdate = computed(() => route.params.id);

    let product = {};
    const form = ref({
      name: "",
      description: "",
      amount: 0,
      price: 0,
      category_id: "",
      img_url: "",
    });
    const img = ref([]);

    const imgUrl = ref([]);
    onMounted(() => {
      handleListCategories();
      if (isUpdate.value) {
        handleGetProduct(isUpdate.value);
      }
    });

    const handleListCategories = async () => {
      optionsCategory.value = await list("category");
    };

    const handleSubmit = async () => {
      if (img.value.length > 0) {
        imgUrl.value = await uploadImg(img.value[0], "products");
        // const test = await getUrlPublic();
        console.log(imgUrl);
        // console.log("aqui:", await uploadImg());
        form.value.img_url = imgUrl;
      }
      try {
        if (isUpdate.value) {
          await update(table, {
            ...form.value,
          });
          notifySucess("Nome atualizado");
        } else {
          await post(table, form.value);
          notifySucess("Adicionado com sucesso");
        }
        router.push({ name: "product" });
      } catch (error) {
        notifyError(error.message);
      }
    };

    const handleGetProduct = async (id) => {
      try {
        product = await getById(table, id);
        form.value = product;
        // console.log("info produto: ", product);
      } catch (error) {
        notifyError(error.message);
      }
    };
    return {
      handleSubmit,
      form,
      isUpdate,
      optionsCategory,
      img,
      imgUrl,
    };
  },
});
</script>
