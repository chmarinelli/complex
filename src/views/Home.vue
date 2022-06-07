<template>
  <v-card elevation="2">
    <v-card-title class="headline primary white--text">
      Project Form
      <v-spacer></v-spacer>
      <v-btn color="white" :to="{ name: 'projects' }"> Projects </v-btn>
    </v-card-title>
    <ValidationObserver ref="form" tag="form" @submit.prevent="onSubmit">
      <v-card-text>
        <v-row class="mt-5">
          <v-col md="4">
            <ValidationProvider
              v-slot="{ errors, valid }"
              name="Name"
              rules="required|max:128"
            >
              <v-text-field
                v-model="model.name"
                :success="valid"
                error-count="1"
                :error-messages="errors"
                :counter="128"
                name="name"
                label="Name*"
                outlined
              />
            </ValidationProvider>
          </v-col>
          <v-col md="4">
            <DatePicker
              v-model="model.startDate"
              label="Start date"
              clearable
              outlined
            />
          </v-col>
          <v-col md="4">
            <DatePicker
              v-model="model.endDate"
              label="End date"
              :min="model.startDate"
              clearable
              outlined
            />
          </v-col>
          <v-col cols="12">
            <ValidationProvider
              v-slot="{ errors }"
              name="detail"
              rules="max:256"
            >
              <v-textarea
                v-model="model.detail"
                error-count="1"
                :error-messages="errors"
                label="Detail"
                rows="3"
                :counter="256"
                outlined
              />
            </ValidationProvider>
          </v-col>
          <v-col cols="12">
            <ValidationProvider
              v-slot="{ errors }"
              name="Users"
              rules="required"
            >
              <UserField v-model="model.users" />
              <ErrorMessage :value="errors" />
            </ValidationProvider>
          </v-col>
        </v-row>
      </v-card-text>
      <v-divider />

      <v-card-actions>
        <v-spacer />
        <v-btn type="submit" color="primary" text name="save"> Save </v-btn>
      </v-card-actions>
    </ValidationObserver>
    <v-snackbar v-model="showSnackbar" :timeout="2000" color="success">
      Form submitted successfully.
    </v-snackbar>
  </v-card>
</template>

<script>
import { ValidationObserver } from "vee-validate";
import DatePicker from "@/components/DatePicker";
import UserField from "@/components/UserField";
import ErrorMessage from "@/components/ErrorMessage";

export default {
  name: "Home",
  components: {
    DatePicker,
    UserField,
    ValidationObserver,
    ErrorMessage,
  },
  data() {
    return {
      model: {
        name: null,
        startDate: null,
        endDate: null,
        detail: null,
        users: [],
      },
      showSnackbar: false,
    };
  },
  watch: {
    "model.startDate"(value) {
      if (!this.model.endDate) return;
      if (value > this.model.endDate) this.model.endDate = null;
    },
  },
  methods: {
    async onSubmit() {
      if (!(await this.$refs.form.validate())) return;
      this.$store.dispatch("addProject", this.model);
      this.showSnackbar = true;

      this.model = {
        name: null,
        startDate: null,
        endDate: null,
        detail: null,
        users: [],
      };
      this.$refs.form.reset();

       setTimeout(() => {
        this.$router.push({name: 'projects'});
        }, 1800)
    },
  },
};
</script>
