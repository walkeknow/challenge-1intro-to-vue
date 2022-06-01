//Add a description to the data object with the value "A pair of warm, fuzzy socks". Then display the description using an expression in an p element, underneath the h1.

// NOTE root/heart of Vue
var app = new Vue({
  // NOTE el -> element
  el: '#app',
  // NOTE Vue is reactive
  data: {
    product: 'Socks',
    description: 'Christmas Socks!',
    image: './assets/vmSocks-green-onWhite.jpeg',
    altText: 'Green socks',
    memeUrl: 'https://res.cloudinary.com/practicaldev/image/fetch/s--TlyEacHW--/c_limit%2Cf_auto%2Cfl_progressive%2Cq_auto%2Cw_880/https://dev-to-uploads.s3.amazonaws.com/i/vqe1zzbixk1bc6amhtk2.png'
  } 
})
