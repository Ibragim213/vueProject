<template>
      <router-view />  
    <HeaderComponent />
    <CorzinSection />
  </template>
  
  <script>
  import CorzinSection from '@/components-mainpage/CorzinSection.vue';
  import HeaderComponent from '@/crosscomponents/HeaderComponent.vue';
  
  export default {
    name: 'CorzinaPage',
    components: {
      HeaderComponent,
      CorzinSection,
    },
  };
  </script>
  