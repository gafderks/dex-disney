<script setup lang="ts">
import { useCollectableStore } from '@/stores/collectable';
import { ref } from 'vue';

const store = useCollectableStore();


const code = ref<string>('');
const message = ref<string>('');
const messageType = ref<'success' | 'danger'>('success');

function check() {
    if (store.registerFind(code.value)) {
        message.value = 'Correcte code!'
        messageType.value = 'success';
        code.value = '';
    } else {
        message.value = 'Code is niet correct!'
        messageType.value = 'danger';
    }
    setTimeout(() => {
        message.value = '';
    }, 5000)
}

</script>

<template>
    <div class="collapse" id="collapseExample">
        <div class="card card-body">
            <form @submit.prevent="check">
                <div class="row">
                    <div class="col">
                        <input type="text" v-model="code" class="form-control" placeholder="Code" aria-label="Code">
                    </div>
                    <div class="col">
                        <button type="submit" class="btn btn-primary">Controleer</button>
                    </div>
                </div>
                <div v-if="message" :class="['alert', 'mt-3', `alert-${messageType}`]" role="alert">
                    {{ message }}
                </div>
            </form>
        </div>
    </div>
</template>