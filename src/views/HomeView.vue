<template>
  <main class="container">
    <div class="pt-4 mb-8 relative">
      <!-- Search field -->
      <input
        v-model="searchQuery"
        @input="getSearchResults"
        type="text"
        placeholder="Search city..."
        class="py-2 px-1 w-full bg-transparent border-b border-1 border-solid border-gray-300 focus:outline-none focus:shadow-[0px_1px_0_0_#1fa7a0]"
      />

      <!-- Suggested cities list -->
      <ul
        v-if="searchResults"
        class="absolute bg-weather-secondary w-full shadow-md py-2 px-1 top-[110%]"
      >
        <p v-if="searchError">{{ `Unexpected server error >_<` }}</p>
        <p v-if="!searchError && searchResults.length === 0">
          {{ `Nothing found :(` }}
        </p>
        <template v-else>
          <li
            v-for="searchResult in searchResults"
            :key="`${searchResult?.lat}, ${searchResult?.lon}`"
            class="py-2 cursor-pointer text-sm"
            @click="viewCity(searchResult)"
          >
            {{
              `${searchResult?.name}, ${
                searchResult.state ? `${searchResult.state},` : ""
              } ${searchResult?.country}`
            }}
          </li>
        </template>
      </ul>
    </div>

    <!-- Tracked Cities -->
    <div class="flex flex-col gap-4">
      <Suspense>
        <CityList />
        <template #fallback>
          <Loader />
        </template>
      </Suspense>
    </div>
  </main>
</template>

<script setup>
import { ref } from "vue";
import { useRouter } from "vue-router";
import axios from "axios";

import getCountryName from "../utilities/getCountryName";
import Loader from "../components/Loader.vue";
import CityList from "../components/CityList.vue";

const router = useRouter();

// Navigate to the chosen city page
const viewCity = (searchResult) => {
  const { country, name, lat, lon } = searchResult;

  const countryName = getCountryName(country);

  router.push({
    name: "cityView",
    params: {
      country: countryName,
      city: name.replaceAll(" ", "-"),
    },
    query: {
      lat: lat.toFixed(2),
      lon: lon.toFixed(2),
      preview: true,
    },
  });
};

const searchQuery = ref("");
const queryTimeout = ref(null);
const searchResults = ref(null);
const searchError = ref(null);

// Fetch searched city
const getSearchResults = () => {
  clearTimeout(queryTimeout.value);

  queryTimeout.value = setTimeout(async () => {
    searchResults.value = null;

    if (searchQuery.value === "") return;

    try {
      const result = await axios.get(
        `http://api.openweathermap.org/geo/1.0/direct?q=${
          searchQuery.value
        }&limit=3&appid=${import.meta.env.VITE_OPEN_WEATHER_API_KEY}`
      );

      searchResults.value = result?.data;
    } catch (error) {
      searchError.value = true;
    }
  }, 500);
};
</script>
