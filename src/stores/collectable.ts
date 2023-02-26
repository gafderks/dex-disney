import { ref, computed, watchEffect, watch } from 'vue'
import { defineStore } from 'pinia'
import { useUrlSearchParams, useLocalStorage } from '@vueuse/core'; 
import pokemon from './pokemon.json';

export interface CollectableItem {
  key: string;
  imageUrl: string;
  name: string;
  found: boolean;
}

export const useCollectableStore = defineStore('collectable', () => {
  
  const inventory : Omit<CollectableItem, "found">[] = pokemon;

  const foundItems = useLocalStorage('foundItems', new Set<string>())
  
  const items = computed<CollectableItem[]>(() => {
    return inventory.map(item => {
      return {
        ...item,
        found: foundItems.value.has(item.key),
      };
    });
  });

  function registerFind(key: string) {
    if (items.value.find(item => item.key === key)) {
      foundItems.value.add(key);
    }
  }
  
  watchEffect(() => {
    const params = useUrlSearchParams('hash-params');
    console.log('params', params);
    if (params.found && typeof params.found === 'string') {
      registerFind(params.found);
    }
  });  

  return { items, foundItems, registerFind }
})
