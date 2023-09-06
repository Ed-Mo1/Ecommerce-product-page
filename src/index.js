const activeImg = document.querySelector(".active-image");
const otherImgs = document.querySelector("#other-images");
let amountOfItem = document.querySelector("#amount");
const removeItem = document.querySelector("#remove-item");
const addItem = document.querySelector("#add-item");
const numOfOrders = document.querySelector("#num-request");
const cartIcon = document.querySelector("#cart-icon");
const cart = document.querySelector(`#card-content`);
const fullCart = document.querySelector(`#full-cart`);
const orderBtn = document.querySelector("#checkout");
const currentPrice = document.querySelector("#current-price");
const carousel = document.querySelector(`.carousel-inner`);
let orders = 0;
cartIcon.onclick = () => {
  fullCart.classList.toggle("show");
};
const images = [
  `/images/image-product-1-thumbnail.jpg`,
  `/images/image-product-2-thumbnail.jpg`,
  `/images/image-product-3-thumbnail.jpg`,
  `/images/image-product-4-thumbnail.jpg`,
];

for (let image of images) {
  if (images.indexOf(image) == 0) {
    carousel.innerHTML += `
    <div class="carousel-item active">
    <img
      src=".${image.replace(`-thumbnail`, "")}"
      class="d-block w-100"
      alt="produce-image"
    />
  </div>
    `;
  } else {
    carousel.innerHTML += `
 
 <div class="carousel-item">
 <img
   src=".${image.replace(`-thumbnail`, "")}"
   class="d-block w-100"
   alt="produce-image"
 />
</div>`;
  }
}

for (let image of images) {
  if (
    image.replace(`-thumbnail`, "") ==
    activeImg.src.slice(activeImg.src.indexOf("/images"))
  ) {
    otherImgs.innerHTML += `
    <div class="mb-5 active">
    <img
      src=.${image}
      class="img-fluid thumbnail rounded-4"
      alt="product-image"
    />
   </div>`;
  } else {
    otherImgs.innerHTML += `
    <div class="mb-5">
    <img
      src=.${image}
      class="img-fluid thumbnail rounded-4"
      alt="product-image"
    />
   </div>`;
  }
}
const thumbImages = document.querySelectorAll(".thumbnail");

thumbImages.forEach(function (el) {
  el.addEventListener("click", function () {
    thumbImages.forEach((el) => {
      el.parentNode.classList.remove("active");
    });
    this.parentNode.classList.add("active");
    activeImg.src = this.src.replace(`-thumbnail`, "");
  });
});

removeItem.onclick = () => {
  if (amountOfItem.value > 0) {
    --amountOfItem.value;
  }
};
addItem.onclick = () => {
  if (amountOfItem.value < 100) {
    ++amountOfItem.value;
  }
};

document.forms[0].onsubmit = (e) => {
  e.preventDefault();
  if (amountOfItem.value > 0) {
    orders += +amountOfItem.value;
    setOrders();
    addToCart();
    numOfOrders.style.display = "grid";
  }
  amountOfItem.value = "0";
};

checkOrders();

function addToCart() {
  if (cart.firstElementChild.nodeName == "SPAN") {
    cart.firstElementChild.remove();
  }
  cart.innerHTML += `
  <div class='position-relative d-flex w-100 align-items-center'>
  <img
  src="./images/image-product-1-thumbnail.jpg"
  class="img-fluid rounded-4"
  alt="..."
/>
<div class="card-body">
  <h5 class="card-title text-black-50">
    Fall Limited Edition Sneakers
  </h5>
  <div>
    <span id="price" class="text-black-50 me-1">${
      currentPrice.textContent
    }</span>
    <span class="text-black-50 me-1">x</span>
    <span id="count" class="text-black-50 me-1">${amountOfItem.value}</span>
    <span id="final-price">$${
      +currentPrice.textContent.slice(1) * amountOfItem.value
    }.00</span>
  </div>
 
</div>
 <button  class="position-absolute delete" data-quantity='${
   amountOfItem.value
 }'>
    <svg
      width="14"
      height="16"
      xmlns="http://www.w3.org/2000/svg"
      xmlns:xlink="http://www.w3.org/1999/xlink"
    >
      <defs>
        <path
          d="M0 2.625V1.75C0 1.334.334 1 .75 1h3.5l.294-.584A.741.741 0 0 1 5.213 0h3.571a.75.75 0 0 1 .672.416L9.75 1h3.5c.416 0 .75.334.75.75v.875a.376.376 0 0 1-.375.375H.375A.376.376 0 0 1 0 2.625Zm13 1.75V14.5a1.5 1.5 0 0 1-1.5 1.5h-9A1.5 1.5 0 0 1 1 14.5V4.375C1 4.169 1.169 4 1.375 4h11.25c.206 0 .375.169.375.375ZM4.5 6.5c0-.275-.225-.5-.5-.5s-.5.225-.5.5v7c0 .275.225.5.5.5s.5-.225.5-.5v-7Zm3 0c0-.275-.225-.5-.5-.5s-.5.225-.5.5v7c0 .275.225.5.5.5s.5-.225.5-.5v-7Zm3 0c0-.275-.225-.5-.5-.5s-.5.225-.5.5v7c0 .275.225.5.5.5s.5-.225.5-.5v-7Z"
          id="a"
        />
      </defs>
      <use fill="#C3CAD9" fill-rule="nonzero" xlink:href="#a" />
    </svg>
  </button>
</div>
  `;
  orderBtn.style.cssText = `display:block !important`;

  document.querySelectorAll(".delete").forEach((el) => {
    el.addEventListener("click", function () {
      orders -= this.getAttribute(`data-quantity`);
      this.parentNode.remove();
      setOrders();
      checkOrders();
    });
  });
}

function setOrders() {
  numOfOrders.textContent = orders;
}

function checkOrders() {
  if (orders <= 0) {
    orderBtn.style.cssText = `display:none !important`;
    cart.innerHTML = `
     <span class='text-center d-block w-100'>Your cart is empty</span> 
  `;
    numOfOrders.style.display = "none";
  }
}
