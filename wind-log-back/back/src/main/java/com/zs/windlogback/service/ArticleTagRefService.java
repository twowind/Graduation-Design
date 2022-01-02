package com.zs.windlogback.service;

import com.zs.windlogback.Do.ArticleTagRef;

import java.util.List;

public interface ArticleTagRefService {
    int insertArticleTagRef(List<ArticleTagRef> articleTagRefList);

    int deleteArticleTagRefToArticleId(int articleId);
}
