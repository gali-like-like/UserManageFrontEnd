<script>
import {open} from "../ConstMsg/NormalMethod";
import {LOGIN_BY_UP_PATH_MSG} from "@/ConstMsg/CommonMsg";
import axios from "axios";
export default {
  name: "SelfInfoView",
  data() {
    return {
      options:[
        {
          label:"普通用户",
          value:1
        },
        {
          label:"超级用户",
          value:2
        }
      ]
    }
  },
  beforeMount() {
    let user = localStorage?.getItem("user");
    if(!user || this.$store.state.userInfo.username === false) {
      //没有token时如何处理
      this.$router.push(LOGIN_BY_UP_PATH_MSG);
      console.log("token不存在");
    } else {
      //   获取用户头像
      axios({
        method:"get",
        url:this.$store.state.domains.localHost+`/main/user/username/${this.$store.state.userInfo.username}`,
        headers:{
          token : localStorage?.getItem("user")
        }
      }).then(res => {
        console.log(JSON.stringify(res.data))
        if(res.data.code === 1) {
          this.$store.state.userInfo.image = res.data.data.image;
          this.$store.state.userInfo.name = res.data.data.name;
          this.$store.state.userInfo.username = res.data.data.username;
          this.$store.state.userInfo.phone = res.data.data.phone;
          this.$store.state.userInfo.password = res.data.data.password;
          this.$store.state.userInfo.grender = res.data.data.grender;
          this.$store.state.userInfo.description = res.data.data.description;
          this.$store.state.userInfo.userrole = res.data.data.role;
          this.$store.state.userInfo.birthDay = res.data.data.birthDay;
        }
        console.log(`用户头像:${this.$store.state.userInfo.image}`);
      }).catch(e => {
        console.log(e.message);
        open("获取头像失败","error");
      })
    }
  }
}
</script>

<template>
<div class="mainDiv">
  <el-row :gutter="10" class="userInfoDiv">
    <img :src="this.$store.state.userInfo.image" alt="头像">
    <div>
      <p>{{this.$store.state.userInfo.name}}</p>
      <p>{{this.$store.state.userInfo.grender}}</p>
      <p>{{this.$store.state.userInfo.userrole}}</p>
      <p>编辑</p>
    </div>
  </el-row>
  <div class="otherInfo">
    <div class="leftLabel">
      <p>手机号</p>
      <p>密码</p>
      <p>生日</p>
    </div>
    <div class="rightInput">
      <input type="text" v-model="this.$store.state.userInfo.phone">
      <input type="text" v-model="this.$store.state.userInfo.password">
      <input type="text" v-model="this.$store.state.userInfo.birthDay">
    </div>
  </div>
  <div class="descDiv">
    <p>描述</p>
    <textarea name="desc" id="descText" cols="30" rows="10" v-model="this.$store.state.userInfo.description"></textarea>
  </div>
</div>
</template>

<style scoped>

  .mainDiv {
    width: 400px;
  }

  .userInfoDiv {
    display: flex;
    align-content: start;
    justify-content: start;
  }

  .userInfoDiv img {
    width: 100px;
    height: 100px;
    border-radius: 50%;
    margin-right: 10px;
  }

  .userInfoDiv p {
    margin:5px 0;
    padding:5px;
    height: 20px;
    line-height: 20px;
  }

  .userInfoDiv div {
    text-align: left;
  }

  .userInfoDiv p:last-child {
    border: 1px solid #00bbff;
  }


  .userInfoDiv p:first-child {
    font-size: 20px;
    font-weight: bold;
  }

  .otherInfo {
    display: flex;
    align-content: center;
    justify-content: flex-start;
  }

  .leftLabel {
    width: 20%;
  }

  .rightInput {
    display: flex;
    flex-direction: column;
    align-content: space-evenly;
    justify-content: space-evenly;
    width: 80%;
  }




  input {
    outline: 0;
    border: 0;
    color: lightgreen;
    display: block;
  }

  .leftLabel p {
    height: 20px;
    line-height: 20px;
    background-color: #00bbff;
    padding: 5px;
  }

  .rightInput input {
    height: 20px;
    line-height: 20px;
    background-color: #00bbff;
    padding: 5px;
  }

  .descDiv textarea {
    padding: 5px;
    margin-left:5px;
    width: 80%;
  }

  .descDiv p {
    margin: 0;
    padding: 5px;
    width: 20%;
    background-color: #00bbff;
  }

  .descDiv {
    display: flex;
    justify-content: flex-start;
    align-content: center;
  }

</style>
