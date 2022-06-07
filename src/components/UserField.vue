<template>
  <DataSourceAutocompleteField title="Users" name="userField" :multiple="true" :value="value" itemText="name" :data-source="dataSource" @change="$emit('input', $event)" />
</template>

<script>
import DataSourceAutocompleteField from './DataSourceAutocompleteField.vue'
import UserDataSource from "@/core/data-sources/business-logic/UserDataSource";

export default {
  name: 'UserField',
  props: {
    value: {
      type: [Object, Array],
      default: null
    },
  },
  components: {
      DataSourceAutocompleteField
  },
  data() {
      return {
        dataSource: new UserDataSource()
      }
  },
}
</script>

