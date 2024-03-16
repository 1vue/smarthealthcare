<template>
  <div>
    <el-breadcrumb separator-class="el-icon-arrow-right">
      <el-breadcrumb-item
        :to="{ path: '/patientWelcome' }">首页</el-breadcrumb-item>

    </el-breadcrumb>
    <el-card class="box-card">

      <div
        slot="header"
        class="clearfix"
      >

        <span>医院简介</span>

      </div>

      <el-carousel
        :interval="4000"
        type="card"
        height="200px"
      >
        <el-carousel-item
          v-for="item in pic"
          :key="item"
        >

          <img
            style="object-fit: scale-down; width: 100%; height: 100%;"
            :src="item.url"
            alt=""
          >
        </el-carousel-item>
      </el-carousel>
    </el-card>

  </div>
</template>

<script>
export default {

  data () {
    return {
      pic: [
        { url: require('@/assets/login.jpg') },
        { url: require('@/assets/建模.webp') },
        { url: require('@/assets/蓝桥杯.webp') },
        { url: require('@/assets/建模.webp') },

      ],
      tableData: [


        {
          date: '2016-05-02',
          name: '王小虎',
          address: '上海市普陀区金沙江路 1518 弄'
        },

      ]
    }
  },

}
</script>

<style scoped>
.box-card {
  margin-top: 20px;
  height: 600px;
}
.table {
  margin-left: 100px;
  margin-top: 60px;
}
</style>