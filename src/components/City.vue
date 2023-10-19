<template>
  <div class="flex py-6 px-3 bg-weather-secondary shadow-md cursor-pointer">
    <!-- Country, city info -->
    <div class="flex flex-col flex-1">
      <h2 class="text-2xl">{{ city.country }}</h2>
      <h3 class="text-base">{{ city.city.replaceAll("-", " ") }}</h3>
    </div>

    <!-- Weather info -->
    <div class="flex flex-col gap-2">
      <p class="text-xl self-end">
        Current:
        {{ `${convertTemp(city.weather.main.temp)}` }}
      </p>
      <div class="flex gap-2">
        <span class="text-xs"
          >Highest: {{ convertTemp(city.weather.main.temp_max) }}</span
        >
        <span class="text-xs"
          >Lowest: {{ convertTemp(city.weather.main.temp_min) }}</span
        >
      </div>
    </div>
  </div>
</template>

<script setup>
import convertTemp from "../utilities/convertTemp";

// Props with city's info
defineProps({
  city: {
    type: Object,
    default: {},
  },
});
</script>
