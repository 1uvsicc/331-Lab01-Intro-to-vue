const productDisplay = {
    
    template:
        /*html*/
        `
    <div class="product-display">
            <div class="product-container">
                <div class="product-image">
                    <img :src="image">
                </div>
            </div>
            <div class="product-info">
          
            <a v-bind:href="producturl">
                <h1>{{title}}</h1>
                </a>
                <div>{{ ba }}</div>
                <p v-if="inventory > 10">In Stock</p>
                
                <p v-else-if="inventory <= 10 && inventory > 0">Almost out of Stock</p>
                <p v-else>Out of Stock</p>
                 <p v-if="inStockVariant">{{ inStockVariant.color }} variant is in stock.</p>
                 <p v-else>No variants are in stock.</p>
                <button @click="toggleStockStatus">Toggle Stock Status</button>
                <p v-if="onSale">{{saleMessage}}</p>
                <p>Shipping: {{shipping}}</p>
                <ul>
                    <li v-for="detail in details">{{detail}}</li>
                </ul>
                <ul>
                  <p>size:</p>
                    <li v-for="size in size">{{size}}</li>
                </ul>
                <div v-for="(variant,index) in variants" :key="variant.id" @mouseover="updateVariant(index)"
                    class="color-circle" :style="{backgroundColor: variant.color}">
   
                </div>
                <button class="button" :disabled='!inStock' @click="addToCart" :class="{disabledButton: !inStock}">Add To
                    Cart</button>
                    
            </div>
            <review-list v-if="reviews.length" :reviews="reviews"></review-list>
            <review-form @review-submitted="addReview"></review-form>
            <button @click="removeFromCart">Remove from Cart</button>            

        </div>
       
    `,
    props: {
        premium: Boolean
        },
      setup(props,{emit}) {
        const shipping = computed(()=>{
            if (props.premium){
                 return 'Free'
                } else {
                    return 30
                }
               
            })
            function removeFromCart() {
                const id = variants.value[selectedVariant.value].id
                emit('remove-from-cart', id)
              }
        
        const reviews = ref([])                
        const product = ref('Boots')
       const ba=ref('they are used for wearing')
        const producturl = ref('http://www.camt.cmu.ac.th')
        const brand = ref('SE 331')
        const onSale = ref(true)
        
        // const image = ref('./assets/images/socks_green.jpg')
        // const inStock = ref(true)
        const inventory = ref(100)
        const size = ref([
            
            'L',
            'M',
            'S'
        ])
        const details = ref([
            '50% cotton',
            '30% wool',
            '20% polyester'
        ])
        const variants = ref([
            { id: 2234, color: 'green', image: './assets/images/socks_green.jpg', quantity: 50 },
            { id: 2235, color: 'blue', image: './assets/images/socks_blue.jpg', quantity: 0 }
        ])
        const selectedVariant = ref(0)
        const cart = ref(0)
        function updateVariant(index) {
            selectedVariant.value = index;
        }
        const image = computed(() => {
            return variants.value[selectedVariant.value].image
        })
        const inStock = computed(() => {
            return variants.value[selectedVariant.value].quantity
        })
        function addToCart() {
            //cart.value += 1
            emit('add-to-cart', variants.value[selectedVariant.value].id)
        }
        const title = computed(() => {
            return brand.value + ' ' + product.value
        })
        function updateImage(variantImage) {
            image.value = variantImage
        }
        const saleMessage = computed(() => {
            if (onSale.value) {
                return `${brand.value} ${product.value} is on sale`;
            }
            return '';
        })
        function addReview(review){
            reviews.value.push(review)
            }
            const toggled = ref(false);
            const inStockVariant = computed(() => {
                return variants.value.find((variant, index) => variant.quantity > 0 && index === selectedVariant.value);
              });
           
    function toggleStockStatus() {
        if (!toggled.value) {
          variants.value[0].quantity = 0;
          variants.value[1].quantity = 0;
          toggled.value = true;
        } else {
          variants.value[0].quantity = 50;
          variants.value[1].quantity = 0;
          toggled.value = false;
        }
      }
        return {
            
            product,
           ba,
            producturl,
            reviews,
            addReview,
            brand,
            title,
            onSale,
            saleMessage,
            image,
            inStock,
            size,
            inventory,
            details,
            variants,
            addToCart,
            updateImage,
            updateVariant,
            shipping,
            removeFromCart,
            toggleStockStatus,
            inStockVariant
            
        }
    }
}
