import request from '../utils/request'


export const createLoan = (data) => {
    return request({
        //贷款申请提交接口
        url: '/loan/create',
        method: 'post',
        data,
    })
}
export const getloanlist = (params) => {
    return request({
        url: '/loan/list',
        method: 'get',
        params
    })
}

// //删除申请接口
// export const deleteLoan = (id) => {
//     return request({
//         url: '/loan/delete/'+id,
//         method: 'delete',
//     })
// }
// // 提交审核接口
// export const submitApprove = (id) => {
//     return request({
//         url: '/loan/submitToApprove',
//         method: 'post',
//         data:{
//             id
//         }
//     })
// }
//export const updateLoan = (data) => {
//     return request({
//         url: '/loan/update',
//         method: 'put',
//         data
//     })
// }
export const updateloan=(data)=>{
return request({
    url:'/loan/update',
    method:'PUT',
    data
    
})
}
export const deleteloan=(id)=>{
    return request({
        url:'loan/delete/'+id,
        method:'delete',
    
    })
}
export const submitloan=(id)=>{
    return request({
        url:'/loan/submitToApprove',
        method:'POST',
       data:{
            id}
        
    })
}
//初审初始化
export const searchloan=(params)=>{
    // return request({
    //     url:'/approve/first/list',
    //     method:'get',
    //     params
    // })
    return request({
        url: '/approve/first/list',
        method: 'get',
        params
    })
}

//终审初始化
export const sousuoend=(params)=>{
   
    return request({
        url: '/approve/end/list',
        method: 'get',
        params
    })
}


//初审查询接口


//初审查询接口
export const searchfirst=(params)=>{
    return request(
        {
            url:'/approve/first/list',
            method:'get',
            params
        }
    )
}


//终审查询接口
export const searchend=(params)=>{
    return request(
        {
            url:'/approve/end/list',
            method:'get',
            params
        }
    )
}
//初审通过/拒绝接口
export const approvefirst=(id,flag)=>{
    return request({
        url:'/approve/first/'+flag,//flag来定义是pass还是reject
        method:'post',
        data:{
            appId:id,
            loanId:id
        }
    })
}
//终审通过拒绝接口
export const approveend=(id,flag)=>{
    return request({
        url:'/approve/end/'+flag,//flag来定义是pass还是reject
        method:'post',
        data:{
            appId:id,
            loanId:id
        }
    })
}
// 合同管理-合同列表接口
export const contractList = (params) => {
    return request({
        url: '/contract/list',
        method: 'get',
        params
    })
}

// 合同管理- 生成合同接口
export const generateContract = (id) => {
    return request({
        url: '/contract/createFile',
        method: 'post',
        data: {
            id
        }
    })
}

// 合同管理- 下载合同接口
export const downloadContract = (id) => {
    return request({
        url: '/contract/download',
        method: 'get',
        params: {
            id
        }
    })
}
export const create=({username,password,permission})=>{
    return request({
        url:'/permission/createUser',
        method:'post',
        data:{
            account:username,
            password,
            role_id:permission
        }
    })
}
export const createUser =({username,password,permission})=>{
    return  request.post('/permission/createUser',{
        account:username,
        password,
        role_id:permission
    }) 
}


//权限列表展示
export const userlist=()=>{
    return request({
        url:'/user/list?type=new',
        method:'get'
    })
}