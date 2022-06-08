//Add a description to the data object with the value "A pair of warm, fuzzy socks". Then display the description using an expression in an p element, underneath the h1.

// NOTE root/heart of Vue
var app = new Vue({
  // NOTE el -> element
  el: "#app",
  // NOTE Vue is reactive
  data: {
    product: "Socks",
    description: "Christmas Socks!",
    image: "./assets/vmSocks-green-onWhite.jpeg",
    altText: "Green Socks",
    inStock: true,
    disabledButton: 'disabledButton',
    memeUrl:
      "https://res.cloudinary.com/practicaldev/image/fetch/s--TlyEacHW--/c_limit%2Cf_auto%2Cfl_progressive%2Cq_auto%2Cw_880/https://dev-to-uploads.s3.amazonaws.com/i/vqe1zzbixk1bc6amhtk2.png",
    inventory: 11,
    onSale: true,
    details: ["80% cotton", "20 % polyester", "Gender-neutral"],
    variants: [
      {
        id: 2234,
        color: "Green",
        image: "./assets/vmSocks-green-onWhite.jpeg"
      },
      {
        id: 2235,
        color: "Blue",
        image: "./assets/vmSocks-blue-onWhite.jpg"
      },
    ],
    cartItems: 0,
  },
  methods: {
    addToCart() {
      this.cartItems += 1;
    },
    removeFromCart() {
      if (this.cartItems > 0) {
        this.cartItems -= 1;
      }
    },
    updateProduct(variant) {
      this.image = variant.image,
      this.altText = variant.color + " Socks"
    }
  },
});
