<template>
  <div class="loader w-full h-[300px] flex items-center justify-center">
    <scaling-squares-spinner
      :animation-duration="1250"
      :size="65"
      color="#f2f3f4"
    />
  </div>
</template>

<script setup>
// import "epic-spinners/dist/lib/epic-spinners.min.css";
import { ScalingSquaresSpinner } from "epic-spinners";
</script>
