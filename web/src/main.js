import { createApp } from "vue";
import "./style.css";
import App from "./App.vue";
import VueApexCharts from "vue3-apexcharts";

export const API_URL = "http://localhost:4246/v1/";

const app = createApp(App);
app.use(VueApexCharts);
app.mount("#app");
