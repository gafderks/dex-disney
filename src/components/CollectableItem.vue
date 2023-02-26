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
        <div :class="['card', { 'found': value.found }]" style="width: 18rem;">
            <img :src="fullUrl" width="200" class="card-img-top" />
            <div class="card-body">
                <h5 class="card-title">{{ value.name }}</h5>
            </div>
        </div>
    </div>
</template>

<style lang="scss" scoped>
.card {
    img {
        filter: brightness(0.05);
        user-select: none;
        pointer-events: none;
    }

    .card-title {
        text-shadow: 0 0 10px var(--bs-body-color);
        color: transparent;
        user-select: none;
    }

    &.found {
        img {
            filter: none;
        }

        .card-title {
            text-shadow: none;
            color: var(--bs-body-color);
        }
    }
}
</style>