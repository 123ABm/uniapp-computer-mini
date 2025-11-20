<template>
  <view class="add-page">
    <view class="card">
      <view class="row">
        <text class="label">收货人</text>
        <input class="input" placeholder="请填写收货人姓名" v-model="name" />
      </view>
      <view class="row">
        <text class="label">手机号</text>
        <view class="phone">
          <text class="prefix">+86</text>
          <input
            class="input"
            type="number"
            placeholder="请填写收货人手机号"
            v-model="phone"
          />
        </view>
      </view>
    </view>

    <view class="card">
      <view class="row between">
        <text class="label">地图选址</text>
        <text class="label">地区选址</text>
      </view>
      <view class="row">
        <text class="label">地址</text>
        <picker mode="region" @change="onRegionChange">
          <view class="picker">{{ regionText }}</view>
        </picker>
      </view>
      <view class="row">
        <text class="label">门牌号</text>
        <input class="input" placeholder="例：6栋201室" v-model="door" />
      </view>
    </view>

    <view class="card">
      <view class="row">
        <text class="label">地址粘贴板</text>
      </view>
    </view>

    <view class="card">
      <view class="row">
        <text class="label">设为默认地址</text>
        <switch
          :checked="isDefault"
          @change="isDefault = $event.detail.value"
        />
      </view>
    </view>

    <view class="card">
      <view class="label">标签</view>
      <view class="tags">
        <view
          v-for="t in tags"
          :key="t"
          class="tag"
          :class="{ active: label === t }"
          @tap="chooseLabel(t)"
          >{{ t }}</view
        >
      </view>
    </view>

    <view class="footer">
      <button class="confirm" @tap="confirm">确认</button>
    </view>
  </view>
</template>

<script setup lang="ts">
import { ref, computed } from "vue";
import { onLoad } from "@dcloudio/uni-app";

const name = ref("");
const phone = ref("");
const region = ref<string[]>([]);
const regionDisplay = ref("");
const door = ref("");
const isDefault = ref(false);
const label = ref("家");
const tags = ["学校", "家", "公司", "购物", "外卖", "自定义"];
const isEdit = ref(false);
const editId = ref<number | null>(null);
const regionText = computed(() =>
  regionDisplay.value || (region.value.length ? region.value.join(" ") : "选择收货地址")
);

onLoad((opts: any) => {
  if (opts && opts.id) {
    isEdit.value = true;
    editId.value = Number(opts.id);
    try {
      const ea = uni.getStorageSync("edit-address");
      if (ea && ea.id) {
        name.value = ea.name || "";
        phone.value = ea.phone || "";
        label.value = ea.label || "家";
        regionDisplay.value = (ea.detail || "").trim();
        isDefault.value = !!ea.default;
      }
    } catch (e) {}
  }
});

function onRegionChange(e: any) {
  const arr = e.detail.value || [];
  region.value = arr;
  regionDisplay.value = arr.join(" ");
}
function chooseLabel(t: string) {
  label.value = t;
}

function confirm() {
  const id = isEdit.value && editId.value ? editId.value : Date.now();
  const detail = `${regionText.value} ${door.value}`.trim();
  const data = {
    id,
    name: name.value || "未命名",
    phone: phone.value || "13800000000",
    label: label.value,
    detail,
    default: isDefault.value,
  };
  try {
    uni.setStorageSync(isEdit.value ? "updated-address" : "new-address", data);
  } catch (e) {}
  uni.navigateBack();
}
</script>

<style lang="scss">
.add-page {
  background: #f7f7f7;
  min-height: 100vh;
  padding-bottom: 120rpx;
}
.card {
  margin: 20rpx;
  background: #fff;
  border-radius: 16rpx;
  padding: 16rpx;
}
.row {
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 12rpx 0;
}
.between {
  justify-content: space-between;
}
.label {
  font-size: 26rpx;
  color: #333;
}
.input {
  flex: 1;
  text-align: right;
  font-size: 26rpx;
}
.phone {
  flex: 1;
  display: flex;
  align-items: center;
  justify-content: flex-end;
  gap: 12rpx;
}
.prefix {
  color: #999;
}
.picker {
  color: #999;
}
.tags {
  display: flex;
  flex-wrap: wrap;
  gap: 12rpx;
  margin-top: 12rpx;
}
.tag {
  padding: 10rpx 20rpx;
  border-radius: 24rpx;
  background: #f5f5f5;
  font-size: 24rpx;
}
.tag.active {
  background: #ffe9e9;
  color: #ff4d4f;
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
.confirm {
  width: 100%;
  height: 80rpx;
  border-radius: 40rpx;
  background: #ff4d4f;
  color: #fff;
}
</style>
