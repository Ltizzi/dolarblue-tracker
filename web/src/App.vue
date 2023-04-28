<template>
  <div class="flex flex-col bg-slate-950 justify-center items-center">
    <h1 class="text-white font-extrabold text-2xl">Dolar blue tracker</h1>
    <div class="h-1/2 w-3/4">
      <CandlestickGraph />
    </div>
  </div>
</template>

<script setup>
  import CandlestickGraph from "./components/CandlestickGraph.vue";
</script>
