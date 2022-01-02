package com.zs.windlogback.service.impl;

import com.zs.windlogback.Do.Article;
import com.zs.windlogback.Dto.ArticleParam;
import com.zs.windlogback.mapper.ArticleMapper;
import com.zs.windlogback.service.ArticleService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Map;

@Service
public class ArticleServiceImpl implements ArticleService {

    @Autowired
    private ArticleMapper articleMapper;
    @Override
    public int insertArticles(Article article) {
        return articleMapper.insertArticles(article);
    }

    @Override
    public List<Article> selectArticle(ArticleParam articleParam) {
        return articleMapper.selectArticle(articleParam);
    }

    @Override
    public int deleteArticle(int articleId) {
        return articleMapper.deleteArticle(articleId);
    }

    @Override
    public int editArticle(Article article) {
        return articleMapper.editArticle(article);
    }
}
