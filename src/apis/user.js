import request from '../utils/request'
export const doLogin=(user)=>{
    return request.post('/user/login',{
        account:user.username,
        password:user.pass
    })
}
//退出登录
export const logout =()=>{
    return request.post('/user/logout')
}
export const userinfo =()=>{
    return request.get("/user/info")
}
// name:'' ,
// birthday:'',
// sex:'',
// identity_card:'',
// marriage:'',
// education:'',
// address1:'',
// address2:'',
// phone:'',
// mobile_phone:'',
// company:'',
// trade:'',
// position:'',
// address3:'',
// company_type:'',
// company_email:'',
// company_phone:'',
// income:'',
// contact:'',
// contact_name:'',
// contact_phone:'',
// contact2:'',
// contact2_name:'',
// contact2_phone:'',
// contact2_dep:'',
// contact2_pos:'',
// remark:''