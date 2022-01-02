package com.zs.windlog.mapper;

import com.zs.windlog.Do.Article;
import com.zs.windlog.Dto.Category;
import com.zs.windlog.Do.Search;
import org.apache.ibatis.annotations.Mapper;
import org.apache.ibatis.annotations.Param;

import java.util.List;

@Mapper
public interface ArticleMapper {
    int insertArticle(Article article);

    List<Category> selectArticleByUserIdToCategory(int userId);

    List<Article> selectAllArticleToUser(int userId);

    List<Article> selectPopularArticles();

    List<Article> selectMostStarArticles();

    List<Article> selectMostCommentArticles();

    List<Article> selectMostReadArticles();

    Article selectArticleByArticleId(int articleId);

    void addArticleCountByArticleId(int articleId);

    List<Article> selectArticleByUserIdAndCategory(@Param("userId") int userId, @Param("category") String category);

    List<Article> selectArticleByUserIdAndTags(@Param("userId") int userId, @Param("tags") List<Integer> tags);

    List<Article> selectArticleByTags(@Param("tags") List<Integer> tags);

    List<Article> selectArticleByCategory(@Param("category") String category);

    List<Article> selectArticleBySearch(Search search);

    int updateArticle(Article article);

    List<Article> getStarBlogs(int userId);

    List<Article> getCategoryArticleToStar(String category, int userId);

}
