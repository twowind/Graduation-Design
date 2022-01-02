package com.zs.windlogback.service;

import com.zs.windlogback.Do.Article;
import com.zs.windlogback.Dto.ArticleParam;

import java.util.List;
import java.util.Map;

public interface ArticleService {
    int insertArticles(Article article);

    List<Article> selectArticle(ArticleParam articleParam);

    int deleteArticle(int articleId);

    int editArticle(Article article);

}
