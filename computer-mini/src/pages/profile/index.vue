<template>
  <view class="login-page">
    <view class="header">
      <text class="title">{{ isLoggedIn ? "我的京东" : "京东登录注册" }}</text>
    </view>
    <view v-if="!isLoggedIn" class="form">
      <view class="form-item">
        <text class="prefix">+86</text>
        <input
          class="input"
          type="number"
          placeholder="请输入手机号"
          v-model="phone"
        />
      </view>
      <view class="form-item">
        <input
          class="input"
          type="number"
          placeholder="请输入收到的验证码"
          v-model="code"
        />
        <button class="send" :disabled="countdown > 0" @tap="sendCode">
          {{ countdown > 0 ? countdown + "s" : "获取验证码" }}
        </button>
      </view>
      <button class="submit" :disabled="!agree" @tap="submit">
        同意协议并登录
      </button>
      <view class="tabs">
        <text class="tab">账号密码登录</text>
        <text class="tab">手机快速注册</text>
      </view>
      <view class="other">
        <text class="other-tip">同意协议并选择其他登录方式</text>
        <view class="icons">
          <view class="icon">🔔</view>
          <view class="icon">🟢</view>
        </view>
      </view>
      <view class="agree">
        <label class="checkbox">
          <checkbox :checked="agree" @tap="agree = !agree" />
          <text>我已阅读并同意《京东用户服务协议》《用户隐私政策》</text>
        </label>
      </view>
    </view>

    <view v-else class="uc">
      <view class="uc-top">
        <view class="avatar">👤</view>
        <view class="uc-meta">
          <text class="uc-name">{{ alias }}</text>
          <text class="uc-sub">银牌会员</text>
        </view>
        <view class="settings" @tap="goSettings">⚙️</view>
      </view>
      <view class="plus-banners">
        <view class="plus-item">开通PLUS</view>
        <view class="plus-item">品质生活领PLUS</view>
        <view class="plus-item">开PLUS无忧邮</view>
      </view>
      <view class="orders">
        <view class="order">
          <view class="icon">🧾</view>
          <text class="text">待付款</text>
        </view>
        <view class="order">
          <view class="icon">📦</view>
          <text class="text">待收货</text>
        </view>
        <view class="order">
          <view class="icon">♻️</view>
          <text class="text">退换/售后</text>
        </view>
        <view class="order">
          <view class="icon">🧮</view>
          <text class="text">全部订单</text>
        </view>
      </view>
      <view class="assets">
        <view class="asset"
          ><text class="num">3</text><text class="label">优惠券</text></view
        >
        <view class="asset"
          ><text class="num">7,986.32</text
          ><text class="label">白条额度</text></view
        >
        <view class="asset"
          ><text class="num">0</text><text class="label">京豆</text></view
        >
        <view class="asset"
          ><text class="num">0</text><text class="label">红包</text></view
        >
        <view class="asset"
          ><text class="num">29</text><text class="label">我的钱袋</text></view
        >
      </view>
      <view class="menu">
        <view class="menu-item"
          ><view class="micon">🎧</view><text>客服服务</text></view
        >
        <view class="menu-item"
          ><view class="micon">📅</view><text>我的预约</text></view
        >
        <view class="menu-item"
          ><view class="micon">🛒</view><text>超市卡</text></view
        >
        <view class="menu-item"
          ><view class="micon">💰</view><text>闲置换钱</text></view
        >
      </view>
      <button class="logout" @tap="doLogout">退出登录</button>
    </view>
  </view>
</template>

<script setup lang="ts">
import { ref, computed } from "vue";
import { useAuthStore } from "@/stores/auth";
import { storeToRefs } from "pinia";
const phone = ref("");
const code = ref("");
const agree = ref(true);
const countdown = ref(0);
const sentCode = ref("");
const auth = useAuthStore();
const { isLoggedIn } = storeToRefs(auth);
const alias = computed(() =>
  auth.phone
    ? auth.phone.replace(/(\d{3})\d{4}(\d{4})/, "$1****$2")
    : "用户" + (auth.token || "").slice(-4)
);

function sendCode() {
  if (!/^1\d{10}$/.test(phone.value)) {
    uni.showToast({ title: "手机号不正确", icon: "none" });
    return;
  }
  sentCode.value = "123456";
  countdown.value = 60;
  const timer = setInterval(() => {
    countdown.value -= 1;
    if (countdown.value <= 0) clearInterval(timer);
  }, 1000);
  uni.showToast({ title: "验证码已发送: 123456", icon: "none" });
}

function submit() {
  if (!agree.value) {
    uni.showToast({ title: "请勾选协议", icon: "none" });
    return;
  }
  if (!/^1\d{10}$/.test(phone.value)) {
    uni.showToast({ title: "手机号不正确", icon: "none" });
    return;
  }
  if (!code.value) {
    uni.showToast({ title: "请输入验证码", icon: "none" });
    return;
  }
  try {
    auth.loginWithCode(phone.value, code.value);
    uni.showToast({ title: "登录成功", icon: "success" });
    phone.value = "";
    code.value = "";
  } catch (e) {
    uni.showToast({ title: "登录失败", icon: "none" });
  }
}

function doLogout() {
  auth.logout();
  uni.showToast({ title: "已退出", icon: "none" });
}

function goSettings() {
  uni.navigateTo({ url: "/pages/profile/pagesMember/setting/index" });
}
</script>

<style lang="scss">
.login-page {
  background: #fff;
  min-height: 100vh;
}
.header {
  height: 88rpx;
  display: flex;
  align-items: center;
  justify-content: center;
  border-bottom: 1rpx solid #f0f0f0;
}
.title {
  font-size: 30rpx;
}
.form {
  padding: 24rpx;
}
.form-item {
  display: flex;
  align-items: center;
  border-bottom: 1rpx solid #f0f0f0;
  padding: 12rpx 0;
}
.prefix {
  width: 80rpx;
  color: #999;
}
.input {
  flex: 1;
  height: 70rpx;
  font-size: 28rpx;
}
.send {
  width: 200rpx;
  height: 60rpx;
  border-radius: 30rpx;
  background: #f5f5f5;
}
.submit {
  margin-top: 24rpx;
  height: 80rpx;
  border-radius: 40rpx;
  background: #ff6b81;
  color: #fff;
  font-size: 28rpx;
}
.tabs {
  display: flex;
  justify-content: space-between;
  margin-top: 20rpx;
  color: #999;
}
.tab {
  font-size: 24rpx;
}
.other {
  margin-top: 40rpx;
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 20rpx;
}
.other-tip {
  color: #999;
  font-size: 22rpx;
}
.icons {
  display: flex;
  gap: 40rpx;
}
.icon {
  width: 80rpx;
  height: 80rpx;
  border-radius: 40rpx;
  background: #f5f5f5;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 40rpx;
}
.agree {
  margin-top: 20rpx;
}
.checkbox {
  display: flex;
  align-items: center;
  gap: 10rpx;
  color: #999;
}

.uc {
  background: #f7f7f7;
}
.uc-top {
  display: flex;
  align-items: center;
  gap: 12rpx;
  padding: 20rpx;
  background: linear-gradient(180deg, #ffeef3, #ffffff);
}
.avatar {
  width: 96rpx;
  height: 96rpx;
  border-radius: 48rpx;
  background: #f1f4fa;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 40rpx;
}
.uc-meta {
  flex: 1;
  display: flex;
  flex-direction: column;
}
.uc-name {
  font-size: 28rpx;
  color: #333;
}
.uc-sub {
  font-size: 22rpx;
  color: #999;
}
.settings {
  font-size: 28rpx;
}
.plus-banners {
  display: flex;
  gap: 12rpx;
  padding: 12rpx 20rpx;
}
.plus-item {
  flex: 1;
  height: 72rpx;
  border-radius: 12rpx;
  background: #fff7e6;
  color: #ff8a00;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 24rpx;
}
.orders {
  margin: 0 20rpx;
  background: #fff;
  border-radius: 16rpx;
  display: flex;
  justify-content: space-between;
  padding: 20rpx;
}
.order {
  display: flex;
  align-items: center;
  flex-direction: column;
  gap: 10rpx;
}
.icon {
  font-size: 34rpx;
}
.text {
  font-size: 24rpx;
  color: #333;
}
.assets {
  margin: 12rpx 20rpx;
  background: #fff;
  border-radius: 16rpx;
  display: flex;
  justify-content: space-between;
  padding: 20rpx;
}
.asset {
  display: flex;
  align-items: center;
  flex-direction: column;
  gap: 6rpx;
}
.num {
  font-size: 26rpx;
  font-weight: 600;
}
.label {
  font-size: 22rpx;
  color: #999;
}
.menu {
  margin: 12rpx 20rpx;
  background: #fff;
  border-radius: 16rpx;
  display: grid;
  grid-template-columns: repeat(4, 1fr);
  gap: 16rpx;
  padding: 20rpx;
}
.menu-item {
  display: flex;
  align-items: center;
  flex-direction: column;
  gap: 8rpx;
}
.micon {
  width: 64rpx;
  height: 64rpx;
  border-radius: 32rpx;
  background: #f5f5f5;
  display: flex;
  align-items: center;
  justify-content: center;
}
.logout {
  margin: 20rpx;
  height: 72rpx;
  border-radius: 36rpx;
  background: #f5f5f5;
}
</style>
