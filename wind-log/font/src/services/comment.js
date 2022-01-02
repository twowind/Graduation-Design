import request from '@/utils/request'

export const fetchComment = (articleid) => {
    return request(`http://localhost:8080/get_comment/${articleid}`)
}

export const commentArticle = (comment) => {
    return request(`http://localhost:8080/comment`, {
        method: 'post',
        data: comment
    })
}

export const deleteComment = (commentId) => {
    return request(`http://localhost:8080/delete_comment/${commentId}`, {
        method: 'delete'
    })
}

