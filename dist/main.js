//Add a description to the data object with the value "A pair of warm, fuzzy socks". Then display the description using an expression in an p element, underneath the h1.

// NOTE root/heart of Vue
var app = new Vue({
  // NOTE el -> element
  el: "#app",
  // NOTE Vue is reactive
  data: {
    product: "Socks",
    description: "Christmas Socks!",
    altText: "Green Socks",
    disabledButton: "disabledButton",
    brand: "Vue Mastery",
    selectedVariant: 0,
    memeUrl:
      "https://res.cloudinary.com/practicaldev/image/fetch/s--TlyEacHW--/c_limit%2Cf_auto%2Cfl_progressive%2Cq_auto%2Cw_880/https://dev-to-uploads.s3.amazonaws.com/i/vqe1zzbixk1bc6amhtk2.png",
    onSale: true,
    details: ["80% cotton", "20 % polyester", "Gender-neutral"],
    variants: [
      {
        id: 2234,
        color: "Green",
        varImage: "./assets/vmSocks-green-onWhite.jpeg",
      },
      {
        id: 2235,
        color: "Blue",
        varImage: "./assets/vmSocks-blue-onWhite.jpg",
      },
    ],
    cartItems: 0,
    variantQuantity: 10,
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
    updateProduct(index) {
      this.selectedVariant = index;
    },
  },
  // computed is a key word for all computer variables
  // a computed property changes every time its dependencies change, here they are brand and product
  // It is more efficient to use a computed propery than a method (as lesser manual calls)
  computed: {
    title() {
      return this.brand + " " + this.product;
    },
    image() {
      return this.variants[this.selectedVariant].varImage;
    },
    inStock() {
      return this.variantQuantity;
    },
    featureProduct() {
      if (this.onSale) {
        return this.brand + " " + this.product + " ";
      }
    },
  },
});
