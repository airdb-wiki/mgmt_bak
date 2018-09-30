<template>
  <div id="navbar">
    <ul>
    	<li v-for="(tab, index) in tabs" :key="tab.id">{{tab}}</li>
    </ul>
  </div>
</template>

<script>
export default{
  name: 'navbar',
  props: ['tabs']
}
</script>

<style scoped>
.navbar{
	width: 100%;
	height: 20px;
}
ul{
  position: fixed;
  top: 0px;
  padding: 4px 0;
  background-color: #fff;
  margin: 0 0 2px 0;
}
li{
  display: inline;
  padding: 8px 21px;
  background-color: #fff;
  font-size: 17px;
}
li:hover{
  font-weight:bold;
  text-align:center;
  padding: 8px 21px;
  text-decoration:none;
  text-transform:uppercase;
  font-size: 16px;
  border-bottom: 4px solid #e2d609;
}
</style>