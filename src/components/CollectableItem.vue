<script setup lang="ts">
import type { CollectableItem } from '@/stores/collectable';
import { computed } from 'vue';
import { useQRCode } from '@vueuse/integrations/useQRCode';


interface Props {
    value: CollectableItem;
    showQrKey?: boolean;
}

const props = withDefaults(defineProps<Props>(),
    {
        showQrKey: false,
    }
);

const fullUrl = computed(() => {
    return import.meta.env.BASE_URL + 'img/' + props.value.imageUrl
})

const pageUrl = new URL(window.location.href);
pageUrl.hash = '';

const qrcode = useQRCode(`${pageUrl}#found=${props.value.key}`);
</script>
<template>
    <div class="col">
        <div :class="['card', { 'found': value.found, 'key': showQrKey }]">
            <div class="qr" v-if="showQrKey">
                <div>Code: <code>{{ value.key }}</code></div>
                <img :src="qrcode" alt="QR code" />
            </div>
            <div class="img-container">
                <img :src="fullUrl" />
            </div>
            <div class="card-body d-print-none">
                <h5 class="card-title">{{ value.name }}</h5>
            </div>
        </div>
    </div>
</template>

<style lang="scss" scoped>
.card {
    background-color: rgba(255, 255, 255, .5);
    border-radius: 10px;
    box-shadow: 0 3px 15px rgba(100, 100, 100, 0.5);
    margin: 10px;
    padding: 20px;
    text-align: center;
    --shadow: drop-shadow(5px 5px 5px #222);

    .qr {
        font-size: 1.5em;
    }

    .img-container {
        background-color: rgba(0, 0, 0, .2);
        border-radius: 50%;
        width: 200px;
        height: 200px;
        text-align: center;
        margin: 0 auto;

        img {
            filter: brightness(0.05) var(--shadow);
            user-select: none;
            pointer-events: none;
            max-width: 90%;
            max-height: 200px;
            margin-top: 20px;
        }
    }

    .card-body {
        margin-top: 20px;

        h5 {
            margin: 15px;
            display: inline;
            font-size: 1.5rem;
        }
    }

    .card-title {
        text-shadow: 0 0 10px var(--bs-body-color);
        color: transparent;
        user-select: none;
    }

    &.found,
    &.key {
        .img-container img {
            filter: var(--shadow);
        }

        .card-title {
            text-shadow: none;
            color: var(--bs-body-color);
        }
    }
}

@media print {
    .card {
        box-shadow: none;
        border: 1px solid black;
        page-break-inside: avoid;
    }
}
</style>