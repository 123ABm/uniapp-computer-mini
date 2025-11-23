<template>
  <view class="content">
    <view class="navbar" :style="{ paddingTop: safeAreaInsets?.top + 'px' }">
      <view class="logo">
        <image class="logo-image" src="@/static/logo.png"></image>
        <text class="logo-text">高优惠 · 亲民 · 快捷</text>
      </view>
      <view class="search">
        <text class="icon-search">搜索商品</text>
        <text class="icon-scan"></text>
      </view>
    </view>
    <scroll-view
      class="main-scroll"
      :scroll-y="true"
      :refresher-enabled="true"
      :refresher-triggered="refreshing"
      @refresherrefresh="onRefresh"
    >
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

      <view class="categories">
        <view
          class="category"
          v-for="c in categories"
          :key="c.label"
          @tap="goCategory(c)"
        >
          <view class="cat-icon">
            <image class="cat-icon-image" :src="c.icon" mode="aspectFit" />
          </view>
          <text class="cat-label">{{ c.label }}</text>
        </view>
      </view>
      <!-- 通知 -->
      <view class="inform">
        <view class="inform-info">
          <view class="picture">
            <image src="@/static/gg_ico.png" mode=""></image>
          </view>
          <view class="info">
            <swiper
              class="swiper"
              :circular="true"
              :vertical="true"
              :indicator-dots="false"
              :autoplay="true"
              :interval="3000"
              :duration="1000"
            >
              <swiper-item>
                <view class="swiper-item" @click="onSkip('inform')">
                  <text class="one-omit"
                    >何*** 理刚刚通过推广赚了￥25.00元，商品男装休闲装购买</text
                  >
                </view>
              </swiper-item>
              <swiper-item>
                <view class="swiper-item" @click="onSkip('inform')">
                  <text class="one-omit"
                    >张*** 理刚刚通过推广赚了￥99.00元，商品Mac book pro
                    15寸购买</text
                  >
                </view>
              </swiper-item>
              <swiper-item>
                <view class="swiper-item" @click="onSkip('inform')">
                  <text class="one-omit"
                    >郑*** 理刚刚通过推广赚了￥88.00元，商品华为meat30
                    pro购买</text
                  >
                </view>
              </swiper-item>
            </swiper>
          </view>
        </view>
      </view>
      <view class="coupon">
        <view class="coupon-card">
          <text class="coupon-title">会员领券狂欢购</text>
          <view class="coupon-action">GO</view>
        </view>
        <text class="coupon-sub">领券满300减50元</text>
      </view>
      <view class="float-actions">
        <view class="float-btn">📞</view>
        <view class="float-btn">💬</view>
      </view>
      <view class="product-list">
        <view
          class="product-card"
          v-for="p in products"
          :key="p.id"
          @tap="goDetail(p)"
        >
          <view class="product-media">
            <image class="product-image" :src="p.image" mode="aspectFill" />
            <view class="product-badges">
              <view class="badge badge-orange" v-if="p.badge">{{
                p.badge
              }}</view>
              <view class="badge badge-red" v-if="p.promo">{{ p.promo }}</view>
            </view>
          </view>
          <text class="product-title">{{ p.title }}</text>
          <view class="product-price-row">
            <text class="price">¥{{ p.price }}</text>
            <text class="see-similar">看相似</text>
          </view>
          <view class="product-meta">
            <text class="tag" v-if="p.self">自营</text>
            <text class="comments">{{ p.comments }}条评价</text>
          </view>
        </view>
      </view>
    </scroll-view>
    <view v-if="showPromo" class="promo-mask">
      <image class="promo-image" src="@/static/index/ad.png" mode="widthFix" />
      <view class="promo-close" @tap="closePromo">✕</view>
    </view>
  </view>
</template>

<script setup lang="ts">
import { ref } from "vue";
import { onLoad } from "@dcloudio/uni-app";
import img1 from "@/static/index/1.png";
import img2 from "@/static/index/2.png";
import img3 from "@/static/index/3.png";
import img4 from "@/static/index/4.png";
import img5 from "@/static/index/5.png";
import nav1 from "@/static/index/nav/nav_ico1.png";
import nav2 from "@/static/index/nav/nav_ico2.png";
import nav3 from "@/static/index/nav/nav_ico3.png";
import nav4 from "@/static/index/nav/nav_ico4.png";
import nav5 from "@/static/index/nav/nav_ico5.png";
import nav6 from "@/static/index/nav/nav_ico6.png";
import nav7 from "@/static/index/nav/nav_ico7.png";
import nav8 from "@/static/index/nav/nav_ico8.png";
import nav9 from "@/static/index/nav/nav_ico9.png";
import nav10 from "@/static/index/nav/nav_ico10.png";
const { safeAreaInsets } = uni.getSystemInfoSync();
const showPromo = ref(false);
const refreshing = ref(false);
const banners = [
  {
    id: 101,
    title: "爆款手机",
    image: img1,
    price: 2599.0,
    promo: "直降",
    images: [img1],
  },
  {
    id: 102,
    title: "休闲零食大礼包",
    image: img2,
    price: 19.9,
    promo: "促销",
    images: [img2],
  },
  {
    id: 103,
    title: "精品茶具套装",
    image: img3,
    price: 99.0,
    promo: "限时",
    images: [img3],
  },
  {
    id: 104,
    title: "智能穿戴手表",
    image: img4,
    price: 259.0,
    promo: "热卖",
    images: [img4],
  },
  {
    id: 105,
    title: "居家清洁组合",
    image: img5,
    price: 49.9,
    promo: "直降",
    images: [img5],
  },
];
onLoad(() => {
  showPromo.value = true;
});
function onRefresh() {
  showPromo.value = true;
  refreshing.value = true;
  setTimeout(() => {
    refreshing.value = false;
  }, 400);
}
function closePromo() {
  showPromo.value = false;
}

const categories = [
  { icon: nav1, label: "手机专区" },
  { icon: nav2, label: "潮牌男装" },
  { icon: nav3, label: "运动男装" },
  { icon: nav4, label: "时尚背包" },
  { icon: nav5, label: "台式电脑" },
  { icon: nav6, label: "珠宝首饰" },
  { icon: nav7, label: "美艳美妆" },
  { icon: nav8, label: "家用电器" },
  { icon: nav9, label: "洗漱用品" },
  { icon: nav10, label: "台式电脑" },
];

function onSkip(type: any) {
  switch (type) {
    case "mess":
      uni.navigateTo({
        url: "/pages/Message/Message",
      });
      break;
    case "paycode":
      uni.navigateTo({
        url: "/pages/PaymentCode/PaymentCode",
      });
      break;
    case "menu":
      uni.navigateTo({
        url: "/pages/SearchGoodsList/SearchGoodsList",
      });
      break;
    case "inform":
      break;
    case "flash":
      uni.navigateTo({
        url: "/pages/FlashSale/FlashSale",
      });
      break;
    case "GoodChoice":
      uni.navigateTo({
        url: "/pages/GoodChoice/GoodChoice",
      });
      break;
    case "goods":
      uni.navigateTo({
        url: "/pages/GoodsDetails/GoodsDetails",
        animationType: "zoom-fade-out",
        animationDuration: 200,
      });
      break;
  }
}

function goCategory(c: { label: string }) {
  try {
    uni.setStorageSync("selected-category", c.label);
  } catch (e) {}
  uni.switchTab({ url: "/pages/category/index" });
}
function goDetail(p: any) {
  try {
    uni.setStorageSync("selected-product", p);
  } catch (e) {}
  uni.navigateTo({ url: "/pages/product/detail" });
}
function goProduct(b: any) {
  goDetail(b);
}
const products = [
  {
    id: 1,
    title: "金立手机 灵动岛智能手机 全新超薄八核大屏",
    image: "https://picsum.photos/seed/phone/400/400",
    price: 359.0,
    comments: "5000+",
    self: true,
    badge: "6.5",
    promo: "直降",
  },
  {
    id: 2,
    title: "暮云泡茶壶加厚玻璃茶壶 大容量办公茶具",
    image: "https://picsum.photos/seed/teapot/400/400",
    price: 9.99,
    comments: "1.2万+",
    self: false,
    badge: "包邮",
    promo: "京喜价",
  },
  {
    id: 3,
    title: "秋冬连帽卫衣 情侣款保暖休闲运动外套",
    image: "https://picsum.photos/seed/hoodie/400/400",
    price: 119.0,
    comments: "8000+",
    self: true,
    badge: "新品",
    promo: "限时",
  },
  {
    id: 4,
    title: "金属杆中性笔 学生办公书写顺滑 20支装",
    image: "https://picsum.photos/seed/pens/400/400",
    price: 19.9,
    comments: "2万+",
    self: false,
    badge: "热卖",
    promo: "直降",
  },
  {
    id: 5,
    title: "智能手表 运动健康监测 防水蓝牙通话",
    image: "https://picsum.photos/seed/watch/400/400",
    price: 259.0,
    comments: "3万+",
    self: true,
    badge: "爆款",
    promo: "限时",
  },
];
</script>

<style lang="scss">
.content {
  background-color: #f7f7f7;
  min-height: 100vh;
  display: flex;
  flex-direction: column;
}
.main-scroll {
  flex: 1;
}
.navbar {
  background-image: url(@/static/navigator_bg.png);
  background-size: cover;
  position: relative;
  display: flex;
  flex-direction: column;
  padding-top: 20px;
  .logo {
    display: flex;
    align-items: center;
    height: 64rpx;
    padding-left: 30rpx;
    padding-top: 20rpx;
    .logo-image {
      width: 183rpx;
      height: 94rpx;
    }
    .logo-text {
      flex: 1;
      line-height: 28rpx;
      color: #fff;
      margin: 2rpx 0 0 20rpx;
      padding-left: 20rpx;
      border-left: 1rpx solid #fff;
      font-size: 26rpx;
    }
  }
  .search {
    display: flex;
    align-items: center;
    justify-content: space-between;
    padding: 0 10rpx 0 26rpx;
    height: 64rpx;
    margin: 16rpx 20rpx;
    color: #fff;
    font-size: 28rpx;
    border-radius: 32rpx;
    background-color: rgba(255, 255, 255, 0.5);
  }
  .icon-search {
    &::before {
      margin-right: 10rpx;
    }
  }
  .icon-scan {
    font-size: 30rpx;
    padding: 15rpx;
  }
}
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

.categories {
  margin: 20rpx;
  padding: 10rpx 0 20rpx 0;
  background: #ffffff;
  border-radius: 16rpx;
  display: flex;
  flex-wrap: wrap;
  .category {
    width: 20%;
    display: flex;
    align-items: center;
    justify-content: center;
    flex-direction: column;
    padding-top: 20rpx;
  }
  .cat-icon {
    width: 96rpx;
    height: 96rpx;
    border-radius: 48rpx;
    background: #f1f4fa;
    display: flex;
    align-items: center;
    justify-content: center;
  }
  .cat-icon-image {
    width: 44rpx;
    height: 44rpx;
  }
  .cat-label {
    margin-top: 12rpx;
    font-size: 24rpx;
    color: #333333;
  }
}
.coupon {
  margin: 10rpx 20rpx 30rpx 20rpx;
  .coupon-card {
    background-image: linear-gradient(135deg, #b276ff, #ff77ac);
    border-radius: 20rpx;
    padding: 24rpx;
    display: flex;
    align-items: center;
    justify-content: space-between;
  }
  .coupon-title {
    font-size: 40rpx;
    font-weight: 600;
    color: #ffffff;
  }
  .coupon-action {
    width: 72rpx;
    height: 72rpx;
    border-radius: 36rpx;
    background: #ff8a4d;
    color: #ffffff;
    display: flex;
    align-items: center;
    justify-content: center;
    font-size: 26rpx;
    font-weight: 600;
  }
  .coupon-sub {
    margin-top: 12rpx;
    text-align: center;
    font-size: 24rpx;
    color: #7aaef5;
  }
}
.float-actions {
  position: fixed;
  right: 20rpx;
  bottom: 140rpx;
  display: flex;
  flex-direction: column;
  gap: 16rpx;
  .float-btn {
    width: 80rpx;
    height: 80rpx;
    border-radius: 40rpx;
    background: #ffffff;
    box-shadow: 0 6rpx 18rpx rgba(0, 0, 0, 0.08);
    display: flex;
    align-items: center;
    justify-content: center;
    font-size: 36rpx;
  }
}
.product-list {
  padding: 0 20rpx 140rpx 20rpx;
  display: flex;
  flex-wrap: wrap;
  justify-content: space-between;
}
.product-card {
  width: 345rpx;
  background: #ffffff;
  border-radius: 16rpx;
  overflow: hidden;
  box-shadow: 0 6rpx 20rpx rgba(0, 0, 0, 0.06);
  margin-bottom: 20rpx;
}
.product-media {
  position: relative;
  width: 100%;
  height: 340rpx;
}
.product-image {
  width: 100%;
  height: 100%;
  border-top-left-radius: 16rpx;
  border-top-right-radius: 16rpx;
}
.product-badges {
  position: absolute;
  left: 12rpx;
  top: 12rpx;
  display: flex;
  gap: 8rpx;
}
.badge {
  padding: 6rpx 12rpx;
  border-radius: 8rpx;
  font-size: 22rpx;
  color: #ffffff;
}
.badge-orange {
  background: #ff8a4d;
}
.badge-red {
  background: #ff4d4f;
}
.product-title {
  padding: 16rpx;
  font-size: 26rpx;
  color: #333333;
  display: -webkit-box;
  -webkit-line-clamp: 2;
  -webkit-box-orient: vertical;
  overflow: hidden;
}
.product-price-row {
  padding: 0 16rpx 12rpx 16rpx;
  display: flex;
  align-items: center;
  justify-content: space-between;
}
.price {
  color: #ff2d2d;
  font-size: 32rpx;
  font-weight: 600;
}
.see-similar {
  padding: 6rpx 14rpx;
  border-radius: 20rpx;
  border: 1rpx solid #e6e6e6;
  font-size: 22rpx;
  color: #666666;
}
.product-meta {
  padding: 0 16rpx 16rpx 16rpx;
  display: flex;
  align-items: center;
  gap: 12rpx;
}
.tag {
  padding: 2rpx 8rpx;
  border-radius: 6rpx;
  background: #ffd6d6;
  color: #ff4d4f;
  font-size: 20rpx;
}
.comments {
  font-size: 22rpx;
  color: #888888;
}
.promo-mask {
  position: fixed;
  left: 0;
  right: 0;
  top: 0;
  bottom: 0;
  background: rgba(0, 0, 0, 0.6);
  display: flex;
  align-items: center;
  justify-content: center;
  z-index: 9999;
  opacity: 0;
  animation: maskFade 0.2s ease-out forwards;
}
.promo-image {
  width: 600rpx;
  border-radius: 20rpx;
  opacity: 0;
  transform: scale(0.85);
  animation: popIn 0.28s cubic-bezier(0.2, 0.8, 0.2, 1) 0.1s forwards;
}
.promo-close {
  position: absolute;
  bottom: 255rpx;
  color: #fff;
  width: 64rpx;
  height: 64rpx;
  border: 1px solid #fff;
  border-radius: 50rpx;
  display: flex;
  align-items: center;
  justify-content: center;
  opacity: 0;
  animation: btnFade 0.25s ease-out 0.25s forwards;
}
@keyframes maskFade {
  from {
    opacity: 0;
  }
  to {
    opacity: 1;
  }
}
@keyframes popIn {
  0% {
    transform: scale(0.85);
    opacity: 0;
  }
  100% {
    transform: scale(1);
    opacity: 1;
  }
}
@keyframes btnFade {
  from {
    opacity: 0;
  }
  to {
    opacity: 1;
  }
}

/* 通知 */
.inform {
  padding: 0 25rpx;
  .inform-info {
    display: flex;
    padding: 0 20rpx;
    height: 70rpx;
    background-color: #f7f7f7;
    border-radius: 10rpx;
    .picture {
      width: 20%;
      height: 100%;
      image {
        width: 93rpx;
        height: 84rpx;
        margin-top: -20rpx;
      }
    }
    .info {
      width: 80%;
      height: 100%;
      .swiper {
        width: 100%;
        height: 100%;
        .swiper-item {
          display: flex;
          align-items: center;
          width: 100%;
          height: 100%;
          text {
            font-size: 28rpx;
            color: #848281;
          }
        }
      }
    }
  }

  .one-omit {
    overflow: hidden;
    text-overflow: ellipsis;
    white-space: nowrap;
    width: 544rpx;
  }
}
</style>
