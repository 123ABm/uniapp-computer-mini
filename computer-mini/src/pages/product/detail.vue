<template>
  <view class="page">
    <view v-if="product" class="detail">
      <image class="cover" :src="product.image" mode="aspectFill" />
      <view class="info">
        <text class="title">{{ product.title }}</text>
        <view class="price-row">
          <text class="price">¥{{ product.price }}</text>
          <text class="promo" v-if="product.promo">{{ product.promo }}</text>
        </view>
      </view>
      <view class="actions">
        <button class="btn cart" type="default">加入购物车</button>
        <button class="btn buy" type="primary">立即购买</button>
      </view>
      <view class="desc">
        <text>商品详情</text>
        <text class="desc-text">这是一款优选商品，图片与价格均为示例数据。</text>
      </view>
    </view>
    <view v-else class="empty">
      <text class="empty-text">未找到商品</text>
      <button class="back" @tap="goBack">返回</button>
    </view>
  </view>
</template>

<script setup lang="ts">
import { ref } from 'vue'
import { onLoad } from '@dcloudio/uni-app'

type Product = { id: number; title: string; image: string; price: number; promo?: string }

const product = ref<Product | null>(null)

onLoad(() => {
  try {
    const p = uni.getStorageSync('selected-product')
    if (p) product.value = p
  } catch (e) {}
})

function goBack() {
  uni.navigateBack()
}
</script>

<style lang="scss">
.page {
  background: #f7f7f7;
}
.detail {
  padding-bottom: 120rpx;
}
.cover {
  width: 100%;
  height: 520rpx;
}
.info {
  background: #ffffff;
  margin: 20rpx;
  border-radius: 16rpx;
  padding: 20rpx;
}
.title {
  font-size: 30rpx;
  color: #333333;
}
.price-row {
  margin-top: 12rpx;
  display: flex;
  align-items: center;
  gap: 12rpx;
}
.price {
  color: #ff2d2d;
  font-size: 36rpx;
  font-weight: 600;
}
.promo {
  padding: 6rpx 12rpx;
  border-radius: 8rpx;
  background: #ff4d4f;
  color: #ffffff;
  font-size: 22rpx;
}
.actions {
  position: fixed;
  left: 0;
  right: 0;
  bottom: env(safe-area-inset-bottom);
  display: flex;
  gap: 16rpx;
  padding: 16rpx 20rpx;
  background: #ffffff;
  box-shadow: 0 -6rpx 20rpx rgba(0, 0, 0, 0.06);
}
.btn {
  flex: 1;
  height: 80rpx;
  border-radius: 40rpx;
  font-size: 28rpx;
}
.cart {
  background: #f5f5f5;
}
.buy {
  background: #ff2d2d;
  color: #ffffff;
}
.desc {
  background: #ffffff;
  margin: 20rpx;
  border-radius: 16rpx;
  padding: 20rpx;
}
.desc-text {
  margin-top: 12rpx;
  font-size: 24rpx;
  color: #666666;
}
.empty {
  padding: 60rpx 20rpx;
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 20rpx;
}
.empty-text {
  font-size: 28rpx;
  color: #999999;
}
.back {
  width: 240rpx;
  height: 72rpx;
}
</style>