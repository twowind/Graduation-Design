package com.zs.windlogback.service.impl;

import com.zs.windlogback.Do.ArticleTagRef;
import com.zs.windlogback.mapper.ArticleTagRefMapper;
import com.zs.windlogback.service.ArticleTagRefService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class ArticleTagRefServiceImpl implements ArticleTagRefService {

    @Autowired
    ArticleTagRefMapper articleTagRefMapper;

    @Override
    public int insertArticleTagRef(List<ArticleTagRef> articleTagRefList) {
        return articleTagRefMapper.insertArticleTagRef(articleTagRefList);
    }

    @Override
    public int deleteArticleTagRefToArticleId(int articleId) {
        return articleTagRefMapper.deleteArticleTagRefToArticleId(articleId);
    }
}
