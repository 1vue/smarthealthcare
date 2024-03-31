<template>
  <div>
    <el-breadcrumb separator-class="el-icon-arrow-right">
      <el-breadcrumb-item :to="{ path: '/basedata' }">首页</el-breadcrumb-item>
      <el-breadcrumb-item>医生信息查询</el-breadcrumb-item>

    </el-breadcrumb>
    <el-card class="box-card">
      <div
        slot="header"
        class="clearfix"
      >

        <span>医生信息查询</span>

      </div>

      <div class="find">

        <div class="search">
          <el-form :inline="true">
            <el-form-item label="医生姓名">
              <el-input
                v-model="searchForm.name"
                placeholder="请输入医生姓名"
              ></el-input>
            </el-form-item>
            <el-form-item label="性别">
              <el-select
                v-model="searchForm.sex"
                placeholder="请选择性别"
              >
                <el-option
                  label="全部"
                  value=""
                ></el-option>
                <el-option
                  label="男"
                  value="男"
                ></el-option>
                <el-option
                  label="女"
                  value="女"
                ></el-option>
              </el-select>
            </el-form-item>
            <el-form-item label="科室">
              <el-input
                v-model="searchForm.room"
                placeholder="请输入医生所属科室"
              ></el-input>
            </el-form-item>
            <el-form-item label="职务">
              <el-input
                v-model="searchForm.degree"
                placeholder="请输入医生职务"
              ></el-input>
            </el-form-item>

            <el-tooltip
              class="item"
              effect="dark"
              content="点击查询相关医生信息"
              placement="top-start"
            >
              <el-button
                @click="search"
                type="primary"
              >查询</el-button>

            </el-tooltip>

          </el-form>
        </div>

        <div class="data">

          <el-table
            :data="docterData"
            stripe
            style="width: 100%"
            border
          >

            <el-table-column
              prop="name"
              label="医生姓名"
            >
            </el-table-column>
            <el-table-column
              prop="sex"
              label="性别"
            >
            </el-table-column>
            <el-table-column
              prop="room"
              label="科室"
            >
            </el-table-column>
            <el-table-column
              prop="degree"
              label="职务"
            >
            </el-table-column>
            <el-table-column
              prop="phoneNumber"
              label="电话号码"
            >
            </el-table-column>
            <el-table-column label="操作">
              <template slot-scope="scope">
                <el-tooltip
                  class="item"
                  effect="dark"
                  content="预约该医生"
                  placement="top-start"
                >
                  <el-button
                    @click="dialogVisibleOpen(scope.row.userName)"
                    type="primary"
                  >预约</el-button>
                </el-tooltip>
                <el-dialog
                  title="预约医生"
                  :visible.sync="dialogVisible"
                  width="50%"
                  @close="dialogVisibleClose"
                >
                  <el-form
                    :model="reservationTime"
                    ref="reservationTimeRef"
                    label-width="140px"
                    style="margin-top: 8px;"
                  >
                    <el-form-item
                      label="预约开始时间"
                      prop="startTime"
                      style="margin-top: 15px;"
                    >
                      <div class="block">

                        <el-date-picker
                          v-model="reservationTime.startTime"
                          value-format="yyyy-MM-dd HH:mm:ss"
                          type="datetime"
                          placeholder="选择日期时间"
                        >
                        </el-date-picker>
                      </div>
                    </el-form-item>
                    <el-form-item
                      label="预约结束时间"
                      prop="endTime"
                      style="margin-top: 15px;"
                    >
                      <div class="block">

                        <el-date-picker
                          v-model="reservationTime.endTime"
                          value-format="yyyy-MM-dd HH:mm:ss"
                          type="datetime"
                          placeholder="选择日期时间"
                        >
                        </el-date-picker>
                      </div>
                    </el-form-item>

                  </el-form>
                  <span
                    slot="footer"
                    class="dialog-footer"
                  >
                    <el-button @click="dialogVisible = false">取 消</el-button>
                    <el-button
                      type="primary"
                      @click="reservation"
                    >确 定</el-button>
                  </span>
                </el-dialog>
              </template>

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
        name: '',
        sex: '',
        room: '',
        degree: '',

      },

      docterData: [

      ],
      dialogVisible: false,


      reservationTime: {

        DocterUserName: '',
        startTime: '',
        endTime: ''

      },


    }
  },



  methods: {

    search () {


      let formdata = new FormData()
      for (let key in this.searchForm) {
        formdata.append(key, this.searchForm[key])
      }

      this.$http({
        url: '/patient/findDocter',
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
        this.docterData = res.data.data.table;
        this.total = res.data.data.total;


        if (res.data.code === 1) {
          if (this.count == 0) {
            this.$message.success('查询成功,共查询到' + this.total + '条数据')
            this.count++;
          }
        }

      })

    },
    dialogVisibleClose () {
      this.$refs.reservationTimeRef.resetFields()
    },
    dialogVisibleOpen (userName) {
      this.reservationTime.DocterUserName = userName
      this.dialogVisible = true
    },


    reservation () {
      const workingHoursStart = 8; // 上班时间8点
      const workingHoursEnd = 17; // 下班时间17点
      let formdata = new FormData()
      for (let key in this.reservationTime) {
        formdata.append(key, this.reservationTime[key])
      }


      console.log(this.reservationTime);


      let time1 = new Date(this.reservationTime.startTime)

      let time2 = new Date(this.reservationTime.endTime)

      let hour1 = time1.getHours();
      let hour2 = time2.getHours();

      if (time2 > time1) {
        let hourDifference = (time2 - time1) / (1000 * 60 * 60);

        if (hourDifference <= 3) {

          if (hour1 >= workingHoursStart && hour2 <= workingHoursEnd) {
            this.$http({
              url: '/patient/reservation',
              method: "put",
              headers: {
                token: window.sessionStorage.getItem('token'),
                "Content-Type": "multipart/form-data",
              },
              data: formdata,

            }).then((res) => {
              console.log(res);


              if (res.data.code == 0) { this.$message.error("预约失败") }
              else {

                this.dialogVisible = false;
              }


            })


            this.$notify({
              title: '成功',
              message: '预约成功，请按时前往诊治',
              type: 'success'
            });


          }
          else {
            this.$alert('您当前预约的时间不在医院工作时间内，请重新选择', '温馨提示', {
              confirmButtonText: '确定',
              callback: action => {

                this.reservationTime.startTime = ''
                this.reservationTime.endTime = ''
              }
            });
          }



        }
        else {

          this.$alert('预约时间过长，请重新选择时间', '温馨提示', {
            confirmButtonText: '确定',
            callback: action => {

              this.reservationTime.startTime = ''
              this.reservationTime.endTime = ''
            }
          });
        }
      }
      else {

        this.$alert('预约时间输入有误，请重新输入', '温馨提示', {
          confirmButtonText: '确定',
          callback: action => {

            this.reservationTime.startTime = ''
            this.reservationTime.endTime = ''
          }
        });




      }


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

.page {
  // margin-top: 10px;
  // text-align: center;
  .el-pagination {
    margin-left: 400px;
  }
}
</style>