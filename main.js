const { createApp, ref,computed,reactive,toRefs } = Vue
const app = createApp({
    setup(){
        const cart = ref([])      
        const premium = ref(true)   
        function updateCart(id) {
          
          const index = cart.value.findIndex(item => item.id === id);
          if (index > -1) {
            
            cart.value[index].quantity += 1;
          } else {
            
            cart.value.push({ id, quantity: 1 });
          }
            //cart.value.push(id)
               }
               const handleRemoveFromCart = (id) => {
   
                const index = cart.value.findIndex(item => item.id === id);
                if (index > -1) {
                  if (cart.value[index].quantity > 1) {
                    cart.value[index].quantity -= 1;
                  } else {
                    cart.value.splice(index, 1);
                  }
                }
            }
           

  
        return {
            cart,
            premium,
            updateCart,
            handleRemoveFromCart,
          
            
        }
    }
  
})

app.component('product-display', productDisplay)
app.component('review-form', reviewForm)
app.component('review-list',reviewList)
app.component('product-details',productDetails)
app.mount('#app')