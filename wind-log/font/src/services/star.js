import request from '@/utils/request'

export const fetchIsStar = (userId, articleId) => {
    return request(`http://localhost:8080/is_star/${userId}/${articleId}`)
}

export const starArticle = (star) => {
    return request(`http://localhost:8080/star_article`, {
        method: 'post',
        data: star
    })
}

export const cancleStar = (star) => {
    return request(`http://localhost:8080/cancel_star`, {
        method: 'delete',
        data: star
    })
}

export const fetchStarCategory = (userId) => {
    return request(`http://localhost:8080/star_category/${userId}`)
}

