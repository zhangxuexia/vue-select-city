<template>
  <div>
  <div style="margin-bottom:10px">
    <label>省市区三级联动下拉组件：</label>
  </div>
  <citySelect :address="address" @saveLoca="saveLoca"></citySelect>
  <input :value="addressA.province" name="enterpriseOfficeProvince" type="hidden">
  <input :value="addressA.city" name="enterpriseOfficeCity" type="hidden">
  <input :value="addressA.country" nmae="enterpriseOfficeDistrict" type="hidden">
  </div>
</template>

<script>
  import city from 'components/city.vue';
export default {
  data () {
    return {
      address:{province:'3',city:'3',country:''},
      addressA:''
    }
  },
  components:{
    citySelect:city
  },
  methods:{
    saveLoca(data){
      this.addressA=data;
    }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
h1, h2 {
  font-weight: normal;
}
ul {
  list-style-type: none;
  padding: 0;
}
li {
  display: inline-block;
  margin: 0 10px;
}
a {
  color: #42b983;
}
</style>
