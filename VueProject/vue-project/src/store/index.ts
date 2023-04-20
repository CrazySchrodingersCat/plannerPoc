import { createStore } from "vuex";

export default createStore({
  state: {
    message:"test message",
    practitioners:[],
    practitioner:{displayName:"", discipline:""},
    id:''
  },
  getters: {
    getAll(state){
      return state.practitioners;
    }
  },
  mutations: {},
  actions: {},
  modules: {},
});
