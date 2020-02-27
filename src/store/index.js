import Vue from "vue";
import Vuex from "vuex";
import createPersistedState from "vuex-persistedstate";
import { UPDATE_MYBOOK, DELETE_MYBOOK, UPDATE_CURRENT } from "@/mutation_types";

Vue.use(Vuex);

export default new Vuex.Store({
  state: {
    myBooks: [],
    current: null
  },
  getters: {
    getBookById(state) {
      return id => {
        return state.myBooks.find(book => book.id === id);
      };
    },
    isMyBook(state) {
      return id => {
        return state.myBooks.find(book => book.id === id) ? true : false;
      };
    },
    current(state) {
      return state.current;
    }
  },
  mutations: {
    [UPDATE_MYBOOK](state, payload) {
      let book = this.getters.getBookById(payload.id);
      if (book) {
        // 更新
        Object.assign(book, payload);
      } else {
        // 新規追加
        payload.startDate = new Date();
        payload.endDate = null;
        payload.summary1 = "";
        payload.summary2 = "";
        payload.summary3 = "";
        state.myBooks.push(payload);
      }
    },
    [DELETE_MYBOOK](state, payload) {
      const deleteIndex = state.myBooks.findIndex(book => book.id === payload);
      state.myBooks.splice(deleteIndex, 1);
    },
    [UPDATE_CURRENT](state, payload) {
      state.current = payload;
    }
  },
  actions: {
    [UPDATE_MYBOOK]({ commit }, payload) {
      commit(UPDATE_MYBOOK, payload);
    },
    [DELETE_MYBOOK]({ commit }, payload) {
      commit(DELETE_MYBOOK, payload);
    },
    [UPDATE_CURRENT]({ commit }, payload) {
      commit(UPDATE_CURRENT, payload);
    }
  },
  modules: {},
  plugins: [
    createPersistedState({
      key: "book-mindmanager"
    })
  ]
});
