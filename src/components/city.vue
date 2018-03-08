<template>
  <div>
    <select v-model="addressA.province">
      <option v-for="item in selectA.province" :value="item.provinceId">{{item.provinceName}}</option>
    </select>
    <select v-model="addressA.city">
      <option v-for="item in selectA.city" :value="item.cityId">{{item.cityName}}</option>
    </select>
    <select v-model="addressA.country">
      <option v-for="item in selectA.country" :value="item.districtId">{{item.districtName}}</option>
    </select>
  </div>
</template>
<script type="text/ecmascript-6">
  export default {
    data(){
      return  {
        selectA:{province:[], city:[],country:[]},
        addressA:Object.assign({},this.address)
      }
    },
    props:{
      address:{province:{type:String,default:''},city:{type:String,default:''},country:{type:String,default:''}}
    },
    created(){
      this.$http.get('/static/mock/sys/getCity.json').then((response) => {
        let a=response.data;
        if (a.status === 0) {
          this.selectA.province = a.data;
          if(this.addressA.province==''){
            this.addressA.province=this.selectA.province[0].provinceId;
          }
          else{
            this.getCity(this.addressA.province);
          }
        }
      }, function(response){
        // 响应错误回调
      });
    },
    watch:{
      'addressA.province':{
        handler:function(curVal,oldVal){
          this.getCity(curVal);
        }
      },
      'addressA.city':{
        handler:function(curVal,oldVal){
          this.getContry({cityId:curVal});
        }
      }
    },
    methods:{
      getCity(provinceId){
        this.selectA.city=this.selectA.province.filter((i)=>{return i.provinceId ==provinceId})[0].cities;
        this.addressA.city=this.selectA.city[0].cityId;
      },
      getContry(data){
        this.$http.get('/static/mock/getDistinct.json',data).then((response) => {
          let a=response.data;
          if (a.status === 0) {
            this.selectA.country = a.data;
            this.addressA.country=this.selectA.country[0].districtId;
            this.$emit('saveLoca',this.addressA);
          }
        }, function(response){
          // 响应错误回调
        });
      }
    }
  }
</script>
<style >
 select{
   width: 10%;
   height: 36px;
   line-height: 34px;
   background: #f4f4f4;
   background-image: -ms-linear-gradient(90deg, #f9f9f9 0%, #f4f4f4 40%, #f9f9f9 100%);
   border: 1px solid #d4d4d4;
   color: #fff;
   color: #717171;
 }
</style>
