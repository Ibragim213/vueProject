<template>
  <div class="product-container">
    <!-- Индикатор загрузки -->
    <div v-if="isLoading" class="loading">Загрузка...</div>

    <!-- Сообщение об ошибке -->
    <div v-if="error" class="error">Ошибка загрузки данных: {{ error.message }}</div>

    <!-- Данные товара -->
    <div v-if="!isLoading && !error">
      <div class="product-image-placeholder">
        <img class="img" :src="product.image" :alt="product.name" />
      </div>
      <div class="product-details">
        <h1>{{ product.name }}</h1>
        <p class="material"><strong>Материал обивки:</strong> {{ product.material }}</p>

        <div class="colors">
          <p><strong>Цвет:</strong></p>
          <span
            class="color-circle"
            v-for="(color, index) in product.colors"
            :key="index"
            :style="{ backgroundColor: color }"
          ></span>
        </div>

        <div class="sizes">
          <p><strong>Размеры:</strong></p>
          <ul>
            <li v-for="(size, key) in product.sizes" :key="key">
              • <strong>{{ key }}:</strong> {{ size }}
            </li>
          </ul>
        </div>

        <div class="price-section">
          <span class="price">{{ product.price }} ₽</span>
          <span class="old-price" v-if="product.oldPrice">{{ product.oldPrice }} ₽</span>
        </div>

        <div class="description">
          <p><strong>Описание</strong></p>
          <p>{{ product.description }}</p>
        </div>

        <div class="quantity">
          <button @click="decreaseQuantity" :disabled="quantity <= 1">-</button>
          <span>{{ quantity }}</span>
          <button @click="increaseQuantity" :disabled="quantity >= 10">+</button>
        </div>

        <button class="add-to-cart" @click="addToCart(product)">Добавить в корзину</button>
      </div>
    </div>
  </div>
</template>

<script>
import axios from "axios";
import { useRoute } from "vue-router";
import { ref, onMounted } from "vue";

export default {
  setup() {
    const route = useRoute();
    const product = ref({
      colors: [],
      sizes: {},
    });
    const quantity = ref(1);
    const isLoading = ref(true);
    const error = ref(null);

    const fetchProduct = async (id) => {
      try {
        const response = await axios.get(`http://localhost:8080/api/products/${id}`);
        product.value = response.data;
      } catch (err) {
        error.value = err;
        console.error("Ошибка при загрузке товара:", err);
      } finally {
        isLoading.value = false;
      }
    };

    const decreaseQuantity = () => {
      if (quantity.value > 1) quantity.value--;
    };

    const increaseQuantity = () => {
      if (quantity.value < 10) quantity.value++;
    };

    const addToCart = (product) => {
      console.log("Товар добавлен в корзину:", product);
    };

    onMounted(() => {
      const productId = route.params.id;
      fetchProduct(productId);
    });

    return {
      product,
      quantity,
      isLoading,
      error,
      decreaseQuantity,
      increaseQuantity,
      addToCart,
    };
  },
};
</script>

<style scoped>
.product-container {
  display: flex;
  gap: 20px;
  max-width: 1000px;
  margin: auto;
  font-family: Arial, sans-serif;
}

.product-image-placeholder {
  width: 683px;
  height: 720px;
  background-color: #f5f5f5;
  border: 1px solid #ccc;
}

.product-details {
  flex: 1;
}

h1 {
  font-size: 24px;
}

.material {
  font-size: 16px;
  font-weight: bold;
}

.colors {
  display: flex;
  align-items: center;
  gap: 10px;
}

.color-circle {
  width: 20px;
  height: 20px;
  border-radius: 50%;
  border: 1px solid #aaa;
  display: inline-block;
}

.sizes {
  margin-top: 10px;
}

.price-section {
  font-size: 24px;
  font-weight: bold;
}

.old-price {
  text-decoration: line-through;
  color: gray;
  margin-left: 10px;
}

.quantity {
  display: flex;
  align-items: center;
  gap: 10px;
  margin: 10px 0;
}

.quantity button {
  width: 30px;
  height: 30px;
  font-size: 18px;
  border: 1px solid #ddd;
  background: white;
  cursor: pointer;
}

.quantity button:disabled {
  cursor: not-allowed;
  opacity: 0.5;
}

.add-to-cart {
  background-color: #4b564d;
  color: white;
  padding: 10px 20px;
  border: none;
  cursor: pointer;
  font-size: 16px;
}

.loading,
.error {
  text-align: center;
  font-size: 18px;
  margin-top: 20px;
}

.error {
  color: red;
}
</style>