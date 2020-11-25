import axios from 'axios';
import {Book} from '../Dto/book_dto.js';
import utils from './utils.js'

const bookInstance = axios.create({
   baseURL:'https://gutendex.com/books'
})

export default {
   getBooks(params){
      let queryString = utils.objectToQueryStr(params);
      return bookInstance.get(`${queryString}`).then(({data}) => {
         return new Book.List(data)
      })
   },
   getBook(id){
      return bookInstance.get(`${id}`).then(({data}) => new Book.Item(data))
   },
}