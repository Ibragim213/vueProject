<template>
    <router-view />  
    <HeaderComponent/>
     <OnasSection1/>
   
  </template>
  <script>


import OnasSection1 from '@/components-mainpage/OnasSection1.vue';

import HeaderComponent from '@/crosscomponents/HeaderComponent.vue';


 // тут собираем страницу что будет входить в нее
  export default {
    name: 'OnasPage',
    components: {
        HeaderComponent,
        OnasSection1,

    },
  };
  </script>