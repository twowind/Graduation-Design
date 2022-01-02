import request from '@/utils/request'

export const login = (user) => {
    return request('http://localhost:8080/login', {
        method: 'post',
        data: user,
    })
}

export const tokenLogin = () => {
    return request('http://localhost:8080/token_login')
}


export const register = (user) => {
    return request('http://localhost:8080/register', {
        method: 'post',
        data: user,
    })
}

export const fetchExploreUser = () => {
    return request('http://localhost:8080/explore/getpopularuser')
}

export const fetchModAccount = (account) => {
    return request('http://localhost:8080/account', {
        method: 'post',
        data: account,
    })
}

export const fetchModProfille = (profile) => {
    return request('http://localhost:8080/profile', {
        method: 'post',
        data: profile,
    })
}

export const fetchUser = (username) => {
    return request(`http://localhost:8080/user/${username}`)
}