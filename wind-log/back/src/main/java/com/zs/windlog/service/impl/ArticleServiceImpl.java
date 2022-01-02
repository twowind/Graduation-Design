package com.zs.windlog.service.impl;

import com.zs.windlog.Do.Article;
import com.zs.windlog.Dto.Category;
import com.zs.windlog.Do.Search;
import com.zs.windlog.mapper.ArticleMapper;
import com.zs.windlog.service.ArticleService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class ArticleServiceImpl implements ArticleService {

    @Autowired
    private ArticleMapper articleMapper;


    @Override
    public int insertArticle(Article article) {
        return articleMapper.insertArticle(article);
    }

    @Override
    public List<Category> selectArticleByUserIdToCategory(int userId) {
        return articleMapper.selectArticleByUserIdToCategory(userId);
    }

    @Override
    public List<Article> selectAllArticleToUser(int userId) {
        return articleMapper.selectAllArticleToUser(userId);
    }

    @Override
    public List<Article> selectPopularArticles() {
        return articleMapper.selectPopularArticles();
    }

    @Override
    public List<Article> selectMostStarArticles() {
        return articleMapper.selectMostStarArticles();
    }

    @Override
    public List<Article> selectMostCommentArticles() {
        return articleMapper.selectMostCommentArticles();
    }

    @Override
    public List<Article> selectMostReadArticles() {
        return articleMapper.selectMostReadArticles();
    }

    @Override
    public Article selectArticleByArticleId(int articleId) {
        return articleMapper.selectArticleByArticleId(articleId);
    }

    @Override
    public void addArticleCountByArticleId(int articleId) {
        articleMapper.addArticleCountByArticleId(articleId);
    }

    @Override
    public List<Article> selectArticleByUserIdAndCategory(int userId, String category) {
        return articleMapper.selectArticleByUserIdAndCategory(userId, category);
    }

    @Override
    public List<Article> selectArticleByUserIdAndTags(int userId, List<Integer> tags) {
        return articleMapper.selectArticleByUserIdAndTags(userId, tags);
    }

    @Override
    public List<Article> selectArticleByTags(List<Integer> tags) {
        return articleMapper.selectArticleByTags(tags);
    }

    @Override
    public List<Article> selectArticleByCategory(String category) {
        return articleMapper.selectArticleByCategory(category);
    }

    @Override
    public List<Article> selectArticleBySearch(Search search) {
        return articleMapper.selectArticleBySearch(search);
    }

    @Override
    public int updateArticle(Article article) {
        return articleMapper.updateArticle(article);
    }

    @Override
    public List<Article> getStarBlogs(int userId) {
        return articleMapper.getStarBlogs(userId);
    }

    @Override
    public List<Article> getCategoryArticleToStar(String category, int userId) {
        return articleMapper.getCategoryArticleToStar(category, userId);
    }

}
