<template>
  <view class="recommend-info">
    <view class="recommend-title">
      <view class="title">
        <image src="/static/wntj_title.png" />
      </view>
    </view>
    <view class="goods-list">
      <view
        class="list"
        v-for="(item, index) in items"
        :key="index"
        @tap="emit('skip', 'goods')"
      >
        <view class="pictrue">
          <image :src="item.img" mode="heightFix" />
        </view>
        <view class="title-tag">
          <view class="tag">
            <text v-if="item.is_goods === 1">特价</text>
            {{ item.name }}
          </view>
        </view>
        <view class="price-info">
          <view class="user-price">
            <text class="min">￥</text>
            <text class="max">{{ item.price }}</text>
          </view>
          <view class="vip-price">
            <image src="/static/vip_ico.png" />
            <text>￥{{ item.vip_price }}</text>
          </view>
        </view>
      </view>
    </view>
  </view>
</template>

<script setup lang="ts">
type Item = {
  id: number;
  name: string;
  price: string | number;
  vip_price: string | number;
  img: string;
  is_goods: number;
};
const { items } = defineProps<{ items: Item[] }>();
const emit = defineEmits<{ (e: "skip", type: string): void }>();
</script>
