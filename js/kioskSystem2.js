var swiper = new Swiper(".mySwiper", {
    spaceBetween: 30,
    pagination: {
        el: ".swiper-pagination",
        clickable: true,
    },
});
// 🛒 장바구니 데이터 저장소
const cartItems = {};
const cartDisplay = document.getElementById('cartItems');
const totalAmountDisplay = document.getElementById('totalAmount');

// 🛍️ 상품 카드마다 이벤트 연결
document.querySelectorAll('.product-card').forEach((card) => {
    const name = card.getAttribute('data-name');
    const price = parseInt(card.getAttribute('data-price'), 10);
    const heartIcon = card.querySelector('.heart-icon');
    const cartIcon = card.querySelector('.cart-icon');

    // ❤️ 하트 버튼 토글
    let liked = false;
    heartIcon.addEventListener('click', (e) => {
        e.stopPropagation(); // 카드 클릭 막기
        liked = !liked;
        heartIcon.src = liked
            ? '/ex/images/heart_filled.png'
            : '/ex/images/heart.png';
    });

    // 🛒 장바구니 버튼 토글 + 담기
    let addedToCart = false;
    cartIcon.addEventListener('click', (e) => {
        e.stopPropagation(); // 카드 클릭 막기
        addedToCart = !addedToCart;
        cartIcon.src = addedToCart
            ? '/ex/images/cart_filled.png'
            : '/ex/images/cart.png';

        // 장바구니 추가
        if (cartItems[name]) {
            cartItems[name].count++;
        } else {
            cartItems[name] = { price, count: 1 };
        }
        console.log(`'${name}'가 장바구니에 담겼습니다.`); // ✅ 콘솔 추가!

        updateCart();
    });

    // 🧾 카드 전체 클릭 시 → 장바구니 추가
    card.addEventListener('click', () => {
        if (cartItems[name]) {
            cartItems[name].count++;
        } else {
            cartItems[name] = { price, count: 1 };
        }
        console.log(`'${name}'가 장바구니에 담겼습니다.`); // ✅ 콘솔 추가

        updateCart();

        addedToCart = true;
        cartIcon.src = '/ex/images/cart_filled.png';
    });
});

// 🧾 장바구니 UI 그리기
function updateCart() {
    cartDisplay.innerHTML = '';
    let total = 0;

    for (const name in cartItems) {
        const { price, count } = cartItems[name];
        total += price * count;

        const itemElement = document.createElement('div');
        itemElement.className = 'cartItem';

        const itemPrice = document.createElement('span');
        itemPrice.textContent = `${(price * count).toLocaleString()}원`;

        // ➕ 버튼
        const plusBtn = document.createElement('button');
        plusBtn.textContent = '+';
        plusBtn.addEventListener('click', () => {
            cartItems[name].count++;
            updateCart();
        });

        // ➖ 버튼
        const minusBtn = document.createElement('button');
        minusBtn.textContent = '-';
        minusBtn.addEventListener('click', () => {
            if (cartItems[name].count > 1) {
                cartItems[name].count--;
            } else {
                delete cartItems[name];
            }
            updateCart();
        });

        // 🗑️ 삭제 버튼
        const deleteBtn = document.createElement('button');
        deleteBtn.textContent = '삭제';
        deleteBtn.addEventListener('click', () => {
            delete cartItems[name];
            updateCart();
        });

        // 상품명과 수량
        const itemName = document.createElement('span');
        itemName.textContent = `${name} x ${count}`;

        // 👉 새로운 버튼 순서로 구성
        itemElement.appendChild(plusBtn);     // ➕
        itemElement.appendChild(itemName);    // 이름 x 수량
        itemElement.appendChild(minusBtn);    // ➖
        itemElement.appendChild(itemPrice);   // 가격
        itemElement.appendChild(deleteBtn);   // 삭제

        cartDisplay.appendChild(itemElement);
    }

    const orderBtn = document.getElementById('orderBtn');
    orderBtn.replaceWith(orderBtn.cloneNode(true)); // 기존 이벤트 제거
    document.getElementById('orderBtn').addEventListener('click', function () {
        alert('주문해 주셔서 감사합니다!');
    });



    totalAmountDisplay.textContent = total.toLocaleString();
}

