
//cart
let cartIcon = document.querySelector('#cart-icon');
let cart = document.querySelector('.cart');
let closeCart = document.querySelector('#close-cart');

cartIcon.onclick =() =>{
   cart.classList.add('active');
}

closeCart.onclick =() =>{
   cart.classList.remove('active');
}

//cart working

if (document.readyState == 'loading'){
   document.addEventListener('DOMContentLoaded',ready);
}else{
   ready();
}

function ready(){
   //Remove items from cart
   var removeCartButton = document.getElementsByClassName('cart-remove');
   console.log(removeCartButton);
   for(var i =0;i<removeCartButton.length;i++){
      var button = removeCartButton[i];
      button.addEventListener('click',removeCartItem);
   }
   //Quantity change 
   var quantityInputs = document.getElementsByClassName('cart-quantity');
   for (var i =0;i<quantityInputs.length;i++){
      var input  = quantityInputs[i];
      input.addEventListener("change", quantityChanged);
   }
   // Add To Cart
   var addCart = document.getElementsByClassName('add-cart');
   for (var i =0;i<addCart.length;i++){
      var button = addCart[i]
      button.addEventListener("click", addCartClicked);
   }

   //buy btn
   document.getElementsByClassName('btn-buy')[0].addEventListener('click', buyButtonClicked);

}

//buy btn func
function buyButtonClicked(){
   alert('Your Order Is Placed')
   var cartContent = document.getElementsByClassName('cart-content')[0]
   while(cartContent.hasChildNodes()){
      cartContent.removeChild(cartContent.firstChild);
   }
   updatetotal();
}


function removeCartItem(event){
   var buttonClicked = event.target;
   buttonClicked.parentElement.remove();
   updatetotal();
}

//add cart func.
function addCartClicked(event){
   var button = event.target
   var shopProducts = button.parentElement
   var prodImg = shopProducts.getElementsByClassName('prod-img')[0].src;
   var title = shopProducts.getElementsByClassName('pro-title')[0].innerText;
   var price = shopProducts.getElementsByClassName('pro-price')[0].innerText;
   addProductToCart(title,price,prodImg);
   updatetotal();
}

function addProductToCart(title,price,prodImg){
   var cartShopBox = document.createElement('div');
   cartShopBox.classList.add('cart-box')
   var cartItems = document.getElementsByClassName('cart-content')[0];
   var cartItemsNames = cartItems.getElementsByClassName('cart-product-title');
   for(var i =0; i < cartItemsNames.length; i++) {
       if(cartItemsNames[i].innerText==title) {    
         alert("You have already added this item to cart");
          return;
       }
   }
   
   var cartBoxContent = `
                            <img src="${prodImg}" alt="" class="cart-img">
                            <div class="detail-box">
                                <div class="cart-product-title">${title}</div>
                                <div class="cart-price">${price}</div>
                                <input type="number" value="1" class="cart-quantity">
                            </div>
                            <!-- Remove Cart-->
                            <i class="fa fa-trash cart-remove"></i>`;

cartShopBox.innerHTML = cartBoxContent;
cartItems.append(cartShopBox);
cartShopBox.getElementsByClassName('cart-remove')[0].addEventListener('click', removeCartItem)
cartShopBox.getElementsByClassName('cart-quantity')[0].addEventListener('change', quantityChanged)

}


//quantity func.
function quantityChanged(event){
   var input =event.target;
   if (isNaN(input.value) || input.value <= 0){
      input.value = 1;
   }
   updatetotal();
}

//update total
function updatetotal() {
   var cartContent = document.getElementsByClassName('cart-content')[0];
   var cartBoxes = cartContent.getElementsByClassName('cart-box');
   var total = 0;
   for(var i =0; i < cartBoxes.length; i++){
      var cartBox = cartBoxes[i];
      var priceElement = cartBox.getElementsByClassName('cart-price')[0];
      var quantityElement = cartBox.getElementsByClassName('cart-quantity')[0];
      var price = parseFloat(priceElement.innerText.replace("$", ""));
      var quantity = quantityElement.value;
      total = total + (price * quantity);
   }
      //if price in decimal/cents 
      total = Math.round(total *100) / 100

      document.getElementsByClassName('total-price')[0].innerText = "$" + total;
   
}