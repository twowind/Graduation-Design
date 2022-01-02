import request from '@/utils/request'

export const editArticle = (article) => {
    return request('http://localhost:8080/edit_article', {
        method: 'post',
        data: article,
    })
}

export const fetchArticleToCategory = (userId) => {
    return request(`http://localhost:8080/article_category/${userId}`)
}

export const fetchArticlesByUserId = (userId) => {
    return request(`http://localhost:8080/get_article_by_id/${userId}`)
}

export const fetchArticlesCategoryByUserId = (articleCategory, userId) => {
    return request(`http://localhost:8080/category_article/${articleCategory}/${userId}`)
}

export const fetchTagArticle = (userId, tags) => {
    return request(`http://localhost:8080/tag_article/${userId}`, {
        method: 'post',
        data: tags
    })
}
export const fetchStarArticlesCategory = (userId) => {
    return request(`http://localhost:8080/star_article_category/${userId}`)
}

export const fetchStarCategory = (articleCategory, userId) => {
    return request(`http://localhost:8080/getcategoryarticletostar/${articleCategory}/${userId}`)
}

export const fetchStarArticles = (userId) => {
    return request(`http://localhost:8080/star_article/${userId}`)
}

export const fetchExploreArticles = (choose) => {
    return request(`http://localhost:8080/explore/explore_article/${choose}`)
}


export const fetchExploreArticlesByTags = (tags) => {
    return request(`http://localhost:8080/explore/tag_article`, {
        method: 'post',
        data: tags
    })
}

export const fetchSearchExploreArticles = (params) => {
    return request(`http://localhost:8080/explore/search`, {
        method: 'post',
        data: params
    })
}

export const fetchArticle = (artilceId) => {
    return request(`http://localhost:8080/explore/article/${artilceId}`)
}

export const deleteArticle = (artilceId) => {
    return request(`http://localhost:8080/delete_article/${artilceId}`, {
        method: 'delete'
    })
}
