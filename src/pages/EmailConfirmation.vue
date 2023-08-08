<template>
  <q-page padding>
    <div>
      <p>Confirmar seu endereço de e-mail</p>
      <p>
        Um email de confirmação foi enviado para:
        {{ $route.query.email }}
      </p>
    </div>
    <div class="row justify-center">
      <div class="col-md-4 col-sm-6 col-xs-10 q-gutter-y-sm">
        <q-btn
          label="voltar"
          color="blue"
          class="full-width"
          rounded
          :to="{ name: 'login' }"
        />
      </div>
    </div>
  </q-page>
</template>
<script>
import { defineComponent } from "vue";

export default defineComponent({
  name: "EmailConfirmation",
});
</script>
