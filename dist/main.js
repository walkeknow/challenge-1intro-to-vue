Vue.component("product-details", {
  props: {
    details: {
      type: Array,
      required: true,
    },
  },
  template: `
      <ul>
        <li v-for="detail in details">{{ detail }}</li>
      </ul>
    `,
});

Vue.component("product", {
  props: {
    premium: {
      type: Boolean,
      required: true,
    },
  },
  template: `
      <div>
        <div class="cart">
          <p>Cart({{cartItems}})</p>
        </div>
        <div class="product">
          <div class="product-image">
            <a :href="memeUrl"><img :src="image" :alt="altText" /></a>
          </div>
          <div class="product-info">
            <p v-if="inStock">In Stock</p>
            <p v-else>Out of Stock</p>
            <p v-if="variantQuantity > 0 && variantQuantity <=10">Almost Gone!</p>
            <span v-else-if="onSale && variantQuantity > 0">
              {{featureProduct }}On Sale!
            </span>
            <p>User is premium: {{ premium }}</p>
            <p>Shipping: {{ shipping }}</p>
            <h1>{{title}}</h1>
            <p>{{ description }}</p>
            <product-details :details="details"></product-details>
            <p><b>Available Variants</b></p>
            <!-- always use key for array of elements -->
            <div
              v-for="(variant, index) in variants"
              :key="variant.id"
              class="color-box"
              :style="{ backgroundColor: variant.color }"
              @mouseover="updateProduct(index)"
            ></div>
            <button
              v-on:click="addToCart"
              :disabled="!inStock"
              :class="{disabledButton: !inStock}"
            >
              Add to Cart
            </button>
            <button @click="removeFromCart">Remove Item</button>
          </div>
        </div>
    </div>
  `,
  data() {
    return {
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
    };
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
    shipping() {
      if (this.premium) {
        return "Free";
      }
      return "$2.99";
    },
  },
});

var app = new Vue({
  // NOTE el -> element
  el: "#app",
  data() {
    return {
      premium: false,
    };
  },
  // NOTE Vue is reactive
});
