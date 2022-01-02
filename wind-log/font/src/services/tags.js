import request from '@/utils/request'

export const fetchExploreTag = () => {
    return request(`http://localhost:8080/explore/popular_tag`)
}

export const fetchAllTag = () => {
    return request(`http://localhost:8080/explore/all_tag`)
}

export const getUserTags = (userId) => {
    return request(`http://localhost:8080/get_user_tags/${userId}`)
}

