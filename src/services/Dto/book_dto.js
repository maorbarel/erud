export const Book = {
   Pagination: function(objInit){
      this.count = objInit.count;
      this.next = objInit.next;
      this.previous = objInit.previous;
   },
   Preview: function (objInit) {
      this.id = objInit.id;
      this.title = objInit.title;
      this.authors = objInit.authors.map(author => author.name);
      let coverImg = objInit.formats['image/jpeg'];
      this.cover = coverImg?.replace('small','medium') || require('../../global/images/placeholder.jpg');
   },
   Item: function (objInit) {
      return Object.assign(
         new Book.Preview(objInit),
         {
            bookshelves: objInit.bookshelves,
         }
      )
   },
   List: function (objInit) {
      this.pagination = new Book.Pagination(objInit);
      this.results = objInit.results.map(book => new Book.Preview(book))
   }
}