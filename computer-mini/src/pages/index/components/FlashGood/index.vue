<template>
  <view class="flash-good">
    <view class="flash-sale">
      <view class="line"></view>
      <view class="flash-title" @tap="emit('skip','flash')">
        <view class="pictrue">
          <image src="/static/xsqg_title.png" />
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
        <view class="list" v-for="(item, i) in flashSale" :key="i" @tap="emit('skip','goods')">
          <view class="pictrue">
            <image :src="item.img" />
          </view>
          <view class="price">
            <text class="selling-price">￥{{ item.price }}</text>
            <text class="original-price">￥{{ item.original }}</text>
          </view>
        </view>
      </view>
    </view>
    <view class="good-choice">
      <view class="goods-title" @tap="emit('skip','GoodChoice')">
        <view class="title"><text>好货精选</text></view>
        <view class="describe">
          <text>全场</text><text class="num">1</text><text>折起</text>
        </view>
      </view>
      <view class="goods-list">
        <view class="list" v-for="(item, i) in goodChoice" :key="i" @tap="emit('skip','goods')">
          <view class="pictrue">
            <image :src="item.img" />
          </view>
          <view class="price">
            <text class="selling-price">￥{{ item.price }}</text>
            <text class="original-price">￥{{ item.original }}</text>
          </view>
        </view>
      </view>
    </view>
  </view>
</template>

<script setup lang="ts">
type Item = { img: string; price: number; original: number }
const { flashSale, goodChoice } = defineProps<{ flashSale: Item[]; goodChoice: Item[] }>()
const emit = defineEmits<{ (e:'skip', type:string): void }>()
</script>