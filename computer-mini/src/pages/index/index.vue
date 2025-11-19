<template>
  <view class="content">
    <view class="navbar" :style="{ paddingTop: safeAreaInsets?.top + 'px' }">
      <view class="logo">
        <image class="logo-image" src="@/static/logo.png"></image>
        <text class="logo-text">新鲜 · 亲民 · 快捷</text>
      </view>
      <view class="search">
        <text class="icon-search">搜索商品</text>
        <text class="icon-scan"></text>
      </view>
    </view>
    <view class="hero">
      <view class="hero-inner">
        <text class="hero-title">进口狂欢购</text>
        <view class="hero-badge">全店低至5折起</view>
      </view>
    </view>
    <view class="features">
      <view class="feature" v-for="f in features" :key="f.label">
        <view class="feature-icon">{{ f.icon }}</view>
        <text class="feature-text">{{ f.label }}</text>
      </view>
    </view>
    <view class="categories">
      <view
        class="category"
        v-for="c in categories"
        :key="c.label"
        @tap="goCategory(c)"
      >
        <view class="cat-icon">{{ c.icon }}</view>
        <text class="cat-label">{{ c.label }}</text>
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
      <view class="product-card" v-for="p in products" :key="p.id" @tap="goDetail(p)">
        <view class="product-media">
          <image class="product-image" :src="p.image" mode="aspectFill" />
          <view class="product-badges">
            <view class="badge badge-orange" v-if="p.badge">{{ p.badge }}</view>
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
  </view>
</template>

<script setup lang="ts">
const { safeAreaInsets } = uni.getSystemInfoSync();
const features = [
  { icon: "🚚", label: "急速配送" },
  { icon: "🏭", label: "厂价直销" },
  { icon: "✅", label: "正品保证" },
  { icon: "🎁", label: "满98包邮" },
];
const categories = [
  { icon: "💄", label: "精华护肤" },
  { icon: "👶", label: "母婴玩具" },
  { icon: "🎩", label: "轻奢" },
  { icon: "💊", label: "营养保健" },
  { icon: "🏠", label: "家居清洁" },
  { icon: "👗", label: "服饰鞋" },
  { icon: "🧴", label: "美妆个护" },
  { icon: "🍫", label: "全球美食" },
  { icon: "📱", label: "电子" },
  { icon: "👔", label: "男士护理" },
];
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
];
</script>

<style lang="scss">
.content {
  background-color: #f7f7f7;
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
      width: 166rpx;
      height: 39rpx;
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
.hero {
  margin: 20rpx;
  height: 280rpx;
  border-radius: 20rpx;
  background-image: linear-gradient(
    135deg,
    #96e6ff 0%,
    #9ff0cf 50%,
    #64d7ff 100%
  );
  display: flex;
  align-items: center;
  justify-content: center;
  .hero-inner {
    display: flex;
    align-items: center;
    flex-direction: column;
    gap: 16rpx;
  }
  .hero-title {
    color: #ffffff;
    font-size: 44rpx;
    font-weight: 600;
  }
  .hero-badge {
    padding: 12rpx 24rpx;
    border-radius: 100rpx;
    background: #3bd38f;
    color: #ffffff;
    font-size: 26rpx;
  }
}
.features {
  margin: 0 20rpx;
  background: #ffffff;
  border-radius: 16rpx;
  display: flex;
  justify-content: space-between;
  padding: 20rpx;
  box-shadow: 0 6rpx 20rpx rgba(0, 0, 0, 0.06);
  .feature {
    width: 25%;
    display: flex;
    align-items: center;
    justify-content: center;
    gap: 12rpx;
  }
  .feature-icon {
    width: 40rpx;
    height: 40rpx;
    font-size: 32rpx;
    display: flex;
    align-items: center;
    justify-content: center;
  }
  .feature-text {
    font-size: 24rpx;
    color: #666666;
  }
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
    font-size: 44rpx;
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
</style>
