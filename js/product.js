// Ürünleri Apı dan alan fonksiyon
export const fetchProducts = async () => {
  try {
    const response = await fetch("db.json");

    // Eğer hata yoksa veriyi dönüştür
    if (!response.ok) {
      throw new Error("Yanlış URL");
    }

    return await response.json();
  } catch (error) {
    console.log(`Hataa: ${error}`);
    return [];
  }
};

// Ürünleri Render eden fonksiyon
export const renderProducts = (product, addToCartCallBack) => {
  // Ürünlerin render edileceği kapsamı Htmlden çekme
  const productList = document.querySelector("#product-list");

  productList.innerHTML = product
    .map(
      (product) =>
        //github.com/Udemig/12_hs_js/blob/main/js_projeleri/2-)ecommerce/js/product.js
        ` <div class="product">
          <img
            src="${product.image}"
            alt="product-img"
            class="product-img"
          />
          <div class="product-info">
            <h2 class="product-title">${product.title}</h2>
            <p class="product-price">$ ${product.price}</p>
            <a class="add-to-cart"data-id="${product.id}" >Add to cart</a>
          </div>
        </div>
`
    )
    .join("");
  // Products bir dizi.Dizi elemanları ',' ile ayrılır.Biz burada elemanları boşluk ile ayırmasını sağladık

  // Add to cart butonlarını seç
  const addToCartButtons = document.getElementsByClassName("add-to-cart");
  // Her bir butonu seç
  for (let i = 0; i < addToCartButtons.length; i++) {
    // Buton Collection ı içerisinden her butona eriş
    const addToCartButton = addToCartButtons[i];
    //Erişilen her butona olay izleyicisi ekle.Bu olay izleyicisi dışarıdan verilecek
    addToCartButton.addEventListener("click", addToCartCallBack);
  }
};
