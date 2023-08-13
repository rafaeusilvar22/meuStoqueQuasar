<template>
  <q-page padding>
    <!-- <div v-if="user">
      <p>Hello My Friend: {{ user.user_metadata_name }}</p>
    </div> -->
    <div>
      <!-- <div v-for="product in products" :key="product">
        {{ product }}
      </div> -->
      <q-card class="my-card" v-for="product in products" :key="product">
        <img :src="product.img_url" />

        <q-card-section>
          <div class="text-h6">{{ product.name }}</div>
          <div class="text-subtitle2">{{ product.description }}</div>
        </q-card-section>

        <q-card-section class="q-pt-none">
          <!-- {{ lorem }} -->
        </q-card-section>
      </q-card>
    </div>
  </q-page>
</template>
<script>
import { defineComponent, onMounted, ref } from "vue";
import useAuthUser from "src/composables/useAuthUser";
import useApi from "src/composables/useApi.js";

export default defineComponent({
  name: "PageMe",

  setup() {
    const products = ref([]);
    const { user } = useAuthUser();
    const table = "product";
    const { list } = useApi();

    const handleListProducts = async () => {
      try {
        products.value = await list(table);
      } catch (error) {}
    };

    onMounted(() => {
      handleListProducts();
      console.log(products);
    });

    return {
      user,
      list,
      products,
    };
  },
});
</script>
