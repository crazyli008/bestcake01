<template>
  <div>
    <!-- 为了能显示详情，新建一个详情模块，并将它添加到router中 -->
    详情页
  </div>
</template>

<script>
export default {
  mounted() {
    //   获取路由用route
    var query = this.$route.query;
    var prom = this.$apis.getShowDataOne({
      Name: query.Name,
      m: "GetNSCakeByName"
    });
    prom.then(res => {
      console.log(res);
    });
  }
};
</script>
