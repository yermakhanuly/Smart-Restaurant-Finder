<template>
  <q-page class="q-pa-md bg-grey-2">
    <div class="column items-center q-gutter-md" style="min-height: 100vh;">
      <div class="q-mt-xl q-mb-lg text-center">
        <div class="text-h3 text-primary q-mb-sm">🍽️ Smart Restaurant Finder</div>
        <div class="text-subtitle1 text-grey-7">
          Discover healthy restaurants near you, tailored to your preferences!
        </div>
      </div>

      <q-btn
        label="Find Restaurants Near Me"
        color="primary"
        size="lg"
        icon="place"
        @click="handleFindRestaurants"
        :loading="isLoading"
        :disable="isLoading"
        class="q-mb-md"
        unelevated
        rounded
      />

      <q-spinner v-if="isLoading" size="40px" color="primary" class="q-mt-md" />

      <q-banner v-if="error" class="bg-red text-white q-mb-md" rounded>
        <q-icon name="error" class="q-mr-sm" />
        {{ error }}
      </q-banner>

      <div v-if="suggestions.length > 0" class="q-mt-md" style="width: 100%; max-width: 600px;">
        <transition-group name="fade" tag="div">
          <q-card
            v-for="s in suggestions"
            :key="s.name"
            class="q-mb-lg shadow-4"
            style="border-radius: 18px;"
          >
            <q-card-section>
              <div class="row items-center q-mb-xs">
                <q-icon name="restaurant" color="primary" class="q-mr-sm" />
                <div class="text-h6 text-primary">{{ s.name }}</div>
              </div>
              <div class="text-subtitle2 text-grey-8 q-mb-xs">
                <q-icon name="place" size="18px" class="q-mr-xs" />
                {{ s.address }}
              </div>
              <div class="q-mt-sm">
                <q-icon name="local_dining" size="18px" class="q-mr-xs" />
                <span class="text-weight-medium">Cuisine:</span> {{ s.cuisine }}
              </div>
              <div class="q-mt-sm text-grey-8">
                <q-icon name="info" size="18px" class="q-mr-xs" />
                {{ s.justification }}
              </div>
              <div class="q-mt-sm">
                <q-icon name="star" color="amber" size="18px" class="q-mr-xs" />
                <strong>Try:</strong> {{ s.suggestedDish }}
              </div>
            </q-card-section>
          </q-card>
        </transition-group>
      </div>
    </div>
  </q-page>
</template>

<script setup lang="ts">
import { ref } from 'vue';
import { getSuggestions } from 'src/services/api';
import type { RestaurantSuggestion } from 'src/types';

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

<style scoped>
.fade-enter-active, .fade-leave-active {
  transition: opacity 0.5s;
}
.fade-enter, .fade-leave-to {
  opacity: 0;
}
</style>