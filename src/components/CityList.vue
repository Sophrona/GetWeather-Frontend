<template>
  <div v-for="city in savedCities" :key="city.id">
    <City :city="city" @click="goToCityView(city)" />
  </div>
  <p v-if="savedCities.length === 0">No tracked locations found.</p>
</template>

<script setup>
import { ref } from "vue";
import { useRouter } from "vue-router";
import axios from "axios";

import City from "./City.vue";

const router = useRouter();
const savedCities = ref([]);

// Fetch saved cities from local storage
const getCities = async () => {
  const data = localStorage.getItem("savedCities");

  if (!data) return;

  savedCities.value = JSON.parse(data);

  const requests = [];

  savedCities.value.forEach((city) => {
    requests.push(
      axios.get(
        `https://api.openweathermap.org/data/2.5/weather?lat=${
          city.coords.lat
        }&lon=${city.coords.lon}&appid=${
          import.meta.env.VITE_OPEN_WEATHER_API_KEY
        }&units=imperial`
      )
    );
  });

  const weather = await Promise.all(requests);

  weather.forEach((value, index) => {
    savedCities.value[index].weather = value.data;
    console.log(value.data);
  });
};

// Navigate to the chosen city page
const goToCityView = (city) => {
  router.push({
    name: "cityView",
    params: {
      country: city.country,
      city: city.city
    },
    query: {
      id: city.id,
      lat: city.coords.lat,
      lon: city.coords.lon,
    },
  });
};

await getCities();
</script>
