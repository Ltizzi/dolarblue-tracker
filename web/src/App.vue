<template>
  <div class="flex flex-col bg-slate-950 justify-center items-center h-screen">
    <h1 class="text-amber-100 font-extrabold text-4xl titulo mt-2 mb-5">
      Dolar blue tracker
    </h1>

    <div class="flex flex-row w-10/12 gap-5">
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

<style>
  .titulo {
    font-family: "Castoro Titling", cursive;
  }
</style>
