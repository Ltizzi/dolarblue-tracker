<template lang="">
  <div>
    <canvas ref="canvas"></canvas>
  </div>
</template>
<script setup>
  import { Chart, registerables } from "chart.js";

  Chart.register(...registerables);

  const data = ref();

  const chartOptions = {
    scales: {
      x: {
        type: "time",
        time: {
          unit: "day",
        },
      },
      y: {
        ticks: {
          callback: function (value, index, values) {
            return "$" + value;
          },
        },
      },
    },
    plugins: {
      legend: {
        display: false,
      },
      tooltip: {
        callbacks: {
          label: function (context) {
            var data = context.dataset.data[context.dataIndex];
            return (
              "Apertura: $" + data,
              i +
                ", Máximo: $" +
                data.h +
                ", Mínimo: $" +
                data.l +
                ", Cierre: $" +
                data.c
            );
          },
        },
      },
    },
  };

  const ctx = this.$ref.canvas.getContext("2d");
  const chart = new Chart(ctx, {
    type: "candlestick",
    data: {
      datasets: [
        {
          label: "Dataset 1",
          data: data,
        },
      ],
    },
    options: chartOptions,
  });
</script>
<style lang=""></style>
