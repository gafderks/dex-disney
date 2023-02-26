<script setup lang="ts">
import { useCollectableStore } from "./stores/collectable";
import CollectableItem from "./components/CollectableItem.vue";

const store = useCollectableStore();
</script>

<template>
  <h1>{{store.foundItems.size }} van {{ store.items.length }} gevonden!</h1>
  <CollectableItem v-for="(item, i) in store.items" :value="item" :key="i" />
</template>

<style scoped>

</style>
