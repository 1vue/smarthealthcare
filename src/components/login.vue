<template>
  <div
    ref="vantaRef"
    style="width:100%;height:100vh"
  >
    <div class="boxbody">
      <div class="box">
        <el-form>
          <h2>Sign in</h2>
          <div class="inputBox">
            <input
              type="text"
              required="required"
              v-model="loginform.username"
            >
            <span>UserName</span>
            <i></i>
          </div>
          <div class="inputBox">

            <input
              type="password"
              required="required"
              v-model="loginform.password"
            >
            <span>Password</span>
            <i></i>
          </div>
          <div class="links">
            <!-- <a href="#">Forgot Password ?</a> -->
            <el-link
              type="info"
              :underline="false"
            >Forgot Password ?</el-link>
            <!-- <div class="changcolor">

              <el-button
                type="text"
                @click="changeLogin"
              >{{loginShow}}</el-button>

            </div> -->
            <el-link
              @click="changeLogin"
              :underline="false"
            >{{loginShow}}</el-link>

          </div>

          <div class="sub"><el-button
              type="primary"
              @click="login"
              size="medium"
              round
            >submit</el-button></div>
        </el-form>
      </div>
    </div>
  </div>
</template>

<script>
import * as THREE from 'three'
import BIRDS from 'vanta/src/vanta.clouds.js'



export default {


  data () {
    return {
      loginform: {
        username: '',
        password: ''
      },
      loginStatus: 1,
      loginShow: 'I\'m a docter',
    }

  },
  methods: {
    login () {

      let data = {
        userName: this.loginform.username,
        passWord: this.loginform.password,
        indentify: this.loginStatus
      }
      let formdata = new FormData()
      for (let key in data) {
        formdata.append(key, data[key])
      }
      this.$http.post('/login', formdata).then(
        (res) => {
          if (res.data.code != 1)
            return this.$message.error("登录失败,用户名或密码错误");
          console.log(res);
          this.$message.success("登录成功")
          window.sessionStorage.setItem("token", res.data.data);

          console.log(res.data.indentify)
          if (res.data.indentify == 1)

            this.$router.push('/patienthome')

          else if (res.data.indentify == 2)
            this.$router.push('/docterhome')
          else if (res.data.indentify == 3)
            this.$router.push('/managerhome')

        }
      )

      //this.$router.push('/patienthome')

    },


    changeLogin () {
      if (this.loginStatus === 1) {

        this.loginStatus = 2;
        this.$message.success("成功切换到医生登录")
        this.loginShow = 'I\'m a manager'

      }

      else if (this.loginStatus === 2) {

        this.loginStatus = 3;
        this.$message.success("成功切换到管理员登录")
        this.loginShow = 'I\'m a patient'

      }
      else if (this.loginStatus === 3) {

        this.loginStatus = 1;
        this.loginShow = 'I\'m a docter'
        this.$message.success("成功切换到患者登录")
      }
    }
  },

  mounted () {
    this.vantaEffect = BIRDS({
      el: this.$refs.vantaRef,
      THREE: THREE
    })
    // VANTA.BIRDS({
    //   el: "#your-element-selector",
    //   mouseControls: true,
    //   touchControls: true,
    //   gyroControls: false,
    //   minHeight: 200.00,
    //   minWidth: 200.00,
    //   scale: 1.00,
    //   scaleMobile: 1.00
    // })

  },

  beforeDestroy () {
    if (this.vantaEffect) {
      this.vantaEffect.destroy()
    }
  },


}
</script>

<style scoped >
/* 引入需要的字体 */
/* @import url("https://fonts.googleapis.com/css2?family=Poppins:wght@300;400;500;600;700;800;900&display=swap"); */

* {
  margin: 0;
  padding: 0;
  box-sizing: border-box;
  font-family: "Poppins", sans-serif;
}

.boxbody {
  display: flex;
  justify-content: center;
  align-items: center;
  min-height: 100vh;
  flex-direction: column;
  /* background: #23242a; */
}

.box {
  display: flex;
  justify-content: center;
  align-items: center;
  position: relative;
  width: 380px;
  height: 420px;
  /* background: #1c1c1c; */

  border-radius: 8px;
  overflow: hidden;
}

.box::before {
  content: "";
  z-index: 1;
  position: absolute;
  top: -50%;
  left: -50%;
  width: 380px;
  height: 420px;
  transform-origin: bottom right;
  background: linear-gradient(0deg, transparent, #45f3ff, #45f3ff);
  animation: animate 6s linear infinite;
}

.box::after {
  content: "";
  z-index: 1;
  position: absolute;
  top: -50%;
  left: -50%;
  width: 380px;
  height: 420px;
  transform-origin: bottom right;
  background: linear-gradient(0deg, transparent, #45f3ff, #45f3ff);
  animation: animate 6s linear infinite;
  animation-delay: -3s;
}

@keyframes animate {
  0% {
    transform: rotate(0deg);
  }

  100% {
    transform: rotate(360deg);
  }
}

form {
  position: absolute;
  inset: 2px;
  /* background: #28292d; */
  /* background: #23242a; */
  background: rgba(255, 255, 255, 0.1);
  box-shadow: 5px 5px 0 0 rgba(0, 0, 0, 0.2);
  backdrop-filter: blur(30px);
  padding: 50px 40px;
  border-radius: 8px;
  z-index: 2;
  display: flex;
  flex-direction: column;
}

h2 {
  color: #8f8f8f;
  font-weight: 500;
  text-align: center;
  letter-spacing: 0.1em;
}

.inputBox {
  position: relative;
  width: 300px;
  margin-top: 35px;
}

.inputBox input {
  position: relative;
  width: 100%;
  padding: 20px 10px 10px;
  background: transparent;
  outline: none;
  box-shadow: none;
  border: none;
  color: #596865;
  font-size: 1em;
  letter-spacing: 0.05em;
  transition: 0.5s;
  z-index: 10;
}

.inputBox span {
  position: absolute;
  left: 0;
  padding: 20px 0px 10px;
  pointer-events: none;
  font-size: 1em;
  color: #8f8f8f;
  letter-spacing: 0.05em;
  transition: 0.5s;
}

.inputBox input:valid ~ span,
.inputBox input:focus ~ span {
  color: #8f8f8f;

  transform: translateX(0px) translateY(-34px);
  font-size: 0.75em;
}

.inputBox i {
  position: absolute;
  left: 0;
  bottom: 0;
  width: 100%;
  height: 2px;
  /* background: #45f3ff; */
  background: #8f8f8f;
  border-radius: 4px;
  overflow: hidden;
  transition: 0.5s;
  pointer-events: none;
  z-index: 9;
}

.inputBox input:valid ~ i,
.inputBox input:focus ~ i {
  height: 44px;
}

.links {
  display: flex;
  justify-content: space-between;
}

.links a {
  margin: 10px 0;
  font-size: 0.85em;
  color: #8f8f8f;
  text-decoration: beige;
}

.links a:hover,
.links a:nth-child(2) {
  color: #8f8f8f;
}

input[type="submit"] {
  border: none;
  outline: none;
  padding: 11px 25px;
  background: #45f3ff;
  cursor: pointer;
  border-radius: 4px;
  font-weight: 600;
  width: 100px;
  margin-top: 10px;
}

input[type="submit"]:active {
  opacity: 0.8;
}
.sub {
  margin-top: 30px;
}
/* .changcolor el-button span {
  text-decoration-color: #97b4bd !important;
} */
</style>