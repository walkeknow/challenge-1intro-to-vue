// REVIEW the global event bus is like a common store
// Vuex should be the preferred way if data grows
var eventBus = new Vue();

Vue.component("product-tabs", {
  props: {
    reviews: {
      type: Array,
      required: true,
    },
    details: {
      type: Array,
      required: true,
    },
  },
  template: `
    <div>
      <span class="tab" :class="{activeTab: selectedTab === tab}"  v-for="(tab, index) in tabs" :key="index" @click="selectedTab = tab">{{ tab }}
      </span>
      <div>
          <div v-show="selectedTab === 'Show Reviews'">
            <h2>Reviews</h2>
            <p v-if="!reviews.length">There are no reviews yet</p>
            <ul>
              <li v-for="review in reviews">
                <p><strong>{{ review.name }}</strong></p>
                <p>{{ review.review }}</p>
                <p>Rating: {{ review.rating }}</p>
                <p>Would recommend the product: {{ review.recommendation }}</p>
              </li>
            </ul>
          </div>
        </div>
        <product-review v-show="selectedTab === 'Write a Review'"></product-review>
        <p v-show="selectedTab === 'Shipping'">Shipping Cost: {{ shipping }}</p>
        <product-details v-show="selectedTab === 'Product Details'" :details="details"></product-details>
    </div>
  `,
  data() {
    return {
      selectedTab: "Show Reviews",
      tabs: ["Show Reviews", "Write a Review", "Shipping", "Product Details"],
      shipping: null,
    };
  },
  mounted() {
    eventBus.$on("shipping-cost", (cost) => {
      this.shipping = cost;
    });
  },
});

Vue.component("product-review", {
  template: `
    <!-- NOTE .prevent is an event modifier -->
    <form class="review-form" @submit.prevent="onSubmit">
      <p v-if="errors.length">
        <b>Please correct the error(s):</b>
        <ul>
          <li v-for="error in errors">{{ error }}</li>
        </ul>
      <p>
        <label for="name">Name:</label>
        <!-- REVIEW v-model enables 2-way data binding: HTML -> data and data -> HTML -->
        <input id="name" v-model="name" required>
      </p>
      <p>
        <label for="review">Review:</label>
        <textarea id="review" v-model="review" required></textarea>
      </p>
      <p>
        <label for="rating">Rating:</label>
        <select id="rating" v-model.number="rating" required>
        <option>5</option>
        <option>4</option>
        <option>3</option>
        <option>2</option>
        <option>1</option>
      </select>
      </p>
      <p>
        <fieldset>
          <label for="recommendation">Would you recommend this product?</label>
          <div>
            <input type="radio" class="radio" id="yes" value="Yes" name="recommendation" v-model="recommendation" required>
            <label for="yes">Yes</label>
          </div>
          <div>
            <input type="radio" class="radio" id="no" value="No" name="recommendation" v-model="recommendation">
            <label for="No">No</label>
          </div>
        </fieldset>
      </p>
      <p>
        <input type="submit" value="Submit">
      </p>
    </form>
  `,
  data() {
    return {
      name: null,
      review: null,
      rating: null,
      key: null,
      recommendation: null,
      errors: [],
    };
  },
  methods: {
    onSubmit() {
      if (this.name && this.review && this.rating) {
        let productReview = {
          name: this.name,
          review: this.review,
          rating: this.rating,
          key: new Date(),
          recommendation: this.recommendation,
        };
        eventBus.$emit("review-submitted", productReview);
        this.name = null;
        this.review = null;
        this.rating = null;
        this.key = null;
        this.recommendation = null;
      } else if (!this.name) {
        this.errors.push("Name required.");
      } else if (!this.review) {
        this.errors.push("Review required.");
      } else if (!this.rating) {
        this.errors.push("Rating required.");
      }
    },
  },
});

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
            <h1>{{title}}</h1>
            <p>{{ description }}</p>
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
        <product-tabs :reviews="reviews" :details="details"></product-tabs>
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
      variantQuantity: 10,
      reviews: [],
    };
  },
  methods: {
    addToCart() {
      this.$emit("add-to-cart", this.variants[this.selectedVariant].id);
    },
    removeFromCart() {
      this.$emit("remove-from-cart", this.variants[this.selectedVariant].id);
    },
    updateProduct(index) {
      this.selectedVariant = index;
    },
  },
  //  REVIEW Instead of a computed property, we can define the same function as a method.
  // For the end result, the two approaches are indeed exactly the same.
  // However, the difference is that computed properties are cached based on their reactive dependencies.
  // A computed property will only re-evaluate when some of its reactive dependencies have changed.
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
  mounted() {
    // REVIEW eventBus.$on product component listens for reviews submitted in the event bus (like a selector)
    eventBus.$on("review-submitted", (productReview) => {
      this.reviews.push(productReview);
    });

    if (this.premium) {
      // REVIEW eventBus.$emit modifies the store (like dispatch)
      return eventBus.$emit("shipping-cost", "Free");
    } else {
      eventBus.$emit("shipping-cost", "$2.99");
    }
  },
});

var app = new Vue({
  // NOTE el -> element
  el: "#app",
  data() {
    return {
      premium: false,
      cartItems: [],
    };
  },
  methods: {
    addToMainCart(id) {
      console.log(id);
      this.cartItems.push(id);
    },
    removeFromMainCart(id) {
      if (this.cartItems.length > 0) {
        index = this.cartItems.indexOf(id);
        if (index >= 0) {
          this.cartItems.splice(index, 1);
        }
      }
    },
  },
  // NOTE Vue is reactive
});
