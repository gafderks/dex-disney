<script setup lang="ts">
import { useCollectableStore } from "./stores/collectable";
import CollectableItem from "./components/CollectableItem.vue";

const store = useCollectableStore();
</script>

<template>
  <div class="container">
    <h1>{{ store.foundItems.size }} van {{ store.items.length }} gevonden!</h1>
    <div class="row">
      <CollectableItem v-for="(item, i) in store.items" :value="item" :key="i" />
    </div>
  </div>
</template>

<style scoped></style>
