<template>
  <view class="addr-page">
    <scroll-view class="list" :scroll-y="true">
      <view class="card" v-for="a in addrs" :key="a.id">
        <view class="top">
          <view class="name">{{ a.name }} {{ a.phone }}</view>
          <view class="tags">
            <text class="tag" v-if="a.default">默认</text>
            <text class="tag">{{ a.label }}</text>
          </view>
        </view>
        <view class="addr">{{ a.detail }}</view>
        <view class="row">
          <label class="check">
            <checkbox :checked="a.default" @tap="setDefault(a)" />
            <text>{{ a.default ? "已默认" : "设为购物默认" }}</text>
          </label>
          <view class="ops">
            <button class="op" @tap="del(a)">删除</button>
            <button class="op" @tap="copy(a)">复制</button>
            <button class="op" @tap="edit(a)">修改</button>
          </view>
        </view>
      </view>
    </scroll-view>
    <view class="footer">
      <button class="add" @tap="addNew">新增收货地址</button>
    </view>
  </view>
</template>

<script setup lang="ts">
import { ref } from "vue";
import { onShow } from "@dcloudio/uni-app";
type Addr = {
  id: number;
  name: string;
  phone: string;
  label: string;
  detail: string;
  default: boolean;
};
const addrs = ref<Addr[]>([
  {
    id: 1,
    name: "林泽彬",
    phone: "19101543086",
    label: "家",
    detail: "广东 深圳市 龙岗区 华南城铁东物流园15栋412",
    default: true,
  },
  {
    id: 2,
    name: "林泽彬",
    phone: "19101543086",
    label: "家",
    detail: "广东 深圳市 龙岗区 平安大道1号华南城铁东物流园15栋412",
    default: false,
  },
  {
    id: 3,
    name: "林泽彬",
    phone: "19101543086",
    label: "公司",
    detail: "广西 柳州市 星辰民宿酒店(柳州海吉星批发市场)304",
    default: false,
  },
]);

function setDefault(a: Addr) {
  addrs.value.forEach((x) => (x.default = false));
  a.default = true;
}
function del(a: Addr) {
  addrs.value = addrs.value.filter((x) => x.id !== a.id);
  uni.showToast({ title: "已删除", icon: "none" });
}
function copy(a: Addr) {
  uni.setClipboardData({ data: `${a.name} ${a.phone} ${a.detail}` });
}
function edit(a: Addr) {
  try {
    uni.setStorageSync("edit-address", a);
  } catch (e) {}
  uni.navigateTo({ url: `/pages/profile/pagesMember/adress/add?id=${a.id}` });
}
function addNew() {
  uni.navigateTo({ url: "/pages/profile/pagesMember/adress/add" });
}
onShow(() => {
  try {
    const data = uni.getStorageSync("new-address");
    if (data && data.id) {
      addrs.value.unshift(data);
      uni.removeStorageSync("new-address");
    }
    const updated = uni.getStorageSync("updated-address");
    if (updated && updated.id) {
      const i = addrs.value.findIndex((x) => x.id === updated.id);
      if (i !== -1) addrs.value[i] = updated;
      else addrs.value.unshift(updated);
      if (updated.default)
        addrs.value.forEach((x) => (x.default = x.id === updated.id));
      uni.removeStorageSync("updated-address");
    }
  } catch (e) {}
});
</script>

<style lang="scss">
.addr-page {
  background: #f7f7f7;
  min-height: 100vh;
  padding-bottom: 120rpx;
}
.list {
  height: calc(100vh - 120rpx);
  padding: 12rpx 20rpx;
}
.card {
  background: #fff;
  border-radius: 16rpx;
  padding: 16rpx;
  margin-bottom: 16rpx;
}
.top {
  display: flex;
  align-items: center;
  justify-content: space-between;
}
.name {
  font-size: 28rpx;
  color: #333;
}
.tags {
  display: flex;
  gap: 8rpx;
}
.tag {
  padding: 4rpx 10rpx;
  border-radius: 8rpx;
  background: #fff1f0;
  color: #ff4d4f;
  font-size: 22rpx;
}
.addr {
  margin-top: 10rpx;
  font-size: 24rpx;
  color: #666;
}
.row {
  margin-top: 12rpx;
  display: flex;
  align-items: center;
  justify-content: space-between;
}
.check {
  display: flex;
  align-items: center;
  gap: 8rpx;
  color: #666;
}
.ops {
  display: flex;
  gap: 12rpx;
}
.op {
  height: 60rpx;
  border-radius: 30rpx;
  background: #f5f5f5;
}
.footer {
  position: fixed;
  left: 0;
  right: 0;
  bottom: env(safe-area-inset-bottom);
  background: #fff;
  padding: 16rpx 20rpx;
  box-shadow: 0 -6rpx 20rpx rgba(0, 0, 0, 0.06);
}
.add {
  width: 100%;
  height: 80rpx;
  border-radius: 40rpx;
  background: #ff4d4f;
  color: #fff;
}
</style>
