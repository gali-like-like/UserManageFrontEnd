<template>
  <el-row :gutter="20" justify="center" class="rows">
    <el-col :span="6">
      <el-input placeholder="请输入手机号" type="text" v-model="this.$store.state.userInfo.phone">
        <template #prefix>
          <el-icon>
            <Phone />
          </el-icon>
        </template>
      </el-input>
    </el-col>
  </el-row>
  <el-row :gutter="20" justify="center" class="rows">
    <el-col :span="6">
      <el-input placeholder="请输入验证码" class="codeInput" v-model="this.$store.state.userInfo.code">
        <template #append>
          <el-button @click="getCode" id="getIdBtn">
            {{this.getCodeMsg}}
          </el-button>
        </template>
        <template #prefix>
          <el-icon>
            <Message />
          </el-icon>
        </template>
      </el-input>
    </el-col>
  </el-row>
</template>

<script>
import {Phone,Message} from "@element-plus/icons-vue";
import axios from "axios";
export default {
  name: "GetCheckCodeComp",
  components: {Message, Phone},
  data() {
    return {
      getCodeMsg: '获取验证码',
      getCodeInterval:60
    }
  },
  methods: {
    async getCode() {
      if (this.isSend == true) {
        return;
      } else {
        console.log("phone:" + this.$store.state.userInfo.phone);
        axios({
          url: this.$store.state.domains.localHost + "/main/code",
          method: "POST",
          params: {
            phone: this.$store.state.userInfo.phone
          }
        }).then(res => {
          console.log(res.data.data);
          this.isSend = true;
          this.intervalId = setInterval(this.decrease, 1000);
        }).catch(e => {
          console.log(e.message);
        })

      }
    },
    decrease() {
      if (this.getCodeInterval > 0) {
        this.getCodeInterval = this.getCodeInterval - 1
        console.log(this.getCodeInterval)
        this.getCodeMsg = `重新发送${this.getCodeInterval}s`
      } else {
        clearInterval(this.intervalId)
        this.getCodeInterval = 60
        this.isSend = false
        this.getCodeMsg = "获取验证码"
      }
    }
  }
}
</script>

<style scoped>
.rows {
  margin-bottom:20px;
}
</style>
