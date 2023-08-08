<template>
  <q-page padding>
    <div class="row">
      <q-table
        :rows="categories"
        :columns="columns"
        row-key="id"
        class="col-12"
      >
        <template v-slot:top>
          <span class="text-h6"> Categoria </span>
          <q-space />
          <q-btn label="Adicionar produto" color="primary" />
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
    name: "nome",
    align: "left",
    label: "Nome",
    field: "nome",
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

import { defineComponent, ref } from "vue";
import useApi from "src/composables/useApi.js";

export default defineComponent({
  name: "PageCategoryList",

  setup() {
    const categories = ref([]);
    const { list } = useApi();

    const handleListCategories = async () => {
      try {
        categories.value = await list("category");
      } catch (error) {}
    };
    return {
      columns,
      categories,
      handleListCategories,
    };
  },
});
</script>
