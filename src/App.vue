<script setup>
 import CircleSlider from './components/CircleSlider.vue'
 import {ref} from "vue";

 const sliderValue = ref(0)

 const click = () => {
  sliderValue.value++
 }
</script>

<template>
 <CircleSlider v-model:value="sliderValue" >{{sliderValue}}</CircleSlider>
 <input v-model="sliderValue" type="number">
 <button @click="click">+</button>
</template>

