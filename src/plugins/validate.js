import Vue from "vue";
import * as rules from 'vee-validate/dist/rules'
import {
  ValidationProvider,
  configure,
  extend,
  setInteractionMode,
} from "vee-validate";

configure({ bails: false });
setInteractionMode("eager");
for (const rule in rules) {
  extend(rule, { ...rules[rule] });
}

Vue.component("ValidationProvider", ValidationProvider);
