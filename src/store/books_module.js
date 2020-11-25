import Vue from 'vue';
import book_api from '../services/Api/book_api.js';

const state = {
   books: {},
   latestBooksIds:[],
   currentBook:{},
};

const mutations = {
   setBooks: (state,books) => Vue.set(state,'books',books),
   setCurrentBook: (state,book) => Vue.set(state,'currentBook',book),

   setLatestBooksIds(state,bookId){
      if(state.latestBooksIds[0] == bookId) return;

      let bookIdx = state.latestBooksIds.indexOf(bookId);
      if (bookIdx > -1 ) {
         state.latestBooksIds.splice(bookIdx,1);
      }
      state.latestBooksIds.unshift(bookId)
      
      if(state.latestBooksIds.length > 10){
         state.latestBooksIds.length = 10
      }
   },
   setDeleteLatestBook(state,bookId){
      let idxLatest = state.latestBooksIds.indexOf(bookId);
      let idxBooks = state.books.results.findIndex((book)=>book.id == bookId);
      if (idxLatest > -1 && idxBooks > -1) {
         state.latestBooksIds.splice(idxLatest, 1);
         state.books.results.splice(idxBooks, 1);
         Vue.set(state.books,'results',state.books.results);
      }
   }
};

const getters = {
   getBooks: (state) => state.books?.results || [],
   getCurrentBook: (state) => state.currentBook || {},
   getLatestBooksIds: (state) => state.latestBooksIds || [],
};

const actions = {
   updateBooks({commit},params){
      return book_api.getBooks(params).then(res =>{
         commit('setBooks',res);
         return res
      });
   },
   
   updateCurrentBook({commit,dispatch},bookId){
      dispatch('updateLatestBooksIds',bookId)
      if(state.currentBook == bookId) return Promise.resolve();
      return book_api.getBook(bookId).then(res =>{
         commit('setCurrentBook',res);
      })
   },
   updateLatestBooksIds: ({commit},bookId) => commit('setLatestBooksIds',bookId),

   deleteLatestBook({commit},bookId){
      return new Promise((resolve)=>{
         commit('setDeleteLatestBook',bookId);
         return resolve()
      })
   }
};
export default {
   state,
   mutations,
   getters,
   actions
}