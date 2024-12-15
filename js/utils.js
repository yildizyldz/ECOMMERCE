export const saveToLocalStorage = (cart) => {
  localStorage.setItem("cart", JSON.stringify(cart));
};

// Localstorage'dan verileri alan fonksiyon
export const getFromLocalStorage = () => {
  const data = localStorage.getItem("cart");
  // Eğer data varsa bunu JSON.parse ile dönüştür ve bunu return et ama eğer data yoksa bunun yerine [] return
  return data ? JSON.parse(data) : [];
};

// Sepet toplamını bulan fonksiyon
export const calculateCartTotal = (cart) => {
  return cart.reduce((sum, item) => sum + item.price * item.quantity, 0);
  // sum biriken miktar item ise aktif eleman
};
// ! reduce metodu bir dizideki tüm elemanların üzerinden bir işlem gerçekleştirerek bir değer döndürür.İlk parametre olarak bir callback function ister.İkinci değer olaraksa bir başlangıç değeri ister.

export const updateCartIcon = (cart) => {
  // Sepet ıconunu güncelleyen fonksiyon
  const cartIcon = document.querySelector("#cart-icon");
  const i = document.querySelector(".bxs-shopping-bag");

  // Sepetteki toplam ürün sayısına eriş
  let totalQuantity = cart.reduce((sum, item) => {
    return sum + item.quantity;
  }, 0);

  // Sepet iconunun yanındaki quantity değerini güncelle
  i.setAttribute("data-quantity", totalQuantity);
};
