const state = {
   bookDialog: false
};
const mutations = {
   setBookDialog: (state,isOn) => state.bookDialog = isOn,
};
const getters = {
   getIsBookDialog: (state) => state.bookDialog
};
const actions = {
   updateBookDialog: ({commit},isOn) => commit('setBookDialog',isOn),
};
export default {
   state,
   mutations,
   getters,
   actions
}