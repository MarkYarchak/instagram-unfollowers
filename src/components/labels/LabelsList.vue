<script lang="ts" setup>
import { useLazyList } from '@/composables/lazy-list';
import type { AccountLabel } from '@/db/account-labels-db';
import type { InfiniteScrollLoadOptions } from '@/constants/vuetify';

interface Props {
  items: AccountLabel[];
}

const props = defineProps<Props>();

const { lazyList, load } = useLazyList<AccountLabel>(props.items);

load();

function onLoad({ done }: InfiniteScrollLoadOptions) {
  load();

  if (lazyList.value.length !== props.items.length) {
    return done('ok');
  }
  done('empty');
}
</script>

<template>
  <v-infinite-scroll
    margin="500"
    @load="onLoad"
  >
    <v-list>
      <v-list-subheader>You have whitelisted {{ items.length }} username(s)</v-list-subheader>
      <v-list-item
        v-for="label of items"
        :key="label.id"
      >
        <template #prepend>
          <v-list-item-media start>
            <v-avatar color="blue-grey-lighten-4" class="font-weight-bold">
              <span v-if="label.archiveId">{{ label.archiveId }}</span>
              <v-icon v-else>mdi-account-question-outline</v-icon>
            </v-avatar>
          </v-list-item-media>
        </template>

        <v-list-item-title>{{ label.username }}</v-list-item-title>
        <v-list-item-subtitle>{{ label.createDate.toLocaleString() }}</v-list-item-subtitle>

        <template #append>
          <slot name="item-append" :item="label"></slot>
        </template>
      </v-list-item>
    </v-list>
  </v-infinite-scroll>
</template>
