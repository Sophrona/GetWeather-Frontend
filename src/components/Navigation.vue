<template>
  <header class="sticky top-0 bg-weather-primary shadow-lg">
    <nav
      class="container flex flex-col sm:flex-row items-center justify-between gap-4 py-6"
    >
      <!-- Link to main page -->
      <RouterLink :to="{ name: 'home' }">
        <div class="flex items-center gap-3 flex-1">
          <i class="fa-solid fa-sun text-2xl"></i>
          <p class="text-2xl capitalize">Get Weather</p>
        </div>
      </RouterLink>

      <!-- Info and Add icons -->
      <div class="flex items-center gap-6">
        <i
          class="fa-solid fa-circle-info hover:text-weather-secondary duration-150 cursor-pointer"
          @click="toggleModal"
        ></i>
        <i
          @click="addCity"
          v-if="route.query.preview"
          class="fa-solid fa-plus text-xl hover:text-weather-secondary duration-150 cursor-pointer"
        ></i>
      </div>

      <!-- Info box modal-->
      <BaseModal :modal-active="modalActive" @close-modal="toggleModal">
        <div class="text-black">
          <h2 class="text-2xl mb-1">What's this?</h2>
          <ol class="list-decimal list-inside mb-4">
            <li>
              <span>This is merely a basic weather tracking app.</span>
            </li>
            <li>
              <span> It was developed with VueJS 3 and OpenWeather API. </span>
            </li>
            <li>
              <span>It just works!</span>
            </li>
          </ol>
        </div>
      </BaseModal>
    </nav>
  </header>
</template>

<script setup>
import { ref } from "vue";
import { useRoute, useRouter, RouterLink } from "vue-router";
import { uid } from "uid";
import BaseModal from "./BaseModal.vue";

const route = useRoute();
const router = useRouter();
const savedCities = ref([]);
const modalActive = ref(null);

// Add city to local storage
const addCity = () => {
  const data = localStorage.getItem("savedCities");

  if (data) {
    savedCities.value = JSON.parse(data);
  }

  const city = {
    id: uid(),
    country: route.params.country,
    city: route.params.city,
    coords: {
      lat: route.query.lat,
      lon: route.query.lon,
    },
  };

  savedCities.value.push(city);
  localStorage.setItem("savedCities", JSON.stringify(savedCities.value));

  let query = Object.assign({}, route.query);
  delete query.preview;
  query.id = city.id;
  router.replace({ query });
};

// Toggle modal box with info
const toggleModal = () => {
  modalActive.value = !modalActive.value;
};
</script>
