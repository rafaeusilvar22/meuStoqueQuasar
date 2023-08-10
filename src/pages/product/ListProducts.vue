<template>
  <q-page padding>
    <div class="row">
      <q-table
        :rows="products"
        :columns="columns"
        row-key="id"
        class="col-12"
        :loading="loading"
      >
        <template v-slot:top>
          <span class="text-h6"> Produto </span>
          <q-space />
          <q-btn
            v-if="$q.platform.is.desktop"
            label="Adicionar produto"
            color="primary"
            icon="mdi-plus"
            dense
            :to="{ name: 'form-product' }"
          />
        </template>
        <template v-slot:body-cell-img_url="props">
          <q-td :props="props">
            <q-avatar v-if="props.row.img_url" square>
              <img :src="props.row.img_url" />
            </q-avatar>
            <q-avatar
              v-else
              color="secondary"
              text-color="white"
              icon="mdi-image-off"
            />
          </q-td>
        </template>
        <template v-slot:body-cell-actions="props">
          <q-td :props="props" class="q-gutter-x-sm">
            <q-btn
              icon="mdi-pencil-outline"
              color="primary"
              dense
              size="sm"
              @click="handleEdit(props.row)"
            >
              <q-tooltip
                anchor="top middle"
                self="bottom middle"
                :offset="[10, 10]"
              >
                Editar
              </q-tooltip>
            </q-btn>
            <q-btn
              icon="mdi-delete-outline"
              color="negative"
              dense
              size="sm"
              @click="handleRemoveProducts(props.row)"
            >
              <q-tooltip
                anchor="top middle"
                self="bottom middle"
                :offset="[10, 10]"
              >
                Deletar
              </q-tooltip>
            </q-btn>
          </q-td>
        </template>
      </q-table>
    </div>
    <q-page-sticky
      v-if="$q.platform.is.mobile"
      position="bottom-right"
      :offset="[18, 18]"
    >
      <q-btn
        fab
        icon="mdi-plus"
        color="primary"
        :to="{ name: 'form-product' }"
      />
    </q-page-sticky>
  </q-page>
</template>

<script>
const columns = [
  {
    name: "img_url",
    align: "left",
    label: "Img",
    field: "img_url",
    sortable: false,
  },
  {
    name: "name",
    align: "left",
    label: "Nome",
    field: "name",
    sortable: true,
  },

  {
    name: "amount",
    align: "left",
    label: "Quantidade",
    field: "amount",
    sortable: true,
  },
  {
    name: "price",
    align: "left",
    label: "Preço",
    field: "price",
    format: (val) => formatCurrency(val),
    sortable: true,
  },
  {
    name: "actions",
    align: "right",
    label: "Ações",
    field: "action",
    sortable: false,
  },
];

import { defineComponent, ref, onMounted } from "vue";
import useApi from "src/composables/useApi.js";
import useNotify from "src/composables/useNotify";
import { useRouter } from "vue-router";
import { useQuasar } from "quasar";
import { formatCurrency } from "src/utils/format";

export default defineComponent({
  name: "PageCategoryList",

  setup() {
    const products = ref([]);
    const loading = ref(true);
    const { list, remove } = useApi();
    const { notifySucess, notifyError } = useNotify();
    const router = useRouter();

    const table = "product";
    const $q = useQuasar();

    const handleListProducts = async () => {
      try {
        loading.value = true;
        products.value = await list(table);
        loading.value = false;
      } catch (error) {
        notifyError(error.message);
      }
    };

    const handleEdit = (category) => {
      router.push({ name: "form-product", params: { id: category.id } });
    };

    const handleRemoveProducts = async (category) => {
      try {
        $q.dialog({
          title: "Confirmar",
          message: `Deseja excluir ${category.name}?`,
          cancel: true,
          persistent: true,
        }).onOk(async () => {
          await remove(table, category.id);
          notifySucess("Removido com sucesso");
          handleListProducts();
        });
      } catch (error) {
        notifyError(error.message);
      }
    };

    onMounted(() => {
      handleListProducts();
    });

    return {
      columns,
      products,
      loading,
      handleEdit,
      handleRemoveProducts,
    };
  },
});
</script>
