<template lang="">
  <div>
    <div id="chart">
      <apexchart :options="options" :series="series"></apexchart>
    </div>
  </div>
</template>
<script setup>
  import axios from "axios";
  import { API_URL } from "../main";
  import { ref, onBeforeMount } from "vue";
  import ApexCharts from "apexcharts";
  import VueApexCharts from "vue3-apexcharts";

  const data = ref([]);

  const rawData = ref();

  const series = ref([
    {
      name: "candle",
      data: data.value,
    },
  ]);

  const options = {
    chart: {
      type: "candlestick",
      height: 350,
      width: 600,
      background: "#0f172a",
      fontSize: "14px",
    },
    title: {
      text: "Dolar Blue Tracker",
      align: "left",
    },
    toolbar: {
      tools: {
        zoom: true,
        zoomin: true,
        zoomout: true,
        pan: false,
        reset: false,
      },
    },
    annotations: {
      xaxis: [
        {
          x: "Oct 06 14:00",
          borderColor: "#00E396",
          label: {
            borderColor: "#00E396",
            style: {
              fontSize: "12px",
              color: "#fff",
              background: "#00E396",
            },
            orientation: "horizontal",
            offsetY: 7,
            text: "Annotation Test",
          },
        },
      ],
    },
    tooltip: {
      enabled: true,
    },
    xaxis: {
      type: "datetime",
      labels: {
        style: {
          fontSize: "14px",
          color: "#0",
        },
      },
    },
    yaxis: {
      tooltip: {
        enabled: true,
        labels: {
          style: {
            fontSize: "14px",
            color: "#0",
          },
        },
      },
    },
  };

  async function getBlueValues() {
    const response = await axios.get(`${API_URL}blue/all`);
    console.log("response:", response.data);
    return response.data;
  }

  setInterval(async () => {
    rawData.value = await getBlueValues();
    prepareData();
  }, 1000 * 60 * 30);

  const dataPorIntervalo = {};
  const INTERVALO = 30 * 60 * 1000;

  function prepareData() {
    console.log(rawData.value);
    rawData.value.forEach((value) => {
      const timeStamp = new Date(value.createdAt).getTime();
      const intervalo = Math.floor(timeStamp / INTERVALO) * INTERVALO;
      if (!dataPorIntervalo[intervalo]) {
        dataPorIntervalo[intervalo] = [];
      }
      dataPorIntervalo[intervalo].push(value);
    });

    for (const intervalo of Object.keys(dataPorIntervalo)) {
      const objetos = dataPorIntervalo[intervalo];
      const x = Number(intervalo);
      const o = objetos[0].sellPrice; //apertura
      const c = objetos[objetos.length - 1].sellPrice; //cierre
      const l = Math.min(...objetos.map((obj) => obj.sellPrice)); // mínimo
      const h = Math.max(...objetos.map((obj) => obj.sellPrice)); //maximo
      data.value.push({ x: new Date(x), y: [o, h, l, c] });
    }
    console.log("data:", data.value);
  }

  onBeforeMount(async () => {
    rawData.value = await getBlueValues();
    prepareData();
  });
</script>
