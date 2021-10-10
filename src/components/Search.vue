<template>
<AtSearchBar>
</template>

<script>
import { computed, defineComponent, PropType, toRefs } from "vue";

import { AtButton, AtList, AtListItem } from "taro-ui-vue3";
import { getArticles } from "../utils/api";

import Taro from "@tarojs/taro";
import { AtSearchBar } from "taro-ui";
export default class Index extends Taro.Component {
  constructor() {
    super(...arguments);
    this.state = {
      value: "",
    };
  }
  onChange(value) {
    this.setState({
      value: value,
    });
  }
  onActionClick() {
    console.log("开始搜索");
  }
  render() {
    return (
      <AtSearchBar
        inputType="number"
        value={this.state.value}
        onChange={this.onChange.bind(this)}
        onActionClick={this.onActionClick.bind(this)}
      />
    );
  }
}
</script>

<style lang="less">
</style>