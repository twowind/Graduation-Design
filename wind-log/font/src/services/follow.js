import request from '@/utils/request'

export const fetchIsFollow = (follow, articleId) => {
    if (articleId === undefined) {
        return request(`http://localhost:8080/is_Follow`, {
            method: 'post',
            data: follow
        })
    }

    return request(`http://localhost:8080/is_Follow/${articleId}`, {
        method: 'post',
        data: follow
    })
}

export const followUser = (follow, is) => {
    return request(`http://localhost:8080/follow/${is}`, {
        method: 'post',
        data: follow
    })
}

