// src/store/moduleA.js
const state = () => ({
    // 模块A的状态
    localHost: 'http://localhost:8081',
    remoteHost:'https://www.gallilikelike.cn'
});

const mutations = {
    // 模块A的mutations
};

const actions = {
    // 模块A的actions
    setPassword(state,password) {
        state.password = password;
    },
    setUsername(state,username) {
        state.username = username;
    }
};

const getters = {
    // 模块A的getters
};

export default {
    namespaced: true, // 启用命名空间
    state,
    mutations,
    actions,
    getters,
};
