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
    <div>
        <img :src="fullUrl" width="200" :class="{'found': value.found}" />
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