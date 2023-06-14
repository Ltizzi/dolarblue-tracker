<template lang="">
  <div>
    <div class="flex flex-row gap-5">
      <button
        class="bg-rose-600 hover:bg-rose-800 text-white rounded-lg py-0.5 px-1"
        @click="showTable(30)"
      >
        30'
      </button>
      <button
        class="bg-rose-600 hover:bg-rose-800 text-white rounded-lg py-0.5 px-1"
        @click="showTable(60)"
      >
        1h
      </button>
      <button
        class="bg-rose-600 hover:bg-rose-800 text-white rounded-lg py-0.5 px-1"
        @click="showTable(360)"
      >
        6h
      </button>
    </div>
    <div id="chart">
      <apexchart
        :options="options"
        :series="series"
        ref="chart"
        v-show="show30"
      />
      <apexchart
        :options="options"
        :series="series_hour"
        ref="chart2"
        v-show="show60"
      />
      <apexchart
        :options="options"
        :series="series_six"
        ref="chart3"
        v-if="show360"
      />
    </div>
  </div>
</template>
<script setup>
  import axios from "axios";
  import { API_URL } from "../main";
  import { ref, onBeforeMount, toRef } from "vue";
  import ApexCharts from "apexcharts";
  import VueApexCharts from "vue3-apexcharts";

  const data = ref([]);

  const dataHour = ref([]);
  const dataSixHour = ref([]);

  const chartRef = toRef(ref, "chart");

  const rawData = ref();

  const series = ref([
    {
      name: "candle",
      data: data.value,
    },
  ]);

  const series_hour = ref([
    {
      name: "candle",
      data: dataHour.value,
    },
  ]);

  const series_six = ref([
    {
      name: "candle",
      data: dataSixHour.value,
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
    prepareData60();
    // prepareData(INTERVALO_6_HORAS);
  }, 1000 * 60 * 30);

  const dataPorIntervalo = {};
  const INTERVALO = 30 * 60 * 1000;
  const INTERVALO_HORA = 60 * 60 * 1000;
  const INTERVALO_6_HORAS = 6 * 60 * 60 * 1000;

  const show30 = ref(true);
  const show60 = ref(false);
  const show360 = ref(false);

  function showTable(valor) {
    if (valor == 30) {
      show30.value = true;
      show60.value = false;
      show360.value = false;
    }
    if (valor == 60) {
      show30.value = false;
      show60.value = true;
      show360.value = false;
    }
    if (valor == 360) {
      show30.value = false;
      show60.value = false;
      show360.value = true;
    }
  }

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
    let lastCloser = 0;

    //let array = [];

    for (const intervalo of Object.keys(dataPorIntervalo)) {
      const objetos = dataPorIntervalo[intervalo];
      const x = Number(intervalo);
      let o = objetos[0].sellPrice; //apertura
      if (lastCloser != o) {
        o = lastCloser;
      }
      const c = objetos[objetos.length - 1].sellPrice; //cierre
      lastCloser = c;
      const l = Math.min(...objetos.map((obj) => obj.sellPrice)); // mínimo
      const h = Math.max(...objetos.map((obj) => obj.sellPrice)); //maximo

      data.value.push({ x: new Date(x), y: [o, h, l, c] });
    }
  }

  function prepareData60() {
    console.log(rawData.value);
    rawData.value.forEach((value) => {
      const timeStamp = new Date(value.createdAt).getTime();

      const intervalo = Math.floor(timeStamp / INTERVALO_HORA) * INTERVALO_HORA;

      if (!dataPorIntervalo[intervalo]) {
        dataPorIntervalo[intervalo] = [];
      }
      dataPorIntervalo[intervalo].push(value);
    });
    let lastCloser = 0;

    //let array = [];

    for (const intervalo of Object.keys(dataPorIntervalo)) {
      const objetos = dataPorIntervalo[intervalo];
      const x = Number(intervalo);
      let o = objetos[0].sellPrice; //apertura
      if (lastCloser != o) {
        o = lastCloser;
      }
      const c = objetos[objetos.length - 1].sellPrice; //cierre
      lastCloser = c;
      const l = Math.min(...objetos.map((obj) => obj.sellPrice)); // mínimo
      const h = Math.max(...objetos.map((obj) => obj.sellPrice)); //maximo

      dataHour.value.push({ x: new Date(x), y: [o, h, l, c] });
    }
  }

  function prepareData360() {
    console.log(rawData.value);
    rawData.value.forEach((value) => {
      const timeStamp = new Date(value.createdAt).getTime();

      const intervalo =
        Math.floor(timeStamp / INTERVALO_6_HORAS) * INTERVALO_6_HORAS;

      if (!dataPorIntervalo[intervalo]) {
        dataPorIntervalo[intervalo] = [];
      }
      dataPorIntervalo[intervalo].push(value);
    });
    let lastCloser = 0;

    //let array = [];

    for (const intervalo of Object.keys(dataPorIntervalo)) {
      const objetos = dataPorIntervalo[intervalo];
      const x = Number(intervalo);
      let o = objetos[0].sellPrice; //apertura
      if (lastCloser != o) {
        o = lastCloser;
      }
      const c = objetos[objetos.length - 1].sellPrice; //cierre
      lastCloser = c;
      const l = Math.min(...objetos.map((obj) => obj.sellPrice)); // mínimo
      const h = Math.max(...objetos.map((obj) => obj.sellPrice)); //maximo

      dataSixHour.value.push({ x: new Date(x), y: [o, h, l, c] });
    }
  }

  onBeforeMount(async () => {
    rawData.value = await getBlueValues();
    prepareData();
    prepareData60();
    prepareData360();
  });
</script>
