<template>
  <q-page padding>
    <div class="row">
      <q-table
        :rows="categories"
        :columns="columns"
        row-key="id"
        class="col-12"
        :loading="loading"
      >
        <template v-slot:top>
          <span class="text-h6"> Categoria </span>
          <q-space />
          <q-btn
            label="Adicionar produto"
            color="primary"
            icon="mdi-plus"
            dense
            :to="{ name: 'form-product' }"
          />
        </template>
        <template v-slot:body-cell-actions="props">
          <q-td :props="props" class="q-gutter-x-sm">
            <q-btn icon="mdi-pencil-outline" color="primary" dense size="sm">
              <q-tooltip
                anchor="top middle"
                self="bottom middle"
                :offset="[10, 10]"
              >
                Editar
              </q-tooltip>
            </q-btn>
            <q-btn icon="mdi-delete-outline" color="negative" dense size="sm">
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
  </q-page>
</template>

<script>
const columns = [
  {
    name: "name",
    align: "left",
    label: "Nome",
    field: "name",
    sortable: true,
  },
  {
    name: "actions",
    align: "right",
    label: "Ações",
    field: "action",
    sortable: true,
  },
];

import { defineComponent, ref, onMounted } from "vue";
import useApi from "src/composables/useApi.js";
import useNotify from "src/composables/useNotify";

export default defineComponent({
  name: "PageCategoryList",

  setup() {
    const categories = ref([]);
    const loading = ref(true);
    const { list } = useApi();
    const { notifySucess, notifyError } = useNotify();

    const handleListCategories = async () => {
      try {
        loading.value = true;
        categories.value = await list("category");
        loading.value = false;
      } catch (error) {
        notifyError(error.message);
      }
    };

    onMounted(() => {
      handleListCategories();
    });

    return {
      columns,
      categories,
      loading,
    };
  },
});
</script>
