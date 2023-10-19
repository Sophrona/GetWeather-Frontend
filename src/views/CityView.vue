<template>
  <div>
    <Suspense>
      <AsyncCityView />
      <template #fallback>
        <Loader/>
      </template>
    </Suspense>
  </div>
</template>

<script setup>
import AsyncCityView from "../components/AsyncCityView.vue";
import Loader from "../components/Loader.vue";
</script>
