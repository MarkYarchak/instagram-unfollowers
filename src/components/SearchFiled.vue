<script lang="ts" setup>
import { ref, watch } from 'vue';
import { useDebounceFn } from '@vueuse/core';
import type { Density, TextFieldVariant } from '@/constants/vuetify';

interface Props {
  label?: string;
  variant?: TextFieldVariant;
  destiny?: Density;
  color?: string;
  baseColor?: string;
  bgColor?: string;
  rounded?: boolean;
  flat?: boolean;
  autofocus?: boolean;
  clearable?: boolean;
  debounce?: number;
}
const props = defineProps<Props>();

const modelValue = defineModel<string>();

const emit = defineEmits(['blur']);

watch(() => modelValue.value, (val) => (search.value = val || ''));
const search = ref<string>(modelValue.value || '');

const onSearchDebounce = useDebounceFn(onSearch, props.debounce);

function onSearch(value: string) {
  modelValue.value = value;
}
</script>

<template>
  <v-text-field
    v-model="search"
    :label="label || 'Search'"
    :variant="variant || 'solo'"
    :color="color"
    :base-color="baseColor"
    :bg-color="bgColor"
    :clearable="clearable"
    :autofocus="autofocus"
    :rounded="rounded"
    :density="destiny"
    :flat="flat"
    hide-details
    class="mx-1"
    @blur="emit('blur', $event)"
    @update:model-value="debounce ? onSearchDebounce($event) : onSearch($event)"
  />
</template>
