import { reactive, ref, watch, isRef } from 'vue';
import type { Ref } from 'vue';

interface LazyListOptions<T> {
  loadCount: number;
  id: keyof T | 'id';
}

export function useLazyList<T>(list: T[] | Ref<T[]>, options?: Partial<LazyListOptions<T>>) {
  const opt = Object.assign(getDefaultOptions(), options);
  const initialList = isRef(list) ? list : ref<T[]>(list) as Ref<T[]>;
  const lazyList = ref<T[]>([]);

  watch(() => initialList.value.length, compareLazyList);

  function load() {
    const loadedItemsCount = lazyList.value.length;
    if (loadedItemsCount === initialList.value.length) {
      return;
    }

    const sliceEndIndex = Math.min(loadedItemsCount + opt.loadCount, initialList.value.length);
    const newItemsPart = initialList.value.slice(loadedItemsCount, sliceEndIndex);

    lazyList.value.push(...reactive(newItemsPart));
  }

  function compareLazyList(newLength: number, prevLength: number) {
    const newLengthDiff = newLength - prevLength;
    lazyList.value = reactive(initialList.value.slice(0, lazyList.value.length + newLengthDiff));
  }

  return {
    lazyList,
    load,
  };
}

function getDefaultOptions<T>(): LazyListOptions<T> {
  return {
    loadCount: 20,
    id: 'id',
  };
}
