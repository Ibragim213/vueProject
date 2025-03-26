<template>
  <div v-if="user">
    <h1>{{ user.name }}</h1>
    <p>Email: {{ user.email }}</p>
    <p>Phone: {{ user.phone }}</p>
    <!-- Добавьте другие поля по мере необходимости -->
  </div>
  <div v-else>
    <p>Loading...</p>
  </div>
</template>

<script>
import axios from 'axios';

// Функция для извлечения куки
function getCookie(name) {
  const value = `; ${document.cookie}`;
  const parts = value.split(`; ${name}=`);
  if (parts.length === 2) return parts.pop().split(';').shift();
}

export default {
  data() {
    return {
      user: null
    };
  },
  created() {
    this.fetchUserProfile();
  },
  methods: {
    async fetchUserProfile() {
      try {
        const token = getCookie('token');
        console.log('Token:', token); // Проверка токена
        if (!token) {
          console.error('Токен отсутствует!');
          return;
        }
        console.log('User ID:', this.$route.params.id); // Проверка ID пользователя
        const response = await axios.get(`/api/users/${this.$route.params.id}`, {
          headers: {
            Authorization: `Bearer ${token}`
          }
        });
        console.log('Response Data:', response.data); // Проверка ответа
        this.user = response.data;
      } catch (error) {
        console.error('Error fetching user profile:', error);
      }
    }
  }
};
</script>
