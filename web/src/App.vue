<template>
  <div class="flex flex-col bg-slate-950 justify-center items-center h-screen">
    <h1 class="text-white font-extrabold text-2xl">Dolar blue tracker</h1>

    <div class="flex flex-row w-10/12 gap-2">
      <div class="h-1/2 w-5/6">
        <CandlestickGraph />
      </div>
      <BlueCotizationPanel class="w-1/6" />
    </div>
  </div>
</template>

<script setup>
  import CandlestickGraph from "./components/CandlestickGraph.vue";
  import BlueCotizationPanel from "./components/BlueCotizationPanel.vue";
</script>
