import Vue from "vue";
import Vuex from 'vuex'
import Vuetify from "vuetify";
import VueRouter from 'vue-router'
import { createLocalVue } from "@vue/test-utils";
import { ValidationProvider, extend } from 'vee-validate'
import { routes } from "@/router";
import * as rules from 'vee-validate/dist/rules'

Vue.use(Vuetify);
Vue.use(Vuex);
Vue.config.productionTip = false;

let localVue = createLocalVue();

const vuetify = new Vuetify({});
const router = new VueRouter({
  mode: 'history',
  routes
})

localVue.use(vuetify)
localVue.use(VueRouter)
localVue.use(Vuex)
localVue.filter("date", (data) => data)
localVue.component('ValidationProvider', ValidationProvider);

for (const rule in rules) {
  extend(rule, {...rules[rule]});
}

/**
 * Adds a warapping `div data-app="true"` to the body so that we don't
 * get Vuetify complaining about missing data-app attribute for some components.
 *
 * @return undefined
 */
document.body.setAttribute('data-app', true)

export default {
    localVue,
    vuetify,
    router,
}
