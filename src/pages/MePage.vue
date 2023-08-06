<template>
  <q-page>
    <div v-if="user">
      <p>Hello My Friend: {{ user.user_metadata_name }}</p>
    </div>
  </q-page>
</template>
<script>
import { defineComponent } from "vue";
import useAuthUser from "src/composables/useAuthUser";

export default defineComponent({
  name: "PageMe",

  setup() {
    const { user } = useAuthUser();

    return {
      user,
    };
  },
});
</script>
