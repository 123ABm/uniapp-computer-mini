<template>
  <view class="inform">
    <view class="inform-info">
      <view class="picture">
        <image src="@/static/gg_ico.png" />
      </view>
      <view class="info">
        <swiper class="swiper" :circular="true" :vertical="true" :indicator-dots="false" :autoplay="true" :interval="3000" :duration="1000">
          <swiper-item v-for="(text, idx) in notices" :key="idx">
            <view class="swiper-item" @tap="emit('skip','inform')">
              <text class="one-omit">{{ text }}</text>
            </view>
          </swiper-item>
        </swiper>
      </view>
    </view>
  </view>
</template>

<script setup lang="ts">
const { notices } = defineProps<{ notices: string[] }>()
const emit = defineEmits<{ (e:'skip', type:string): void }>()
</script>