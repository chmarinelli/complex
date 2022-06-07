<template>
  <div class="data-source-autocomplete-field">
    <v-autocomplete
      :ref="name"
      class="rounded-lg"
      :multiple="multiple"
      :item-text="itemText"
      :value="modelValue"
      :append-icon="appendIcon"
      :chips="chips"
      :small-chips="smallChips"
      :name="name"
      :label="title"
      :rules="rules"
      :disabled="disabled"
      :loading="loading"
      :hint="hintMessage"
      :items="dataSource.items"
      :hide-details="hideDetails"
      outlined
      return-object
      persistent-hint
      color="primary"
      :search-input.sync="searchInput"
      @change="handleChange"
      @focus="handleFocus"
    >
      <template #selection="data" v-if="chips">
        <v-chip
          v-bind="data.attrs"
          :input-value="data.selected"
          close="close"
          @click="data.select"
          @click:close="remove(data.item)"
          v-if="value"
        >
          {{ data.item[itemText] }}
        </v-chip>
      </template>
      <template #item="data" v-if="chips">
        <v-list-item-content v-text="data.item[itemText]" />
      </template>
      <template #append-item>
        <div v-observe-visibility="loadMoreVisibilityChanged" class="last-item text-center" v-if="dataSource.hasMore">
          {{ $t('message.loading-more-items') }}
        </div>
      </template>
    </v-autocomplete>
  </div>
</template>

<script>
import { debounce, isEqual } from 'lodash'

import { ObserveVisibility } from 'vue-observe-visibility'

const SEARCH_DEBOUNCE_WAIT = 333

export default {
  name: 'DataSourceAutocompleteField',
  directives: {
    ObserveVisibility
  },
  model: {
    prop: 'value',
    event: 'change'
  },
  props: {
    appendIcon: {
      type: String,
      default: '$dropdown'
    },
    name: {
      type: String,
      required: true
    },
    hintMessage: {
      type: String,
      default: ''
    },
    chips: {
      type: Boolean,
      default: true
    },
    rules: {
      type: Array,
      default: () => []
    },
    disabled: {
      type: Boolean
    },
    smallChips: {
      type: Boolean,
      default: true
    },
    title: {
      type: String,
      default: ''
    },
    /**
     * This is the property property of items’s text value
     *
     * Use lodash `get` function to get itemText - itemValue from item object
     * Format: 'abc.xyz.0.a'
     * Example: 'extraFields.code' - 'code'
     */
    itemText: {
      type: String,
      required: true
    },
    multiple: {
      type: Boolean,
      default: false
    },
    /**
     * Can use v-model to make two way binding
     * This is the Object as transformed from the api by `DataSource`
     */
    value: {
      type: [Object, Array],
      default: null
    },
    hideDetails: {
      type: [Boolean, String],
      default: 'auto'
    },
    dataSource: {
      type: Object, // DataSourceAPI
      required: true
    },
    /**
     * This prop is used when you have only the value(s) of the defined Data Source termField. It can directly define
     * the auto complete value. When the updateTerm is defined or changed, the component performs a Data Source search
     * using this values and fill the auto complete with the correspondent objects. The given value(s) at the updateTerm
     * must be from the field defined at the termField, on the DataSource.
     *
     * Example: If it is a Country Data Source with the termField as `extraFields.alpha3`, the updateTerm could be
     * something like 'BRA' or ['BRA', 'AUS']
     */
    updateTerm: {
      type: [String, Array],
      default: null
    }
  },
  data() {
    return {
      loading: false,
      modelValue: null,
      /**
       * The term currently being search. Typed by the user
       */
      searchInput: ''
    }
  },
  computed: {
    term() {
      return (this.modelValue && this.modelValue[this.itemText]) ?? ''
    }
  },
  watch: {
    value(newValue) {
      this.modelValue = newValue
    },
    async searchInput(newSearch) {
      if (newSearch?.constructor !== String) {
        return
      }

      if (this.term !== newSearch) {
        this.searchDebounce(newSearch, this.itemText)
      }
    },
    modelValue() {
      this.$emit('change', this.modelValue)
    },
    updateTerm(newValue, oldValue) {
      this.updateValueByDefinedTerm(newValue, oldValue)
    }
  },
  created() {
    if (this.updateTerm?.length) {
      this.updateValueByDefinedTerm(this.updateTerm)
    } else {
      this.modelValue = this.value
    }
  },
  methods: {
    async updateValueByDefinedTerm(newValue, oldValue = null) {
      if (newValue === null || isEqual(newValue, oldValue)) {
        return
      }
      let value
      if (newValue.constructor === Array) {
        // Search only the values that are not cached
        const valuesToSearch = newValue.filter(v => !this.dataSource.get(v))
        await this.searchMany(valuesToSearch)
        value = newValue.map(v => this.dataSource.get(v)).filter(v => !!v)
      } else {
        value = this.dataSource.get(newValue)
        if (!value) {
          await this.search(newValue)
          value = this.dataSource.get(newValue)
        }
      }
      this.modelValue = value
    },
    async search(term, isLoadingMore = false) {
      this.loading = !isLoadingMore || this.dataSource.hasMore
      await this.dataSource.search(term, isLoadingMore)
      this.loading = false
    },
    async searchMany(terms) {
      this.loading = true
      await this.dataSource.searchMany(terms)
      this.loading = false
    },
    searchDebounce: debounce(async function (term) {
      return this.search(term)
    }, SEARCH_DEBOUNCE_WAIT),
    /**
     * Fetch more elements when the loading more items element becomes visible
     *
     * @param {boolean} isVisible - indicates if the load more element is visible
     */
    async loadMoreVisibilityChanged(isVisible) {
      if (isVisible) {
        this.search(this.searchInput, true)
      }
    },
    handleChange(event) {
      // Clears whatever term the user was typing when the value actually; if not done the user may find a term, press
      // enter, and the value he was typing would still show
      this.searchInput = ''
      this.modelValue = event
    },
    // These methods are used to control the page scroll at digital form pages.
    // The page scroll goes to some fields when it's focused.
    handleFocus(event) {
      this.$emit('focus', event)
    },
    focus() {
      this.$refs[this.name]?.focus()
    },
    remove(itemToRemove) {
      if (!this.multiple) {
        this.modelValue = null
        return
      }
      const indexToRemove = this.modelValue.findIndex(selectedItem => isEqual(selectedItem, itemToRemove))
      if (indexToRemove >= 0) {
        this.$delete(this.modelValue, indexToRemove)
      }
    }
  }
}
</script>

<style lang="scss" scoped>
.data-source-autocomplete-field {
  position: relative !important;

  ::v-deep {
    .v-autocomplete {
      position: relative;
    }
  }
}
</style>

<i18n>
{
  "en": {
    "message": {
      "loading-more-items": "Loading more items ..."
    }
  }
}
</i18n>