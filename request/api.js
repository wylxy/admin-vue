/*
 * @Author: your name
 * @Date: 2022-06-01 19:04:49
 * @LastEditTime: 2022-06-29 11:51:28
 * @LastEditors: DESKTOP-TE06U1V
 * @Description: In User Settings Edit
 */
import request from './request'
import axios from "axios";
console.log("token");
var token=localStorage.getItem('token')
console.log(token);
// 43.154.112.163 : "
export const GetAPI = (url) => request.get('http://localhost:8081'+url,{
    headers: {'Content-Type': "application/json; charset=utf-8","Authorization":localStorage.getItem('token')}
});
export const DeleteApI = (url,param) => request.delete('http://localhost:8081'+url+"?id="+param,{
    headers: {'Content-Type': "application/json; charset=utf-8","Authorization":localStorage.getItem('token')}
});
export const PutApi = (url,param) => request.put('http://localhost:8081'+url, param,{
    headers: {'Content-Type': "application/json; charset=utf-8","Authorization":localStorage.getItem('token')}
});
export const PostAPiTest = (  url,param) => axios.post('http://localhost:8081'+url,param, {headers: {'Content-Type': "application/json; charset=utf-8","Authorization":localStorage.getItem('token')}});
export const postAPI = (paramone, url) => request.post('http://localhost:8081' + url, ...paramone,{ headers: {'Content-Type': "application/json; charset=utf-8","Authorization":localStorage.getItem('token')}});
