package com.zs.windlog.service;

import com.zs.windlog.Do.Article;
import com.zs.windlog.Dto.Category;
import com.zs.windlog.Do.Search;

import java.util.List;

/**
 *
 */
public interface ArticleService {
    int insertArticle(Article article);

    List<Category> selectArticleByUserIdToCategory(int userId);

    List<Article> selectAllArticleToUser(int userId);

    List<Article> selectPopularArticles();

    List<Article> selectMostStarArticles();

    List<Article> selectMostCommentArticles();

    List<Article> selectMostReadArticles();

    Article selectArticleByArticleId(int articleId);

    void addArticleCountByArticleId(int articleId);

    List<Article> selectArticleByUserIdAndCategory(int userId, String category);

    List<Article> selectArticleByUserIdAndTags(int userId, List<Integer> tags);

    List<Article> selectArticleByTags(List<Integer> tags);

    List<Article> selectArticleByCategory(String category);

    List<Article> selectArticleBySearch(Search search);

    int updateArticle(Article article);

    List<Article> getStarBlogs(int userId);

    List<Article> getCategoryArticleToStar(String category, int userId);


}
