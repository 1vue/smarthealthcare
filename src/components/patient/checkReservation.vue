<template>
  <div>
    <el-breadcrumb separator-class="el-icon-arrow-right">
      <el-breadcrumb-item :to="{ path: '/basedata' }">首页</el-breadcrumb-item>
      <el-breadcrumb-item>预约信息查询</el-breadcrumb-item>

    </el-breadcrumb>
    <el-card class="box-card">
      <div
        slot="header"
        class="clearfix"
      >

        <span>预约信息查询</span>

      </div>

      <div class="find">

        <div class="search">
          <el-form :inline="true">
            <el-form-item label="医生姓名">
              <el-input
                v-model="searchForm.docterName"
                placeholder="请输入医生姓名"
              ></el-input>
            </el-form-item>
            <el-form-item label="预约状态">
              <el-select
                v-model="searchForm.status"
                placeholder="请选择"
              >
                <el-option
                  label="全部"
                  value=""
                ></el-option>
                <el-option
                  label="未处理"
                  value="0"
                ></el-option>
                <el-option
                  label="已接受"
                  value="1"
                ></el-option>
                <el-option
                  label="已拒绝"
                  value="2"
                ></el-option>
              </el-select>
            </el-form-item>

            <el-tooltip
              class="item"
              effect="dark"
              content="点击查询预约信息"
              placement="top-start"
            >
              <el-button
                @click="search"
                type="primary"
              >查询</el-button>

            </el-tooltip>

          </el-form>
        </div>

        <div>
          <el-table
            :data="reservationData"
            stripe
            style="width: 100%"
            border
          >

            <el-table-column
              prop="docterName"
              label="医生姓名"
            >
            </el-table-column>

            <el-table-column
              prop="docterRoom"
              label="科室"
            >

            </el-table-column>
            <el-table-column
              prop="startTime"
              label="预约开始时间"
            >

            </el-table-column>
            <el-table-column
              prop="endTime"
              label="预约结束时间"
            >

            </el-table-column>
            <el-table-column label="操作">
              <template slot-scope="scope">
                <el-tooltip
                  class="item"
                  effect="dark"
                  content="点击删除该预约"
                  placement="top-start"
                >
                  <el-button
                    round
                    size="small"
                    type="danger"
                    @click="deleteReservation(scope.row.id)"
                  >删除该预约</el-button>
                </el-tooltip>
              </template>

            </el-table-column>

          </el-table>
        </div>

      </div>

    </el-card>

  </div>
</template>

<script>
export default {
  data () {
    return {

      searchForm: {
        docterName: '',
        startTime: '',
        endTime: '',
        status: ''

      },

      reservationData: []


    }
  },



  methods: {

    search () {



      let formdata = new FormData()

      formdata.append('status', this.searchForm.status)
      formdata.append('docterName', this.searchForm.docterName)

      this.$http({
        url: '/patient/checkReservationStatus',
        method: "post",
        headers: {
          token: window.sessionStorage.getItem('token'),
          "Content-Type": "multipart/form-data",
        },
        data: formdata,

      }).then((res) => {
        console.log(res);
        this.reservationData = res.data.data;

        for (let index = 0; index < this.reservationData.length; index++) {
          this.reservationData[index].startTime = this.reservationData[index].startTime.replace('T', ' ')
          this.reservationData[index].endTime = this.reservationData[index].endTime.replace('T', ' ')
        }


        if (res.data.code === 1)
          this.$message.success('查询成功,共查询到' + this.reservationData.length + '条数据')


      })

    },



    deleteReservation (id) {
      this.$alert('确定删除该预约？', '提示', {
        confirmButtonText: '确定',
        callback: action => {

          if (action === 'confirm') {

            let formdata = new FormData()
            formdata.append('id', id)

            this.$http({
              url: '/patient/deleteReservation',
              method: "delete",
              headers: {
                token: window.sessionStorage.getItem('token'),
                "Content-Type": "multipart/form-data",
              },
              data: formdata,

            }).then((res) => {
              console.log(res);

              if (res.data.code === 1) {

                this.$message.success('删除成功')
                this.search()
              }

              else
                this.$message.error('删除失败')
            })
          }


        }
      });
    },



  },

  mounted () {
    this.search()
  },

}
</script>









<style scoped>
.box-card {
  margin-top: 20px;
  height: 650px;
}
.find {
  display: flex;
  flex-direction: column;
}
.search {
  display: flex;
  flex-direction: row;
}
</style>