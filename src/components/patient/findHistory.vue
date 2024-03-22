<template>
  <div>
    <el-breadcrumb separator-class="el-icon-arrow-right">
      <el-breadcrumb-item :to="{ path: '/basedata' }">首页</el-breadcrumb-item>
      <el-breadcrumb-item>个人病历查询</el-breadcrumb-item>

    </el-breadcrumb>

    <el-card class="box-card">

      <div
        slot="header"
        class="clearfix"
      >

        <span>病历历史</span>

      </div>
      <div class="find">

        <div class="search">
          <el-form :inline="true">
            <el-form-item label="疾病名称">
              <el-input
                v-model="searchForm.kind"
                placeholder="请输入疾病名称"
              ></el-input>
            </el-form-item>
            <el-form-item label="病情程度">
              <el-input
                v-model="searchForm.degree"
                placeholder="请输入病情程度"
              ></el-input>
            </el-form-item>
            <el-form-item label="医生姓名">
              <el-input
                v-model="searchForm.docterName"
                placeholder="请输入医生姓名"
              ></el-input>
            </el-form-item>
            <el-form-item>
              <el-tooltip
                class="item"
                effect="dark"
                content="点击查询相关病历信息"
                placement="top-start"
              >
                <el-button
                  @click="search"
                  type="primary"
                >查询</el-button>

              </el-tooltip>
            </el-form-item>
          </el-form>
        </div>

        <div class="data">
          <el-table
            :data="historyData"
            stripe
            style="width: 100%"
            border
          >
            <el-table-column
              prop="kind"
              label="疾病名称"
              width="300"
            >
            </el-table-column>
            <el-table-column
              prop="degree"
              width="300"
              label="病情程度"
            >
            </el-table-column>
            <el-table-column
              prop="docterName"
              label="医生姓名"
              width="300"
            >
            </el-table-column>

            <el-table-column
              prop="time"
              label="患病时间"
            >
            </el-table-column>

          </el-table>
        </div>

        <div class="page">
          <el-pagination
            @size-change="handleSizeChange"
            @current-change="handleCurrentChange"
            background
            layout=" prev, pager, next"
            :page-sizes="[5,6,7]"
            :page-size.sync="pageSize"
            :current-page.sync="currentPage"
            :total="total"
          >
          </el-pagination>

        </div>
      </div>

    </el-card>

  </div>
</template>

<script>
export default {
  data () {
    return {

      count: 0,
      total: 100,

      currentPage: 1,
      pageSize: 5,


      searchForm: {
        docterName: '',
        kind: '',
        degree: '',
      },

      historyData: [

      ]
    }
  },
  methods: {


    search () {

      let data = {
        docterName: this.searchForm.docterName,
        kind: this.searchForm.kind,
        degree: this.searchForm.degree,
      }
      let formdata = new FormData()
      for (let key in data) {
        formdata.append(key, data[key])
      }

      this.$http({
        url: '/patient/searchRecord',
        method: "post",
        params: {
          pageSize: this.pageSize,
          currentPage: this.currentPage
        },
        headers: {
          token: window.sessionStorage.getItem('token'),
          "Content-Type": "multipart/form-data",
        },
        data: formdata,

      }).then((res) => {
        console.log(res);
        this.historyData = res.data.data.table;
        this.total = res.data.data.total;
        for (let index = 0; index < this.historyData.length; index++) {
          this.historyData[index].time = this.historyData[index].time.replace('T', ' ')

        }

        if (res.data.code === 1) {
          if (this.count == 0) {
            this.$message.success('查询成功,共查询到' + this.total + '条数据')
            this.count++;
          }
        }

      })

    },

    handleSizeChange (size) {
      this.$message.success("一页大小改变为：" + this.pageSize);
      this.search();
    },

    handleCurrentChange (currentPage) {


      this.$message.success("页码数改变为" + this.currentPage);
      this.search();

    },

  },
  mounted () {
    this.search()
  },



}
</script>

<style scoped lang="less">
.box-card {
  margin-top: 20px;
  height: 650px;
}

.find {
  display: flex;
  flex-direction: column;

  .data {
    height: 400px;
  }
}

.search {
  display: flex;
  flex-direction: row;
}
.el-table {
  margin-left: 20px;
}

.page {
  // margin-top: 10px;
  // text-align: center;
  .el-pagination {
    margin-left: 400px;
  }
}
</style>