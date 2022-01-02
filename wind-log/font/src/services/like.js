import request from '@/utils/request'

export const fetchIsLike = (like) => {
    return request(`http://localhost:8080/is_like`, {
        method: 'post',
        data: like
    })
}

export const likeArticle = (star) => {
    return request(`http://localhost:8080/like_article`, {
        method: 'post',
        data: star
    })
}

export const cancleLike = (star) => {
    return request(`http://localhost:8080/cancel_like`, {
        method: 'post',
        data: star
    })
}

