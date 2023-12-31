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
            v-if="$q.platform.is.desktop"
            label="Adicionar produto"
            color="primary"
            icon="mdi-plus"
            dense
            :to="{ name: 'form-category' }"
          />
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
              @click="handleRemoveCategory(props.row)"
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
        :to="{ name: 'form-category' }"
      />
    </q-page-sticky>
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
import { useRouter } from "vue-router";
import { useQuasar } from "quasar";

export default defineComponent({
  name: "PageCategoryList",

  setup() {
    const categories = ref([]);
    const loading = ref(true);
    const { list, remove } = useApi();
    const { notifySucess, notifyError } = useNotify();
    const router = useRouter();

    const table = "category";
    const $q = useQuasar();

    const handleListCategories = async () => {
      try {
        loading.value = true;
        categories.value = await list(table);
        loading.value = false;
      } catch (error) {
        notifyError(error.message);
      }
    };

    const handleEdit = (category) => {
      router.push({ name: "form-category", params: { id: category.id } });
    };

    const handleRemoveCategory = async (category) => {
      try {
        $q.dialog({
          title: "Confirmar",
          message: `Deseja excluir ${category.name}?`,
          cancel: true,
          persistent: true,
        }).onOk(async () => {
          await remove(table, category.id);
          notifySucess("Removido com sucesso");
          handleListCategories();
        });
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
      handleEdit,
      handleRemoveCategory,
    };
  },
});
</script>
