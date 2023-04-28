<template lang="">
  <div>
    <a
      href="#"
      class="block max-w-sm p-6 bg-slate-900 rounded-lg shadow hover:bg-slate-800 w-full"
    >
      <h5
        :class="[
          'mb-2 text-2xl font-bold text-amber-400 tracking-tight',
          props.variation == 1 ? 'text-green-600' : '',
          props.variation == -1 ? 'text-red-600' : '',
        ]"
      >
        ${{ props.price }}
      </h5>
      <p class="font-normal text-gray-400">
        {{ props.operation }}
      </p>
    </a>
  </div>
</template>
<script setup>
  import { defineProps } from "vue";

  const props = defineProps({
    price: {
      type: Number,
      required: true,
    },
    operation: {
      type: String,
      required: true,
    },
    variation: {
      type: Number,
      required: true,
    },
  });
</script>
