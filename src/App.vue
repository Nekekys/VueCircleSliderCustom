<script setup>
 import CircleSliderCustom from './components/CircleSliderCustom.vue'
 import {ref} from "vue";

 const sliderValue = ref(0)

 const click = () => {
  sliderValue.value++
 }
</script>

<template>
 <CircleSliderCustom v-model:value="sliderValue" >{{sliderValue}}</CircleSliderCustom>
 <input v-model="sliderValue" type="number">
 <button @click="click">+</button>
</template>

