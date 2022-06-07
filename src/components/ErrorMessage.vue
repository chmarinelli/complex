<template>
  <div class="v-text-field__details">
    <div
      v-if="value.length"
      class="v-messages theme--light error--text"
      role="alert"
    >
      <div class="v-messages__wrapper">
        <div class="v-messages__message">
          {{ value[0] }}
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "ErrorMessage",
  props: {
    value: {
      type: Array,
      required: true,
    },
  },
};
</script>
