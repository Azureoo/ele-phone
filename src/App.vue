<template>
  <div id="app">
    <router-view></router-view>
    <Footer></Footer>
  </div>
</template>

<script>
import Footer from "./components/Footer.vue";
import { mapMutations } from "vuex";
import { SET_LOCATION, SET_CITY } from "./stores/modules/base/mution-types";
export default {
  name: "App",
  components: {
    Footer
  },
  created() {
    this.geolocation();
    this.timer = setInterval(() => {
      this.geolocation();
    }, 1000 * 60 * 30);//30分钟重新定位
  },
  methods: {
    geolocation() {
      var vm = this;
      var gl = new BMap.Geolocation();
      gl.getCurrentPosition(function(r) {
        if (this.getStatus() == BMAP_STATUS_SUCCESS) {
          // console.log("您的位置：" + r.point.lng + "," + r.point.lat);
          vm.setLocation({ lng: r.point.lng, lat: r.point.lat });//经度 纬度
          var myCity = new BMap.LocalCity();//获取当前城市
          myCity.get(function(r) {//与上面的r不是一个
            // console.log("当前定位城市:" + r.name);
            // vm[SET_CITY](r.name);
            vm.setCity(r.name);
          });
        } else {
          console.error("failed" + gl.getStatus());
        }
      });
    },
    ...mapMutations([SET_LOCATION, SET_CITY])
  },
  beforeDestroy() {
    clearInterval(this.timer);//避免内存泄露
  }
};
</script>

<style lang="scss">
@import "./assets/icons/iconfont.css";
body {
  margin: 0;
  padding: 0;
}

a {
  text-decoration: none;
}

.clear::after {
  clear: both;
  display: inline-block;
  content: "";
  visibility: hidden;
  height: 0;
}

.address .mint-searchbar,
.address .mint-search-list {
  background-color: #fff !important;
}

.address .mint-search-list {
  margin-top: 50px;
}

.address .mint-searchbar-inner,
.mint-searchbar-inner input {
  background-color: #f2f2f2 !important;
}
</style>
