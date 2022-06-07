<template>
  <v-dialog ref="dialog" v-model="dialog" max-width="350px">
    <template v-slot:activator="{ on, attrs }">
      <v-text-field
        ref="datePicker"
        v-bind="{ ...attrs, ...$attrs, ...$props }"
        :value="dateFormatted"
        readonly
        v-on="on"
        @keyup.space="dialog = true"
        @click:clear="onInputChange(null)"
        data-test="text-field"
      />
    </template>
    <v-date-picker
      :value="value"
      :min="min"
      :max="max"
      @input="onInputChange($event)"
    />
  </v-dialog>
</template>

<script>
import moment from "moment";
export default {
  name: "DatePicker",
  props: {
    value: {
      type: String,
      default: null,
    },
    min: {
      type: String,
      default: null,
    },
    max: {
      type: String,
      default: null,
    },
  },
  data() {
    return {
      dialog: false,
    };
  },
  computed: {
    dateFormatted() {
      if (!this.value) return;
      return moment(this.value).format("ll");
    },
  },
  methods: {
    onInputChange(value) {
      this.dialog = false;
      this.$refs.datePicker.blur();
      this.$emit("input", value);
    },
  },
};
</script>
