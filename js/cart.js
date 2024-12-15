// Sepete ekleme yapacak fonksiyon
import {
  calculateCartTotal,
  getFromLocalStorage,
  saveToLocalStorage,
} from "./utils.js";

let cart = getFromLocalStorage();

export const addToCart = (event, products) => {
  const productId = parseInt(event.target.dataset.id);

  const product = products.find((product) => product.id === productId);
  if (product) {
    // Eğer ürün varsa bunu bul
    const exitingItem = cart.find((item) => item.id === productId);
    // Ürün sepette varsa bunu ekleme miktarını bir arttır.
    if (exitingItem) {
      exitingItem.quantity++;
    } else {
      // Sepete eklenecek objeyi oluştur
      const cartItem = {
        id: product.id,
        title: product.title,
        price: product.price,
        image: product.image,
        quantity: 1,
      };
      // Oluşturulan cartItem ı sepete ekle
      cart.push(cartItem);
      // Ekleme yapılan cartın içeriğini güncelleme

      event.target.teextContent = "Added";
      saveToLocalStorage(cart);
    }
  }
};
// remove-from-cart  butonlarına eriş
const removeFromCart = (event) => {
  // Silinecek elemanı belirlemek için benzersiz bir değere ihtiyacımız var.Burada da her elemanın id sine erişerek bu ihtiyacımızı giderdik.
  const productId = parseInt(event.target.dataset.id);
  // Tıklanan elemanı sepetten kaldır
  cart = cart.filter((item) => item.id !== productId);
  // LocalStorage ı güncelle
  saveToLocalStorage(cart);
  // Sayfayı güncelle
  renderCartItems();
  // Toplam Miktarı güncelle
  displayCartTotal();
};

export const renderCartItems = () => {
  // Htmlde cart itemlerin render edileceği alana eriş
  const cartItemElement = document.querySelector("#cartItems");
  // Bu elemanın içeriğini güncelle
  cartItemElement.innerHTML = cart
    .map(
      (item) => `
  
  <div class="cart-item">
           <!-- Resim  -->
           <img
             src="${item.image}"
             alt=""
           />
           <!-- Info -->
           <div class="cart-item-info">
             <h2 class="cart-item-title">${item.title}</h2>
             <input
               type="number"
               min="1"
               value=${item.quantity}
               class="cart-item-quantity"
               data-id='${item.id}'
             />
           </div>
           <h2 class="cart-item-price">$${item.price}</h2>
           <button class="remove-from-cart" data-id='${item.id}'>Remove</button>
         </div>
`
    )
    .join("");
  // remove-from-cart  butonlarına eriş
  const removeButtons = document.querySelectorAll(".remove-from-cart");

  for (let i = 0; i < removeButtons.length; i++) {
    const removeButton = removeButtons[i];
    removeButton.addEventListener("click", removeFromCart);
  }
  // quantity inputlarına eriş
  const quantityInputs = document.querySelectorAll(`.cart-item-quantity`);
  for (let i = 0; i < quantityInputs.length; i++) {
    const quantityInput = quantityInputs[i];
    quantityInput.addEventListener("change", onQuantityChange);
  }
};
const onQuantityChange = (event) => {
  const newQuantity = +event.target.value;
  const productID = +event.target.dataset.id;

  // yeni miktar 0'dan büyükse
  if (newQuantity > 0) {
    // id'si bilinen elemanı bul
    const cartItem = cart.find((item) => item.id === productID);

    // Eğer ürün sepette yoksa
    if (!cartItem) return;

    // bulunan ürünün miktarını güncelle
    cartItem.quantity = newQuantity;

    // localStoage ı güncelle
    saveToLocalStorage(cart);

    // toplam fiyatı güncelle
    displayCartTotal();

    // sepet iconunu güncelle
    updateCartIcon(cart);
  }
};

// Sepetteki total ürün fiyatını render eden foksıyon
export const displayCartTotal = () => {
  // toplam fıyat alanına eriş

  const cartTotalElement = document.querySelector("#cartTotal");
  // Sepetteki toplam ürün fiyatını hesapla
  const total = calculateCartTotal(cart);
  // Toplam fiyat kısmını güncelle
  cartTotalElement.textContent = `Total: $${total.toFixed(2)}`;
};
