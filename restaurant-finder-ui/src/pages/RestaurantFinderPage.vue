<template>
  <q-page class="q-pa-md">
    <div class="column items-center q-gutter-md">
      <div class="text-h4">Smart Restaurant Finder</div>
      <q-btn
        label="Find Restaurants Near Me"
        color="primary"
        @click="handleFindRestaurants"
        :loading="isLoading"
        :disable="isLoading"
      />
      <q-spinner v-if="isLoading" size="40px" color="primary" />

      <q-banner v-if="error" class="bg-red text-white">
        {{ error }}
      </q-banner>

      <div v-if="suggestions.length > 0" class="q-mt-md" style="width: 100%; max-width: 600px;">
        <q-card v-for="s in suggestions" :key="s.name" class="q-mb-md">
          <q-card-section>
            <div class="text-h6">{{ s.name }}</div>
            <div class="text-subtitle2">{{ s.address }}</div>
            <div class="q-mt-sm">Cuisine: {{ s.cuisine }}</div>
            <div class="q-mt-sm text-grey-8">{{ s.justification }}</div>
            <div class="q-mt-sm"><strong>Try:</strong> {{ s.suggestedDish }}</div>
          </q-card-section>
        </q-card>
      </div>
    </div>
  </q-page>
</template>

<script setup lang="ts">
import { ref } from 'vue';
import { getSuggestions } from 'src/services/api';
import type { RestaurantSuggestion } from '../types';

const isLoading = ref(false);
const error = ref<string | null>(null);
const suggestions = ref<RestaurantSuggestion[]>([]);

const handleFindRestaurants = () => {
  error.value = null;
  isLoading.value = true;
  suggestions.value = [];

  try {
    navigator.geolocation.getCurrentPosition(
      (position) => {
        void (async () => {
          const { latitude, longitude } = position.coords;
          suggestions.value = await getSuggestions({ latitude, longitude });
          isLoading.value = false;
        })();
      },
      () => {
        error.value = 'Failed to get your location';
        isLoading.value = false;
      }
    );
  } catch {
    error.value = 'Something went wrong while fetching suggestions.';
    isLoading.value = false;
  }
};
</script>
