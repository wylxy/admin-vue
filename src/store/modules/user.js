import { getToken, setToken, removeToken } from '@/utils/auth'
import { GetAPI } from '../../../request/api'
import store from "@/store";
// 村赤用户令牌和角色信息
const state = {
    token: getToken(),
    roles: [] //角色
}

const mutations = {
    SET_TOKEN: (state, token) => {
        state.token = token;
    },
    SET_ROLES: (state, roles) => {
        state.roles = roles;
    }
};

const actions = {
    // 用户登录
    login({ commit }, userInfo) {
        const { username, password } = userInfo;
        return new Promise((resolve, reject) => {
            GetAPI('/api/user/all?name=' + username ).then((res1) => {
                console.log(res1.data)
                if (res1.data.code == 200) {
                    localStorage.setItem("role",res1.data.data[0].roleId)
                }
            })
            GetAPI('/api/user/login?username=' + username + "&password=" + password).then((res) => {
                if (res.data.code == 200) {
                    commit('SET_TOKEN', res.data.data);
                    localStorage.setItem("token","Bearer "+res.data.data)
                    localStorage.setItem("user_name",username)
                    setToken(res.data.data)

                    resolve()
                } else {
                    reject('用户名或密码错误')
                }
            })
            // setTimeout(() => {
            //     if(username === 'admin' || username === 'jerry'){
            //         // 保存状态
            //         commit('SET_TOKEN',username);
            //         // 写入cookie
            //         setToken(username)
            //         resolve()
            //     }else{
            //         reject('用户名或密码错误')
            //     }
            // },1000)
        })
    },
    // 获取用户角色信息
    getInfo({ commit, state }) {
        return new Promise((resolve) => {
            setTimeout(() => {
                const roles = localStorage.getItem('role')=== '1' ? ['admin'] : ['jerry1']
                // const roles = state.token === 'admin' ? ['admin'] : ['jerry']
                commit('SET_ROLES', roles)
                resolve({ roles })
            }, 1000)
        })
    },
    // 重置令牌
    resetToken({ commit }) {
        return new Promise(resolve => {
            commit('SET_TOKEN', '')
            commit('SET_ROLES', [])
            removeToken();
            resolve()
        })
    }
}

export default {
    namespaced: true,
    state,
    mutations,
    actions
}
