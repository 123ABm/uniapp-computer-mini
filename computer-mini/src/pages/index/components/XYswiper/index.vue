<template>
  <swiper
    class="hero-swiper"
    indicator-dots
    indicator-color="#c0c0c0"
    indicator-active-color="#ffffff"
    circular
    autoplay
    interval="3000"
  >
    <swiper-item v-for="b in banners" :key="b.id" @tap="goProduct(b)">
      <image class="banner-image" :src="b.image" mode="aspectFill" />
    </swiper-item>
  </swiper>
</template>

<script setup lang="ts">
type Banner = {
  id: number;
  title: string;
  image: string;
  price: number;
  promo?: string;
  images?: string[];
};
const { banners } = defineProps<{ banners: Banner[] }>();

function goDetail(p: Banner) {
  try {
    uni.setStorageSync("selected-product", p);
  } catch (e) {}
  uni.navigateTo({ url: "/pages/product/detail" });
}

function goProduct(b: Banner) {
  goDetail(b);
}
</script>

<style lang="scss">
.hero-swiper {
  margin: 20rpx;
  height: 280rpx;
  border-radius: 20rpx;
  overflow: hidden;
}
.banner-image {
  width: 100%;
  height: 100%;
}
</style>
