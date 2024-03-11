import { ref, computed, watchEffect, watch } from 'vue'
import { defineStore } from 'pinia'
import { useUrlSearchParams, useLocalStorage } from '@vueuse/core';
import pokemon from './characters.json';

export interface CollectableItem {
  key: string;
  imageUrl: string;
  name: string;
  found: boolean;
}

export const useCollectableStore = defineStore('collectable', () => {

  const inventory: Omit<CollectableItem, "found">[] = pokemon.map(item => {
    return {
      ...item,
      key: item.key.toUpperCase()
    }
  });

  const foundItems = useLocalStorage('foundItems', new Set<string>())

  const items = computed<CollectableItem[]>(() => {
    return inventory.map(item => {
      return {
        ...item,
        found: foundItems.value.has(item.key),
      };
    });
  });

  function registerFind(key: string): boolean {
    if (items.value.find(item => item.key === key)) {
      foundItems.value.add(key);
      document.getElementById(key)?.scrollIntoView({
        behavior: 'smooth',
        block: 'center',
      });
      return true;
    }
    return false;
  }

  watchEffect(() => {
    const params = useUrlSearchParams('hash-params');
    if (params.found && typeof params.found === 'string') {
      registerFind(params.found);
    }
    if (params.reset) {
      foundItems.value.clear();
    }
  });

  return { items, foundItems, registerFind }
})
