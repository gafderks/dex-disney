<script setup lang="ts">
import type { CollectableItem } from '@/stores/collectable';
import { computed } from 'vue';


interface Props {
    value: CollectableItem;
}

const props = defineProps<Props>();

const fullUrl = computed(() => {
    return import.meta.env.BASE_URL + 'img/' + props.value.imageUrl
})
</script>
<template>
    <div class="col">
    <div class="card" style="width: 18rem;">
        <img :src="fullUrl" width="200" :class="[{'found': value.found}, 'card-img-top']" />
        <div class="card-body">
            <h5 class="card-title">{{ value.name }}</h5>
        </div>
    </div>
</div>
</template>

<style lang="scss" scoped>
img {
    filter:brightness(0.05);

    &.found {
        filter: none;
    }
}
</style>