//Add a description to the data object with the value "A pair of warm, fuzzy socks". Then display the description using an expression in an p element, underneath the h1.

// NOTE root/heart of Vue
var app = new Vue({
  // NOTE el -> element
  el: '#app',
  // NOTE Vue is reactive
  data: {
    product: 'Socks',
    description: 'Christmas Socks!'
  } 
})
