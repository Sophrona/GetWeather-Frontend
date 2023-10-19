<template>
  <div class="flex flex-col flex-1 items-center">
    <!-- Banner -->
    <div
      v-if="route.query.preview"
      class="p-4 bg-weather-secondary w-full text-center"
    >
      <p>
        This is a preview. Click the + icon to save this city for future
        tracking.
      </p>
    </div>
    <!-- Current Weather -->
    <div class="flex flex-col items-center pt-12 pb-6">
      <h1 class="text-4xl mb-2">
        {{ route.params.city.replaceAll("-", " ") }}
      </h1>
      <p class="text-sm mb-6">
        {{
          `${new Date(weather.currentTime).toLocaleDateString("en-US", {
            weekday: "long",
            day: "2-digit",
            month: "long",
          })},`
        }}
        {{
          new Date(weather.currentTime).toLocaleTimeString("en-US", {
            timeStyle: "short",
          })
        }}
      </p>
      <p class="text-7xl mb-6">
        {{ `${convertTemp(weather?.main?.temp)}` }}
      </p>
      <div class="text-center">
        <p>Feels like {{ `${convertTemp(weather?.main?.feels_like)}` }}</p>
        <p class="capitalize">{{ weather?.weather[0]?.description }}</p>
        <img
          class="w-[150px] h-auto"
          :src="`http://openweathermap.org/img/wn/${weather?.weather[0]?.icon}@2x.png`"
          alt="Weather"
        />
      </div>
    </div>
    <!-- Separator -->
    <div
      class="border-weather-tertiary border-b border-1 border-opacity-50 border-solid w-[80%]"
    ></div>
    <!-- Weather Forecast -->
    <div class="max-w-screen-md w-full py-6">
      <div class="mx-8">
        <h2 class="mb-4 text-xl capitalize">Weather Forecast</h2>
        <div class="flex gap-10 overflow-x-scroll scrollbar pb-4">
          <div
            v-for="hour in forecast?.list"
            :key="hour.dt"
            class="flex flex-col gap-4 items-center text-sm"
          >
            <p class="whitespace-nowrap text-md">
              {{
                `${new Date(hour.currentTime).toLocaleDateString("en-US", {
                  weekday: "short",
                  day: "2-digit",
                })},`
              }}
              {{
                new Date(hour.currentTime).toLocaleTimeString("en-US", {
                  hour: "numeric",
                })
              }}
            </p>
            <img
              class="w-auto h-[50px] object-cover"
              :src="`http://openweathermap.org/img/wn/${hour?.weather[0]?.icon}@2x.png`"
              alt="Weather Forecast"
            />
            <p class="text-base">
              {{ `${convertTemp(hour?.main?.temp)}` }}
            </p>
          </div>
        </div>
      </div>
    </div>
    <!-- Remove City -->
    <div v-if="!route.query.preview"
      class="flex items-center gap-2 my-8 cursor-pointer duration-150 hover:text-rose-500"
      @click="removeCity"
    >
      <i class="fa-solid fa-trash"></i>
      <p class="capitalize">Remove City</p>
    </div>
  </div>
</template>

<script setup>
import axios from "axios";
import { useRoute, useRouter } from "vue-router";
import convertTemp from "../utilities/convertTemp";
import getLocalTime from "../utilities/getLocalTime";

const route = useRoute();
const router = useRouter();

// Fetch current weather
const getWeather = async () => {
  try {
    const weather = axios
      .get(
        `https://api.openweathermap.org/data/2.5/weather?lat=${
          route.query.lat
        }&lon=${route.query.lon}&appid=${
          import.meta.env.VITE_OPEN_WEATHER_API_KEY
        }&units=imperial`
      )
      .then((response) => {
        const data = response.data;

        data.currentTime = getLocalTime(data?.dt, data?.timezone);

        return data;
      });

    return weather;
  } catch (error) {
    console.log(error);
  }
};

// Fetch 5 day forecast in 3 hour intervals
const getForecast = async () => {
  try {
    const forecast = axios
      .get(
        `https://api.openweathermap.org/data/2.5/forecast?lat=${
          route.query.lat
        }&lon=${route.query.lon}&appid=${
          import.meta.env.VITE_OPEN_WEATHER_API_KEY
        }&units=imperial`
      )
      .then((response) => {
        const data = response.data;

        data?.list.forEach((hour, index) => {
          data.list[index].currentTime = getLocalTime(
            hour?.dt,
            data?.city?.timezone
          );
        });
        return data;
      });

    return forecast;
  } catch (error) {
    console.log(error);
  }
};

// Stop tracking city
const removeCity = () => {
  const cities = JSON.parse(localStorage.getItem("savedCities"));
  const newCities = cities.filter((city) => city.id !== route.query.id);
  localStorage.setItem("savedCities", JSON.stringify(newCities));

  router.push({
    name: "home",
  });
};

const weather = await getWeather();
const forecast = await getForecast();
</script>
