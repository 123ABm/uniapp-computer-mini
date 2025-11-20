<template>
  <view class="setting-page">
    <view class="header">
      <text class="title">账户设置</text>
    </view>
    <view class="account-card">
      <view class="avatar">👤</view>
      <view class="info">
        <text class="name">{{ alias }}</text>
        <text class="sub">当前登录</text>
      </view>
    </view>

    <view class="list">
      <view class="cell" @tap="toast('管理我的地址')">
        <text>收货地址管理</text>
        <text class="cell-sub">管理我的地址</text>
      </view>
      <view class="cell" @tap="toast('账户与安全')">
        <text>账户与安全</text>
        <text class="cell-sub">密码/实名认证等管理</text>
      </view>
      <view class="cell" @tap="toast('支付密码')">
        <text>京东支付密码</text>
        <text class="cell-sub">已设置</text>
      </view>
      <view class="cell" @tap="toast('隐私设置')">
        <text>隐私设置</text>
      </view>
      <view class="cell" @tap="toast('联系客服')">
        <text>联系客服</text>
        <text class="cell-sub">即时解答用户疑惑</text>
      </view>
      <view class="cell" @tap="toast('切换站点')">
        <text>切换站点</text>
      </view>
    </view>

    <view class="bottom-menu">
      <button class="bm-btn" @tap="toast('意见反馈')">意见反馈</button>
      <button class="bm-btn" @tap="toast('京东客户端')">京东客户端</button>
      <button class="bm-btn danger" @tap="logout">退出登录</button>
    </view>
  </view>
</template>

<script setup lang="ts">
import { computed } from 'vue'
import { useAuthStore } from '@/stores/auth'
const auth = useAuthStore()
const alias = computed(() => auth.phone ? auth.phone.replace(/(\d{3})\d{4}(\d{4})/, '$1****$2') : '用户'+(auth.token||'').slice(-4))

function toast(t: string) { uni.showToast({ title: t, icon: 'none' }) }
function logout() { auth.logout(); uni.showToast({ title: '已退出登录', icon: 'none' }); setTimeout(()=>uni.navigateBack(), 200) }
</script>

<style lang="scss">
.setting-page { background: #f7f7f7; min-height: 100vh; }
.header { height: 88rpx; display: flex; align-items: center; justify-content: center; background: #fff; border-bottom: 1rpx solid #f0f0f0; }
.title { font-size: 30rpx; }
.account-card { margin: 20rpx; background: #fff; border-radius: 16rpx; display: flex; align-items: center; gap: 12rpx; padding: 20rpx; border: 1rpx solid #ffd6d6; }
.avatar { width: 96rpx; height: 96rpx; border-radius: 48rpx; background: #f1f4fa; display: flex; align-items: center; justify-content: center; font-size: 40rpx; }
.info { display: flex; flex-direction: column; }
.name { font-size: 28rpx; color: #333; }
.sub { font-size: 22rpx; color: #ff4d4f; }
.list { margin: 0 20rpx; background: #fff; border-radius: 16rpx; overflow: hidden; }
.cell { display: flex; align-items: center; justify-content: space-between; padding: 24rpx 20rpx; border-bottom: 1rpx solid #f0f0f0; }
.cell-sub { color: #999; font-size: 22rpx; }
.bottom-menu { margin: 20rpx; display: grid; grid-template-columns: repeat(3, 1fr); gap: 12rpx; }
.bm-btn { height: 72rpx; border-radius: 36rpx; background: #f5f5f5; }
.bm-btn.danger { background: #ff4d4f; color: #fff; }
</style>