<template>
  <view class="new-product">
    <view class="product-title">
      <view class="title">
        <image src="/static/hr_ico.png" />
        <text>今日上新</text>
      </view>
      <view class="describe">
        <text>今日上新商品是否有你心仪礼物</text>
      </view>
    </view>
    <view class="goods-list">
      <view
        class="list"
        v-for="(item, i) in items"
        :key="i"
        @tap="emit('skip', 'goods')"
      >
        <view class="pictrue">
          <image :src="item.img" />
        </view>
        <view class="price">
          <text class="selling-price">￥{{ item.price }}</text>
          <text class="original-price">￥{{ item.original }}</text>
        </view>
      </view>
    </view>
  </view>
</template>

<script setup lang="ts">
type Item = { img: string; price: number; original: number };
const { items } = defineProps<{ items: Item[] }>();
const emit = defineEmits<{ (e: "skip", type: string): void }>();
</script>
