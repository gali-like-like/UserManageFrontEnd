// src/store/index.js
import { createStore } from 'vuex';
import UserInfo from "@/store/UserInfo";
import Domains from "@/store/Domains";

const store = createStore({
    modules: {
        userInfo:UserInfo,
        domains:Domains
    }
});

export default store;
