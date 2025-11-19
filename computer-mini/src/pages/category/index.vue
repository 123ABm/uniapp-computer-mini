<template>
  <view class="page">
    <view class="category-header">
      <scroll-view class="tabs" :scroll-x="true" show-scrollbar="false">
        <view
          class="tab"
          v-for="c in categories"
          :key="c.label"
          @tap="selectCategory(c.label)"
          :class="{ active: c.label === current }"
        >
          <text class="tab-text">{{ c.label }}</text>
        </view>
      </scroll-view>
    </view>
    <view class="product-list">
      <view
        class="product-card"
        v-for="p in currentProducts"
        :key="p.id"
        @tap="goDetail(p)"
      >
        <view class="product-media">
          <image class="product-image" :src="p.image" mode="aspectFill" />
          <view class="product-badges">
            <view class="badge badge-red" v-if="p.promo">{{ p.promo }}</view>
          </view>
        </view>
        <text class="product-title">{{ p.title }}</text>
        <view class="product-price-row">
          <text class="price">¥{{ p.price }}</text>
          <text class="see-similar">看相似</text>
        </view>
      </view>
    </view>
  </view>
</template>

<script setup lang="ts">
import { ref, computed } from "vue";
import { onShow } from "@dcloudio/uni-app";

type Category = { icon: string; label: string };
type Product = {
  id: number;
  title: string;
  image: string;
  price: number;
  promo?: string;
};

const categories: Category[] = [
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

const dataset: Record<string, Product[]> = {
  精华护肤: [
    {
      id: 1,
      title: "玻尿酸保湿精华 30ml",
      image: "https://picsum.photos/seed/skin1/400/400",
      price: 89,
      promo: "直降",
    },
    {
      id: 2,
      title: "维C焕亮精华 50ml",
      image: "https://picsum.photos/seed/skin2/400/400",
      price: 129,
    },
    {
      id: 3,
      title: "抗初老精华套装",
      image: "https://picsum.photos/seed/skin3/400/400",
      price: 299,
    },
  ],
  母婴玩具: [
    {
      id: 4,
      title: "早教启蒙积木 120件",
      image: "https://picsum.photos/seed/baby1/400/400",
      price: 59,
    },
    {
      id: 5,
      title: "婴儿推车 轻便可折叠",
      image: "https://picsum.photos/seed/baby2/400/400",
      price: 399,
      promo: "新品",
    },
    {
      id: 6,
      title: "益智拼图 100片",
      image: "https://picsum.photos/seed/baby3/400/400",
      price: 39,
    },
  ],
  轻奢: [
    {
      id: 7,
      title: "头层牛皮手包",
      image: "https://picsum.photos/seed/lux1/400/400",
      price: 699,
    },
    {
      id: 8,
      title: "真丝丝巾",
      image: "https://picsum.photos/seed/lux2/400/400",
      price: 199,
    },
    {
      id: 9,
      title: "设计师戒指",
      image: "https://picsum.photos/seed/lux3/400/400",
      price: 299,
    },
  ],
  营养保健: [
    {
      id: 10,
      title: "鱼油软胶囊 300粒",
      image: "https://picsum.photos/seed/nutrition1/400/400",
      price: 199,
    },
    {
      id: 11,
      title: "维生素B族 120片",
      image: "https://picsum.photos/seed/nutrition2/400/400",
      price: 89,
    },
    {
      id: 12,
      title: "益生菌粉 30袋",
      image: "https://picsum.photos/seed/nutrition3/400/400",
      price: 129,
    },
  ],
  家居清洁: [
    {
      id: 13,
      title: "高效洗衣凝珠 80粒",
      image: "https://picsum.photos/seed/home1/400/400",
      price: 59,
    },
    {
      id: 14,
      title: "厨房去污清洁剂",
      image: "https://picsum.photos/seed/home2/400/400",
      price: 29,
    },
    {
      id: 15,
      title: "多功能扫地拖把",
      image: "https://picsum.photos/seed/home3/400/400",
      price: 69,
    },
  ],
  服饰鞋: [
    {
      id: 16,
      title: "休闲运动鞋",
      image: "https://picsum.photos/seed/fashion1/400/400",
      price: 199,
    },
    {
      id: 17,
      title: "针织开衫",
      image: "https://picsum.photos/seed/fashion2/400/400",
      price: 129,
    },
    {
      id: 18,
      title: "保暖羽绒服",
      image: "https://picsum.photos/seed/fashion3/400/400",
      price: 399,
    },
  ],
  美妆个护: [
    {
      id: 19,
      title: "口红雾面套装",
      image: "https://picsum.photos/seed/beauty1/400/400",
      price: 159,
    },
    {
      id: 20,
      title: "卸妆水500ml",
      image: "https://picsum.photos/seed/beauty2/400/400",
      price: 49,
    },
    {
      id: 21,
      title: "护发精油",
      image: "https://picsum.photos/seed/beauty3/400/400",
      price: 89,
    },
  ],
  全球美食: [
    {
      id: 22,
      title: "黑巧礼盒",
      image: "https://picsum.photos/seed/food1/400/400",
      price: 69,
    },
    {
      id: 23,
      title: "进口咖啡豆",
      image: "https://picsum.photos/seed/food2/400/400",
      price: 99,
    },
    {
      id: 24,
      title: "车厘子2kg",
      image: "https://picsum.photos/seed/food3/400/400",
      price: 139,
    },
  ],
  电子: [
    {
      id: 25,
      title: "蓝牙耳机降噪款",
      image: "https://picsum.photos/seed/elec1/400/400",
      price: 299,
    },
    {
      id: 26,
      title: "便携充电宝",
      image: "https://picsum.photos/seed/elec2/400/400",
      price: 99,
    },
    {
      id: 27,
      title: "智能手表",
      image: "https://picsum.photos/seed/elec3/400/400",
      price: 399,
    },
  ],
  男士护理: [
    {
      id: 28,
      title: "男士洗面奶 150ml",
      image: "https://picsum.photos/seed/man1/400/400",
      price: 39,
    },
    {
      id: 29,
      title: "剃须刀电动款",
      image: "https://picsum.photos/seed/man2/400/400",
      price: 199,
    },
    {
      id: 30,
      title: "男士香水 50ml",
      image: "https://picsum.photos/seed/man3/400/400",
      price: 159,
    },
  ],
};

const current = ref<string>(categories[0].label);
const currentProducts = computed(() => dataset[current.value] || []);

function selectCategory(label: string) {
  current.value = label;
}

function goDetail(p: Product) {
  try {
    uni.setStorageSync("selected-product", p);
  } catch (e) {}
  uni.navigateTo({ url: "/pages/product/detail" });
}

onShow(() => {
  try {
    const fromStorage = uni.getStorageSync("selected-category");
    if (fromStorage && typeof fromStorage === "string") {
      current.value = fromStorage;
      uni.removeStorageSync("selected-category");
    }
  } catch (e) {}
});
</script>

<style lang="scss">
.page {
  background-color: #f7f7f7;
}
.category-header {
  background: #ffffff;
  padding: 10rpx 0;
  border-bottom: 1rpx solid #f0f0f0;
}
.tabs {
  white-space: nowrap;
}
.tab {
  display: inline-flex;
  align-items: center;
  justify-content: center;
  padding: 16rpx 24rpx;
  margin: 0 6rpx;
  border-radius: 28rpx;
  background: #f5f7fb;
}
.tab.active {
  background: #e8f5ff;
  color: #1a7fff;
}
.tab-text {
  font-size: 24rpx;
}
.product-list {
  padding: 20rpx;
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
}
.product-badges {
  position: absolute;
  left: 12rpx;
  top: 12rpx;
}
.badge {
  padding: 6rpx 12rpx;
  border-radius: 8rpx;
  font-size: 22rpx;
  color: #ffffff;
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
  padding: 0 16rpx 16rpx 16rpx;
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
</style>
