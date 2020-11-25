import Vue from 'vue'
import Vuex from 'vuex'

import books_module from './books_module.js';
import dialog_module from './dialog_module.js';

Vue.use(Vuex)

export default new Vuex.Store({
  modules: {
    books_module,
    dialog_module
  }
})
