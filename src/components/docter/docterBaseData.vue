<template>
  <div>
    <!-- 面包屑导航 -->
    <el-breadcrumb separator-class="el-icon-arrow-right">
      <el-breadcrumb-item
        :to="{ path: '/docterBaseData' }">首页</el-breadcrumb-item>
      <el-breadcrumb-item>医生信息展示</el-breadcrumb-item>

    </el-breadcrumb>
    <!-- 卡片视图区 -->
    <el-card class="box-card">
      <div
        slot="header"
        class="clearfix"
      >

        <span>基本信息</span>

      </div>
      <div class="data">

        <div class="demo-fit">
          <div
            class="block"
            v-for="fit in fits"
            :key="fit"
          >
            <span class="title"></span>
            <el-avatar
              shape="square"
              :size="100"
              :fit="fit"
              :src="url"
            ></el-avatar>
          </div>
        </div>

        <div class="info">
          <el-descriptions
            :column="1"
            size="medium"
            border
          >

            <el-descriptions-item>
              <template slot="label">
                <i class="el-icon-user-solid"></i>
                姓名
              </template>
              {{ basedata.name }}
            </el-descriptions-item>
            <el-descriptions-item>
              <template slot="label">
                <i class="el-icon-s-custom"></i>
                性别
              </template>
              {{basedata.sex}}
            </el-descriptions-item>

            <el-descriptions-item>
              <template slot="label">
                <i class="el-icon-mobile-phone"></i>
                手机号
              </template>
              {{ basedata.phoneNumber }}
            </el-descriptions-item>

            <el-descriptions-item>
              <template slot="label">
                <i class="el-icon-office-building"></i>
                所属科室
              </template>
              {{ basedata.room }}
            </el-descriptions-item>
            <el-descriptions-item>
              <template slot="label">
                <i class="el-icon-coordinate"></i>
                职务
              </template>
              {{ basedata.degree }}
            </el-descriptions-item>

          </el-descriptions>
        </div>

      </div>

      <el-divider></el-divider>

    </el-card>
  </div>
</template>



<script>
export default {
  data () {
    return {
      // 获取用户列表的参数对象


      basedata: {

        name: '',
        sex: '',
        phoneNumber: '',
        room: '',
        degree: ''

      },
      fits: ['fill'],
      url: 'https://fuss10.elemecdn.com/e/5d/4a731a90594a4af544c0c25941171jpeg.jpeg'



    }

  },
  created () {

  },

  methods: {

    getBaseData () {

      this.$http({
        url: '/docter/baseInfo',
        method: "get",
        headers: {
          token: window.sessionStorage.getItem('token'),
          "Content-Type": "multipart/form-data",
        },

      }).then((res) => {
        console.log(res);
        this.basedata = res.data.data;
        if (res.data.code === 1)
          this.$message.success('查询成功')

      })


    }


  },


  mounted () {

    this.getBaseData();


  },





}
</script>

<style lang="less" scoped>
.data {
  display: flex;
  justify-content: center;
  flex-direction: column;
  align-items: center;
}

.block {
  margin-left: -300px;
}

.box-card {
  margin-top: 20px;
}
.info {
  width: 600px;
}
</style>