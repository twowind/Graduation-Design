package com.zs.windlogback.mapper;

import com.zs.windlogback.Do.ArticleTagRef;
import org.apache.ibatis.annotations.Mapper;

import java.util.List;

@Mapper
public interface ArticleTagRefMapper {
    int insertArticleTagRef(List<ArticleTagRef> articleTagRefList);

    int deleteArticleTagRefToArticleId(int articleId);
}
