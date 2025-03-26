<template>
  <div>
    <HeaderComponent :cartCounter="cartCounter" />
    <div class="container">
      <h1>Корзина</h1>
      <div v-if="cart.length === 0">
        <p>Ваша корзина пуста.</p>
      </div>
      <div v-else>
        <div class="cart-item" v-for="item in cart" :key="item.id">
          <h2>{{ item.name }}</h2>
          <p>Цена: {{ item.price }} руб.</p>
          <div class="quantity-control">
            <button @click="decreaseQuantity(item)">-</button>
            <span>{{ item.quantity }}</span>
            <button @click="increaseQuantity(item)">+</button>
          </div>
          <button class="btn-remove" @click="removeFromCart(item)">Удалить</button>
        </div>
        <div class="total">
          <h2>Итого: {{ totalPrice }} руб.</h2>
          <button class="btn-checkout">Оформить заказ</button>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, computed } from 'vue';
import HeaderComponent from '@/crosscomponents/HeaderComponent.vue';

// Состояние корзины
const cart = ref([
  // Пример данных, замените на ваши данные
  // { id: 1, name: 'Диван', price: 10000, quantity: 1 },
]);

const cartCounter = computed(() => cart.value.reduce((acc, item) => acc + item.quantity, 0));

const totalPrice = computed(() =>
  cart.value.reduce((acc, item) => acc + item.price * item.quantity, 0)
);

// Увеличение количества товара
function increaseQuantity(item) {
  item.quantity++;
}

// Уменьшение количества товара
function decreaseQuantity(item) {
  if (item.quantity > 1) {
    item.quantity--;
  } else {
    removeFromCart(item);
  }
}

// Удаление товара из корзины
function removeFromCart(item) {
  const index = cart.value.indexOf(item);
  if (index !== -1) {
    cart.value.splice(index, 1);
  }
}
</script>

<style scoped>
.container {
  padding: 20px;
}

.cart-item {
  border: 1px solid #ddd;
  padding: 10px;
  margin-bottom: 10px;
}

.quantity-control {
  display: flex;
  align-items: center;
  gap: 10px;
}

.btn-remove {
  background-color: #f44336;
  color: white;
  padding: 5px 10px;
  border: none;
  cursor: pointer;
}

.btn-checkout {
  background-color: #4caf50;
  color: white;
  padding: 10px 20px;
  border: none;
  cursor: pointer;
}

.total {
  margin-top: 20px;
  text-align: right;
}
</style>
