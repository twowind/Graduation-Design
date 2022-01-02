import request from '@/utils/request'

export const fetchMessage = (userId) => {
    return request(`http://localhost:8080/message/${userId}`)
}

export const sendMessage = (message) => {
    return request(`http://localhost:8080/send_message`, {
        method: 'post',
        data: message
    })
}

export const deleteMessage = (messageId) => {
    return request(`http://localhost:8080/delete_message/${messageId}`)
}