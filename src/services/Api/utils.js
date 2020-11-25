export default {
   objectToQueryStr(queryObj){
      return '?' + Object.keys(queryObj).map((key) => {
         if(!queryObj[key]) return;
         return encodeURIComponent(key) + '=' + encodeURIComponent(queryObj[key])
      }).filter(res => res).join('&');
   }
}