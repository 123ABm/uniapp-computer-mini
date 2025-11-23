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
      <!-- 限时抢购，好货精选 -->
      <view class="flash-good">
        <view class="flash-sale">
          <view class="line"></view>
          <view class="flash-title" @click="onSkip('flash')">
            <view class="pictrue">
              <image src="/static/xsqg_title.png" mode=""></image>
            </view>
            <view class="date-time">
              <text class="time">02</text>
              <text class="da">:</text>
              <text class="time">15</text>
              <text class="da">:</text>
              <text class="time">55</text>
            </view>
          </view>
          <view class="goods-list">
            <view class="list" @click="onSkip('goods')">
              <view class="pictrue">
                <image src="/static/img/goods_01.png"></image>
              </view>
              <view class="price">
                <text class="selling-price">￥59</text>
                <text class="original-price">￥999</text>
              </view>
            </view>
            <view class="list" @click="onSkip('goods')">
              <view class="pictrue">
                <image src="/static/img/goods_02.png"></image>
              </view>
              <view class="price">
                <text class="selling-price">￥59</text>
                <text class="original-price">￥999</text>
              </view>
            </view>
          </view>
        </view>
        <view class="good-choice">
          <view class="goods-title" @click="onSkip('GoodChoice')">
            <view class="title">
              <text>好货精选</text>
            </view>
            <view class="describe">
              <text>全场</text>
              <text class="num">1</text>
              <text>折起</text>
            </view>
          </view>
          <view class="goods-list">
            <view class="list" @click="onSkip('goods')">
              <view class="pictrue">
                <image src="/static/img/goods_03.png"></image>
              </view>
              <view class="price">
                <text class="selling-price">￥59</text>
                <text class="original-price">￥999</text>
              </view>
            </view>
            <view class="list" @click="onSkip('goods')">
              <view class="pictrue">
                <image src="/static/img/goods_08.png"></image>
              </view>
              <view class="price">
                <text class="selling-price">￥59</text>
                <text class="original-price">￥999</text>
              </view>
            </view>
          </view>
        </view>
      </view>
      <!-- 今日上新 -->
      <view class="new-product">
        <view class="product-title">
          <view class="title">
            <image src="/static/hr_ico.png"></image>
            <text>今日上新</text>
          </view>
          <view class="describe">
            <text>今日上新商品是否有你心仪礼物</text>
          </view>
        </view>
        <view class="goods-list">
          <view class="list" @click="onSkip('goods')">
            <view class="pictrue">
              <image src="/static/img/goods_07.png"></image>
            </view>
            <view class="price" @click="onSkip('goods')">
              <text class="selling-price">￥59</text>
              <text class="original-price">￥19</text>
            </view>
          </view>
          <view class="list" @click="onSkip('goods')">
            <view class="pictrue">
              <image src="/static/img/goods_10.png"></image>
            </view>
            <view class="price">
              <text class="selling-price">￥399</text>
              <text class="original-price">￥299</text>
            </view>
          </view>
          <view class="list" @click="onSkip('goods')">
            <view class="pictrue">
              <image src="/static/img/goods_11.png"></image>
            </view>
            <view class="price">
              <text class="selling-price">￥3999</text>
              <text class="original-price">￥2999</text>
            </view>
          </view>
          <view class="list" @click="onSkip('goods')">
            <view class="pictrue">
              <image src="/static/img/goods_10.png"></image>
            </view>
            <view class="price">
              <text class="selling-price">￥599</text>
              <text class="original-price">￥199</text>
            </view>
          </view>
        </view>
      </view>
      <view class="float-actions">
        <view class="float-btn">📞</view>
        <view class="float-btn">💬</view>
      </view>
      <view class="recommend-info">
        <view class="recommend-title">
          <view class="title">
            <image src="/static/wntj_title.png" mode=""></image>
          </view>
        </view>
        <view class="goods-list">
          <view
            class="list"
            v-for="(item, index) in goodsList"
            @click="onSkip('goods')"
            :key="index"
          >
            <view class="pictrue">
              <image :src="item.img" mode="heightFix"></image>
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
                <image src="/static/vip_ico.png"></image>
                <text>￥{{ item.vip_price }}</text>
              </view>
            </view>
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
const goodsList = [
  {
    id: 1,
    name: "BANDALY 2020夏季女装连衣裙韩版大码宽松显瘦套装裙子两件套 JX19301 上豆绿下米白 M ",
    price: "219.00",
    vip_price: "129.00",
    img: "/static/img/goods_thumb_01.png",
    is_goods: 0,
  },
  {
    id: 1,
    name: "花花公子 卫衣男秋季圆领薄款休闲体恤男士时尚长袖T恤外套上衣男生情侣装套头衣服秋天男装 白色 XL",
    price: "139.00",
    vip_price: "99.00",
    img: "/static/img/goods_thumb_02.png",
    is_goods: 1,
  },
  {
    id: 1,
    name: "【两件套】花花公子PLAYBOY短袖T恤男套装夏季新款卫衣男士韩版修身冰丝宽松运动休闲上衣服裤子男装 CYFS903卡其色 XL",
    price: "168.00",
    vip_price: "158.00",
    img: "/static/img/goods_thumb_03.png",
    is_goods: 1,
  },
  {
    id: 1,
    name: "雪域森林短袖T恤男装2020夏季潮流时尚衣服男潮牌圆领印花宽松T恤半袖男 20855橙色 XL",
    price: "68.00",
    vip_price: "36.00",
    img: "/static/img/goods_thumb_04.png",
    is_goods: 0,
  },
  {
    id: 1,
    name: "短袖男夏季T恤男装韩版潮流印花套头衣服男士圆领宽松五分袖学生休闲夏天运动时尚情侣装大码 D119白色 XL",
    price: "68.00",
    vip_price: "59.00",
    img: "/static/img/goods_thumb_05.png",
    is_goods: 0,
  },
  {
    id: 1,
    name: "时尚休闲套装女夏季热天宽松女孩中学生高中初中生女生短袖套装衣服夏天少女学生韩版原宿风T恤潮流裤子一套 绿字母上衣+绿色裤两件套 均码",
    price: "83.00",
    vip_price: "78.00",
    img: "/static/img/goods_thumb_06.png",
    is_goods: 1,
  },
  {
    id: 1,
    name: "北极绒2020春夏季棉质睡衣女睡裙女夏季韩版纯棉短袖少女性感睡衣甜美可爱卡通家居服连衣裙 A3023 M【纯棉 品质保障】",
    price: "68.00",
    vip_price: "48.00",
    img: "/static/img/goods_thumb_07.png",
    is_goods: 1,
  },
  {
    id: 1,
    name: "韩卡婷 2020新款夏季短袖t恤女宽松学生衣服原宿风青春百搭显瘦上衣体恤闺蜜女装 白色 均码【80-120斤】",
    price: "29.00",
    vip_price: "19.00",
    img: "/static/img/goods_thumb_08.png",
    is_goods: 0,
  },
  {
    id: 1,
    name: "美连诚雪纺连衣裙 2020新款女夏裙子波点气质沙滩裙仙气时尚女装休闲衣服大码女装 白底红点 M ",
    price: "168.00",
    vip_price: "160.00",
    img: "/static/img/goods_thumb_09.png",
    is_goods: 0,
  },
  {
    id: 1,
    name: "凝拉t恤女短袖纯棉2020新款夏装中长款韩版宽松大码欧货潮上衣服半袖体恤 桔色2053 2XL（建议150-170斤)",
    price: "89.00",
    vip_price: "78.00",
    img: "/static/img/goods_thumb_10.png",
    is_goods: 0,
  },
  {
    id: 1,
    name: "荣耀Play4T 全网通6GB+128GB大内存 幻夜黑 4000mAh大电池 4800万AI摄影  6.39英寸魅眼屏",
    price: "1190.00",
    vip_price: "1100.00",
    img: "/static/img/goods_thumb_11.png",
    is_goods: 0,
  },
  {
    id: 1,
    name: "小米（MI） Redmi 8A",
    price: "699.00",
    vip_price: "599.00",
    img: "/static/img/goods_thumb_12.png",
    is_goods: 0,
  },
  {
    id: 1,
    name: "Apple iPhone 11",
    price: "5899.00",
    vip_price: "5800.00",
    img: "/static/img/goods_thumb_13.png",
    is_goods: 0,
  },
  {
    id: 1,
    name: "戴尔(DELL)成就3681英特尔酷睿i5商用办公高性能台式机电脑整机(十代i5-10400 8G 1T 三年上门售后)21.5英寸",
    price: "3699.00",
    vip_price: "3600.00",
    img: "/static/img/goods_thumb_14.png",
    is_goods: 0,
  },
  {
    id: 1,
    name: "戴尔DELL灵越5000 14英寸酷睿i5网课学习轻薄笔记本电脑(十代i5-1035G1 8G 512G MX230 2G独显)银",
    price: "4888.00",
    vip_price: "4999.00",
    img: "/static/img/goods_thumb_15.png",
    is_goods: 0,
  },
  {
    id: 1,
    name: "联想(Lenovo) 来酷 Lecoo一体台式机电脑23英寸(J4105 8G 256G SSD 三年上门）白",
    price: "4888.00",
    vip_price: "3600.00",
    img: "/static/img/goods_thumb_16.png",
    is_goods: 0,
  },
  {
    id: 1,
    name: "Apple 2020新款 MacBook Pro 13.3【带触控栏】十代i5 16G 512G 2.0GHz 深空灰 笔记本电脑 轻薄本 MWP42CHA",
    price: "18200.00",
    vip_price: "18200.00",
    img: "/static/img/goods_thumb_17.png",
    is_goods: 0,
  },
  {
    id: 1,
    name: "Apple新款 Mac mini台式电脑主机 八代i5 8G 512G SSD 台式机 MXNG2CHA",
    price: "8299.00",
    vip_price: "8200.00",
    img: "/static/img/goods_thumb_18.png",
    is_goods: 0,
  },
  {
    id: 1,
    name: "同仁堂美白祛斑霜套装 淡斑美白祛黄提亮补水保湿套装 男女士护肤美白化妆品套装",
    price: "288.00",
    vip_price: "282.00",
    img: "/static/img/goods_thumb_19.png",
    is_goods: 0,
  },
  {
    id: 1,
    name: "【限定款·雕花口红8支礼盒装】中国风口红套装七夕礼物送女朋友老婆生日礼物唇膏唇釉花仙西子同心锁口红 【限定款8支雕花口红】",
    price: "188.00",
    vip_price: "99.00",
    img: "/static/img/goods_thumb_20.png",
    is_goods: 0,
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

/* 今日上新 */
.new-product {
  padding: 0 25rpx;
  height: 350rpx;
  .product-title {
    display: flex;
    align-items: center;
    justify-content: space-between;
    width: 100%;
    height: 100rpx;
    .title {
      display: flex;
      align-items: center;
      image {
        width: 24rpx;
        height: 32rpx;
      }
      text {
        font-size: 30rpx;
        color: #4c4b4b;
        margin-left: 20rpx;
      }
    }
    .describe {
      display: flex;
      align-items: center;
      text {
        font-size: 26rpx;
        color: #a09f9f;
      }
    }
  }
  .goods-list {
    white-space: nowrap;
    width: 100%;
    height: 220rpx;
    overflow-y: hidden;
    overflow-x: auto;
    .list {
      display: inline-block;
      width: 25%;
      height: 100%;
      margin-right: 20rpx;
      .pictrue {
        width: 100%;
        height: 70%;
        image {
          width: 150rpx;
          height: 150rpx;
        }
      }
      .price {
        display: flex;
        align-items: center;
        width: 100%;
        height: 30%;
        .selling-price {
          font-size: 28rpx;
          font-weight: bold;
          color: red;
        }
        .original-price {
          font-size: 24rpx;
          text-decoration: line-through;
          color: #bbbaba;
          margin-left: 10rpx;
        }
      }
    }
  }
}

.flash-good {
  display: flex;
  align-items: center;
  padding: 0 25rpx;
  height: 320rpx;
  background-color: #ffffff;
  border-bottom: 16rpx solid #f9f9f9;
  .flash-sale {
    position: relative;
    width: 50%;
    height: 100%;
    .line {
      position: absolute;
      right: 0;
      top: 50%;
      width: 2rpx;
      height: 80%;
      background-color: #f9f9f9;
      transform: translate(0, -50%);
    }
    .flash-title {
      display: flex;
      align-items: center;
      // justify-content: space-between;
      width: 100%;
      height: 80rpx;
      .pictrue {
        display: flex;
        align-items: center;
        height: 100%;
        image {
          width: 118rpx;
          height: 28rpx;
        }
      }
      .date-time {
        display: flex;
        align-items: center;
        margin-left: 50rpx;
        .time {
          display: flex;
          align-items: center;
          justify-content: center;
          width: 40rpx;
          height: 40rpx;
          background-color: #ff0000;
          font-size: 24rpx;
          color: #ffffff;
          border-radius: 6rpx;
        }
        .da {
          font-size: 34rpx;
          color: #212121;
          margin: 0 6rpx;
        }
      }
    }
    .goods-list {
      display: flex;
      width: 100%;
      height: 220rpx;
      .list {
        width: 50%;
        height: 100%;
        .pictrue {
          width: 100%;
          height: 70%;
          image {
            width: 150rpx;
            height: 150rpx;
          }
        }
        .price {
          display: flex;
          align-items: center;
          width: 100%;
          height: 30%;
          .selling-price {
            font-size: 28rpx;
            font-weight: bold;
            color: #ff0000;
          }
          .original-price {
            font-size: 24rpx;
            text-decoration: line-through;
            color: #bbbaba;
            margin-left: 10rpx;
          }
        }
      }
    }
  }
  .good-choice {
    width: 50%;
    height: 100%;
    .goods-title {
      display: flex;
      align-items: center;
      padding: 0 20rpx;
      height: 80rpx;
      .title {
        display: flex;
        align-items: center;
        text {
          font-size: 28rpx;
          color: #4c4b4b;
        }
      }
      .describe {
        display: flex;
        align-items: center;
        margin-left: 10rpx;
        text {
          font-size: 24rpx;
          color: #979696;
        }
        .num {
          display: flex;
          align-items: center;
          justify-content: center;
          margin: 0 6rpx;
          width: 30rpx;
          height: 30rpx;
          background-color: #ff0000;
          color: #ffffff;
          border-radius: 6rpx;
        }
      }
    }
    .goods-list {
      display: flex;
      width: 100%;
      height: 220rpx;
      .list {
        width: 50%;
        height: 100%;
        .pictrue {
          width: 100%;
          height: 70%;
          image {
            width: 150rpx;
            height: 150rpx;
          }
        }
        .price {
          display: flex;
          align-items: center;
          width: 100%;
          height: 30%;
          .selling-price {
            font-size: 28rpx;
            font-weight: bold;
            color: #ff0000;
          }
          .original-price {
            font-size: 24rpx;
            text-decoration: line-through;
            color: #bbbaba;
            margin-left: 10rpx;
          }
        }
      }
    }
  }
}

.recommend-info {
  width: 100%;
  background-color: #f2f2f2;
  .recommend-title {
    display: flex;
    align-items: center;
    justify-content: center;
    width: 100%;
    height: 100rpx;
    .title {
      display: flex;
      align-items: center;
      image {
        width: 416rpx;
        height: 40rpx;
      }
    }
  }
  .goods-list {
    display: flex;
    flex-wrap: wrap;
    justify-content: space-between;
    padding: 0 30rpx;
    .list {
      width: 49%;
      height: 540rpx;
      margin-bottom: 20rpx;
      background-color: #ffffff;
      border-radius: 10rpx;
      overflow: hidden;
      .pictrue {
        display: flex;
        justify-content: center;
        width: 100%;
        image {
          height: 350rpx;
        }
      }
      .title-tag {
        // display: flex;
        height: 100rpx;
        padding: 20rpx;
        padding-bottom: 0rpx;
        .tag {
          float: left;
          margin-right: 10rpx;
          overflow: hidden;
          text-overflow: ellipsis;
          display: -webkit-box;
          -webkit-line-clamp: 2;
          -webkit-box-orient: vertical;
          white-space: normal;
          font-size: 26rpx;
          line-height: 40rpx;
          text {
            font-size: 24rpx;
            color: #ffffff;
            padding: 4rpx 16rpx;
            background: linear-gradient(to right, #fe3b0f, #fc603a);
            border-radius: 6rpx;
            margin-right: 10rpx;
          }
        }
      }
      .price-info {
        display: flex;
        flex-wrap: wrap;
        align-items: center;
        justify-content: space-between;
        padding: 0 20rpx;
        height: 30rpx;
        .user-price {
          display: flex;
          align-items: center;
          text {
            color: #ff0000;
          }
          .min {
            font-size: 24rpx;
          }
          .max {
            font-size: 32rpx;
          }
        }
        .vip-price {
          display: flex;
          align-items: center;
          image {
            width: 26rpx;
            height: 26rpx;
            margin-right: 10rpx;
          }
          text {
            color: #fcb735;
            font-size: 24rpx;
          }
        }
      }
    }
  }
}
</style>
