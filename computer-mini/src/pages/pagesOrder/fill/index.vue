<template>
  <view class="order-page">
    <view class="addr-card" @tap="chooseAddr">
      <view class="addr-top">
        <text class="tag" v-if="addr.default">默认</text>
        <text class="name">{{ addr.name }} {{ addr.phone }}</text>
      </view>
      <view class="addr-detail">{{ addr.detail }}</view>
    </view>

    <view class="shop">
      <view class="shop-title">{{ shop }}</view>
      <view class="items">
        <view class="item" v-for="it in items" :key="it.id">
          <image class="cover" :src="it.image" mode="aspectFill" />
          <view class="meta">
            <text class="title">{{ it.title }}</text>
            <view class="row">
              <text class="price"
                >¥{{ it.price.toFixed ? it.price.toFixed(2) : it.price }}</text
              >
              <text class="qty">x{{ it.qty }}</text>
            </view>
          </view>
        </view>
      </view>
      <view class="delivery">
        <text>配送</text>
        <text class="delivery-type">京东快递</text>
        <text class="delivery-time">今天 15:00-21:00</text>
      </view>
    </view>

    <view class="coupon-bar">
      <text>限时本单预计省</text>
      <text class="save">20.00元</text>
      <text class="go">去抢券</text>
    </view>

    <view class="footer">
      <view class="total">¥{{ totalText }}</view>
      <button class="pay" @tap="pay">在线支付</button>
    </view>
  </view>
</template>

<script setup lang="ts">
import { ref, computed } from "vue";
import { onLoad, onShow } from "@dcloudio/uni-app";

type SimpleItem = {
  id: number;
  title: string;
  image: string;
  price: number;
  qty: number;
};
type Addr = {
  id?: number;
  name: string;
  phone: string;
  label?: string;
  detail: string;
  default?: boolean;
};

const items = ref<SimpleItem[]>([]);
const shop = ref("JD 京东自营");
const total = ref(0);
const addr = ref<Addr>({
  name: "林泽彬",
  phone: "19101543086",
  detail: "广东 深圳市 龙岗区 华南城铁东物流园15栋412",
  default: true,
});
const totalText = computed(() => total.value.toFixed(2));

onLoad(() => {
  try {
    const draft = uni.getStorageSync("order-draft");
    if (draft && draft.items) {
      items.value = draft.items || [];
      shop.value = draft.shop || shop.value;
      total.value = Number(draft.total || 0);
    }
  } catch (e) {}
});

onShow(() => {
  try {
    const def = uni.getStorageSync("addr-default");
    if (def && def.detail) addr.value = def;
    else {
      const updated = uni.getStorageSync("updated-address");
      if (updated && updated.detail) addr.value = updated;
      const created = uni.getStorageSync("new-address");
      if (created && created.detail) addr.value = created;
    }
  } catch (e) {}
});

function chooseAddr() {
  uni.navigateTo({ url: "/pages/profile/pagesMember/adress/index" });
}

function pay() {
  uni.showToast({ title: "模拟支付成功", icon: "success" });
}
</script>

<style lang="scss">
.order-page {
  background: #f7f7f7;
  padding-bottom: 120rpx;
}
.addr-card {
  margin: 20rpx;
  background: #fff;
  border-radius: 16rpx;
  padding: 16rpx;
}
.addr-top {
  display: flex;
  align-items: center;
  gap: 8rpx;
}
.tag {
  padding: 4rpx 8rpx;
  border-radius: 8rpx;
  background: #fff1f0;
  color: #ff4d4f;
  font-size: 22rpx;
}
.name {
  font-size: 26rpx;
  color: #333;
}
.addr-detail {
  margin-top: 8rpx;
  color: #666;
  font-size: 24rpx;
}
.shop {
  margin: 0 20rpx;
  background: #fff;
  border-radius: 16rpx;
  overflow: hidden;
}
.shop-title {
  padding: 16rpx;
  font-size: 26rpx;
  color: #333;
}
.items {
  padding: 0 16rpx 16rpx;
}
.item {
  display: flex;
  gap: 12rpx;
  margin-bottom: 16rpx;
}
.cover {
  width: 160rpx;
  height: 160rpx;
  border-radius: 12rpx;
}
.meta {
  flex: 1;
}
.title {
  font-size: 26rpx;
  color: #333;
  display: -webkit-box;
  -webkit-line-clamp: 2;
  -webkit-box-orient: vertical;
  overflow: hidden;
}
.row {
  display: flex;
  justify-content: space-between;
  margin-top: 8rpx;
}
.price {
  color: #ff2d2d;
  font-weight: 600;
}
.qty {
  color: #999;
}
.delivery {
  display: flex;
  gap: 12rpx;
  align-items: center;
  padding: 16rpx;
  border-top: 1rpx solid #f0f0f0;
  font-size: 24rpx;
  color: #666;
}
.delivery-type {
  color: #333;
}
.delivery-time {
  color: #ff8a00;
}
.coupon-bar {
  margin: 12rpx 20rpx;
  background: #fffbe6;
  color: #ff8a00;
  border-radius: 12rpx;
  padding: 16rpx;
  display: flex;
  align-items: center;
  gap: 10rpx;
}
.save {
  font-weight: 600;
}
.go {
  margin-left: auto;
}
.footer {
  position: fixed;
  left: 0;
  right: 0;
  bottom: env(safe-area-inset-bottom);
  background: #fff;
  box-shadow: 0 -6rpx 20rpx rgba(0, 0, 0, 0.06);
  padding: 16rpx 20rpx;
  display: flex;
  align-items: center;
  justify-content: space-between;
}
.total {
  font-size: 28rpx;
  color: #ff2d2d;
  font-weight: 600;
}
.pay {
  width: 220rpx;
  height: 72rpx;
  border-radius: 36rpx;
  background: #ff2d2d;
  color: #fff;
}
</style>
