package com.zs.windlog.service;

import com.zs.windlog.Do.ArticleTagRef;

import java.util.List;

public interface ArticleTagRefService {
    int insertArticleTagRef(List<ArticleTagRef> articleTagRefList);

    int deleteArticleTagRefToArticleId(int articleId);
}
