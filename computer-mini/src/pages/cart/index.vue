<template>
  <view class="cart-page">
    <view class="header">
      <text class="addr">朝阳区三环到四环之间</text>
      <text class="manage" @tap="toggleManage">{{ manage ? '完成' : '管理' }}</text>
    </view>
    <view class="banner">
      <view class="tag">运费直降</view>
      <text class="banner-text">自营商品全场59元包邮</text>
    </view>

    <view v-if="items.length" class="shop-card">
      <view class="shop-header">
        <view class="check" :class="{ checked: allSelected }" @tap="toggleAll"></view>
        <text class="shop-name">自营店铺</text>
        <text class="shop-badge">优惠</text>
      </view>

      <view class="list">
        <view class="item" v-for="it in items" :key="it.id">
          <view class="check" :class="{ checked: it.selected }" @tap="toggle(it)"></view>
          <image class="cover" :src="it.image" mode="aspectFill" />
          <view class="meta">
            <text class="title">{{ it.title }}</text>
            <view class="sub">到手价</view>
            <view class="row">
              <text class="price">¥{{ it.price }}</text>
              <uni-number-box :min="1" :max="99" :value="it.qty" @change="onQty(it, $event)" />
            </view>
            <view class="ops" v-if="manage">
              <button class="op" @tap="moveFav(it)">移入关注</button>
              <button class="op" @tap="remove(it)">删除</button>
            </view>
          </view>
        </view>
      </view>
    </view>

    <view v-else class="empty">
      <text class="empty-text">购物车为空</text>
      <button class="go-home" @tap="goHome">去逛逛</button>
    </view>

    <view class="open-app">
      <view class="app-left">购物更便捷</view>
      <button class="open-btn">立即打开</button>
    </view>

    <view class="footer" v-if="items.length">
      <view class="left">
        <view class="check" :class="{ checked: allSelected }" @tap="toggleAll"></view>
        <text>全选</text>
      </view>
      <view class="center">
        <text class="sum">合计：<text class="sum-price">¥{{ selectedPrice }}</text></text>
        <text class="extra">不含运费</text>
      </view>
      <button class="settle">领券结算({{ selectedCount }})</button>
    </view>
  </view>
</template>

<script setup lang="ts">
import { storeToRefs } from 'pinia'
import { useCartStore, type CartItem } from '@/stores/cart'
import { ref } from 'vue'

const manage = ref(false)
const cart = useCartStore()
const { items, selectedCount, selectedPrice, allSelected } = storeToRefs(cart)

function toggleManage() { manage.value = !manage.value }
function toggle(it: CartItem) { cart.toggle(it.id) }
function toggleAll() { cart.selectAll(!allSelected.value) }
function onQty(it: CartItem, e: any) {
  const val = typeof e === 'number' ? e : (e && e.value != null ? e.value : it.qty)
  cart.setQty(it.id, val)
}
function remove(it: CartItem) { cart.remove(it.id); uni.showToast({ title: '已删除', icon: 'none' }) }
function moveFav(_it: CartItem) { uni.showToast({ title: '已移入关注', icon: 'none' }) }
function goHome() { uni.switchTab({ url: '/pages/index/index' }) }
</script>

<style lang="scss">
.cart-page { background: #f7f7f7; padding-bottom: 120rpx; }
.header { display: flex; justify-content: space-between; align-items: center; padding: 16rpx 20rpx; background: #fff; }
.addr { font-size: 24rpx; color: #333; }
.manage { font-size: 26rpx; color: #1a7fff; }
.banner { margin: 12rpx 20rpx; padding: 16rpx; background: #fff1f0; border-radius: 12rpx; display: flex; align-items: center; gap: 12rpx; }
.tag { background: #ff4d4f; color: #fff; border-radius: 8rpx; padding: 6rpx 12rpx; font-size: 22rpx; }
.banner-text { color: #ff4d4f; font-size: 24rpx; }
.shop-card { margin: 0 20rpx; background: #fff; border-radius: 16rpx; overflow: hidden; }
.shop-header { display: flex; align-items: center; gap: 10rpx; padding: 16rpx; border-bottom: 1rpx solid #f0f0f0; }
.shop-name { font-size: 26rpx; color: #333; }
.shop-badge { margin-left: auto; background: #ff8a4d; color: #fff; border-radius: 8rpx; padding: 6rpx 12rpx; font-size: 22rpx; }
.check { width: 32rpx; height: 32rpx; border-radius: 16rpx; border: 2rpx solid #ff2d2d; }
.check.checked { background: #ff2d2d; }
.list { padding: 16rpx; }
.item { display: flex; align-items: center; gap: 12rpx; margin-bottom: 16rpx; }
.cover { width: 160rpx; height: 160rpx; border-radius: 12rpx; }
.meta { flex: 1; }
.title { font-size: 26rpx; color: #333; display: -webkit-box; -webkit-line-clamp: 2; -webkit-box-orient: vertical; overflow: hidden; }
.sub { color: #999; font-size: 22rpx; margin-top: 6rpx; }
.row { display: flex; align-items: center; justify-content: space-between; margin-top: 8rpx; }
.price { color: #ff2d2d; font-size: 30rpx; font-weight: 600; }
.ops { margin-top: 12rpx; display: flex; gap: 12rpx; }
.op { height: 60rpx; border-radius: 30rpx; background: #f5f5f5; }
.open-app { margin: 20rpx; background: #fff; border-radius: 16rpx; display: flex; align-items: center; justify-content: space-between; padding: 20rpx; }
.app-left { font-size: 26rpx; color: #333; }
.open-btn { width: 200rpx; height: 72rpx; background: #ff2d2d; color: #fff; border-radius: 36rpx; }
.footer { position: fixed; left: 0; right: 0; bottom: env(safe-area-inset-bottom); background: #fff; box-shadow: 0 -6rpx 20rpx rgba(0,0,0,.06); padding: 16rpx 20rpx; display: flex; align-items: center; }
.left { display: flex; align-items: center; gap: 10rpx; }
.center { flex: 1; display: flex; flex-direction: column; padding-left: 12rpx; }
.sum { font-size: 26rpx; }
.sum-price { color: #ff2d2d; font-weight: 600; }
.extra { color: #999; font-size: 22rpx; }
.settle { width: 240rpx; height: 72rpx; background: #ff2d2d; color: #fff; border-radius: 36rpx; }
.empty { padding: 60rpx 20rpx; display: flex; flex-direction: column; align-items: center; gap: 20rpx; }
.empty-text { font-size: 28rpx; color: #999; }
.go-home { width: 240rpx; height: 72rpx; }
</style>