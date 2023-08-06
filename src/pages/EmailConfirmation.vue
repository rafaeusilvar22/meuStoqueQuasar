<template>
  <q-page padding>
    <div>
      <p>Confirm</p>
      <p>
        Please confirm your e-mail to finishing registering:
        {{ $route.query.email }}
      </p>
    </div>
  </q-page>
</template>
<script>
import { defineComponent } from "vue";

export default defineComponent({
  name: "EmailConfirmation",
});
</script>
