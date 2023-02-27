<script setup lang="ts">
import { useCollectableStore } from "./stores/collectable";
import CollectableItem from "./components/CollectableItem.vue";
import FormAddManual from "./components/FormAddManual.vue";
import { useUrlSearchParams } from "@vueuse/core";
import { computed } from "vue";

const store = useCollectableStore();
const params = useUrlSearchParams('hash-params');
const showKey = computed(() => params.key === 'leiding');
</script>

<template>
  <div class="container">
    <header class="d-print-none">
      <h1 class="display-1">DEX</h1>
      <p class="lead">
        {{ store.foundItems.size }} van {{ store.items.length }} gevonden!
        <a href="#" class="btn btn-secondary" type="button" data-bs-toggle="collapse" data-bs-target="#collapseExample"
          aria-expanded="false" aria-controls="collapseExample">
          Handmatig code invoeren
        </a>
      </p>
      <FormAddManual />
    </header>
    <div class="d-flex flex-row justify-content-center align-items-center flex-wrap">
      <CollectableItem :show-qr-key="showKey" v-for="(item, i) in store.items" :value="item" :key="i" />
    </div>
  </div>
</template>

<style>
body {
  background-image: linear-gradient(to top, #fddb92 0%, #d1fdff 100%);
}
</style>
