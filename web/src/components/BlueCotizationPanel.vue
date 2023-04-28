<template lang="">
  <div class="flex flex-col gap-5 justify-around">
    <BaseCard :price="buy" operation="Compra" :variation="deltaBuy" />
    <BaseCard :price="sell" operation="Venta" :variation="deltaSell" />
  </div>
</template>
<script setup>
  import BaseCard from "./BaseCard.vue";
  import { onBeforeMount, ref } from "vue";
  import axios from "axios";
  import { API_URL } from "../main";

  const comparationBuy = ref();
  const buy = ref();
  const deltaBuy = ref();

  const comparationSell = ref();
  const sell = ref();
  const deltaSell = ref();

  async function getLastPrices() {
    const response = await axios.get(`${API_URL}blue/last`);
    return response.data;
  }

  async function refreshData() {
    const data = await getLastPrices();
    buy.value = data[0].buyPrice;
    sell.value = data[0].sellPrice;
    comparationBuy.value = data[1].buyPrice;
    comparationSell.value = data[1].sellPrice;
    deltaBuy.value = comparePrices(comparationBuy.value, buy.value);
    deltaSell.value = comparePrices(comparationSell.value, sell.value);
  }

  function comparePrices(oldValue, newValue) {
    if (newValue > oldValue) return 1;
    if (newValue == oldValue) return 0;
    if (newValue < oldValue) return -1;
  }

  setInterval(async () => {
    await refreshData();
  }, 1000 * 60 * 5);

  onBeforeMount(async () => {
    await refreshData();
  });
</script>
<style lang=""></style>
