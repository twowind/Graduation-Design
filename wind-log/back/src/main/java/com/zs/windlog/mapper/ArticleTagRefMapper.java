package com.zs.windlog.mapper;

import com.zs.windlog.Do.ArticleTagRef;
import org.apache.ibatis.annotations.Mapper;

import java.util.List;

@Mapper
public interface ArticleTagRefMapper {
    int insertArticleTagRef(List<ArticleTagRef> articleTagRefList);

    int deleteArticleTagRefToArticleId(int articleId);
}
