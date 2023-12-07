<script lang="ts" setup>
import { icons } from '@langhua/el-icon-ext/global'
import { Paste } from '@langhua/el-icon-ext'
</script>

<template>
  <Paste class="icon" />
  <hr />
  <component :is="Icon" v-for="(Icon, key) in icons" :key="key" class="icon" />
  <hr />
  <component
    :is="`ElIcon${key}`"
    v-for="key in Object.keys(icons)"
    :key="key"
    class="icon"
  />
</template>

<style>
.icon {
  height: 48px;
  color: #409eff;
}
</style>
