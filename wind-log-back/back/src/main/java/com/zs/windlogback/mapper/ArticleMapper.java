package com.zs.windlogback.mapper;

import com.zs.windlogback.Do.Article;
import com.zs.windlogback.Dto.ArticleParam;
import org.apache.ibatis.annotations.Mapper;

import java.util.List;
import java.util.Map;

@Mapper
public interface ArticleMapper {
    int insertArticles(Article article);

    List<Article> selectArticle(ArticleParam articleParam);

    int deleteArticle(int articleId);

    int editArticle(Article article);
}
