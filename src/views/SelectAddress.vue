<template>
  <div class="select-address">
    <mt-header title="请选择收货地址">
      <router-link to="/" slot="left">
        <mt-button icon="back"></mt-button>
      </router-link>
    </mt-header>
    <Address :city="city" :result.sync="citys" class="address">
      <router-link :to="{name:'home', params: {address: item.title}}" v-for="(item,index) in citys" :key="index">
        <div class="city-item">
          <div class="info">
            <p class="name">{{item.title}}</p>
            <p class="city">{{item.address}}</p>
          </div>
          <div class="distince">
            {{item.distince | distince}}
          </div>
        </div>
      </router-link>
    </Address>
  </div>
</template>

<script>
import { Header, Cell } from "mint-ui";
import Address from "../components/Address.vue";
import BMap from "BMap";
import { mapState } from "vuex";
export default {
  name: "SelectAddress",
  computed: {
    ...mapState({
      // 注意：访问的时候加模块名base 因为分模块开发
      city: state => state.base.city,
      lng: state => state.base.lng,
      lat: state => state.base.lat
    })
  },
  created() {
    var vm = this;
    var map = new BMap.Map();
    var mPoint = new BMap.Point(vm.lng, vm.lat);//在app.vue获取到的坐标

    var local = new BMap.LocalSearch(mPoint, {
      onSearchComplete: function(results) {
        if (local.getStatus() == BMAP_STATUS_SUCCESS) {
          var s = [];
          console.log(results);
          for (var i = 0; i < results.getCurrentNumPois(); i++) {
            var current = results.getPoi(i);
            s.push({
              title: current.title,
              address: current.address,
              distince: map.getDistance(current.point, mPoint)
            });
          }
          vm.citys = s;
          console.log(vm.citys);
        }
      }
    });
    // 强制在本地查找
    local.search("美食", { forceLocal: true });
  },
  data() {
    return {
      citys: []
    };
  },
  components: {
    Address
  }
};
</script>

<style scoped>
.address {
  height: calc(100vh - 100px) !important;
  background-color: #f4f4f4;
}

.address a {
  display: block;
  color: #000;
}

.city-item {
  padding: 10px;
  display: flex;
  justify-content: space-between;
}

.city-item .info p {
  margin: 0;
}

.city-item .name {
  font-weight: 700;
}

.city-item .city {
  font-size: 12px;
}
</style>


