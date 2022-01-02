package com.zs.windlogback.service;

import com.zs.windlogback.Do.ArticleTagRef;
import com.zs.windlogback.Do.Tag;

import java.util.List;

public interface TagService {
    int insertTag(String tag);

    int insertTagRef(ArticleTagRef articleTagRef);

    List<Tag> selectAllTags();

    int selectTagIdByTagName(String tagName);
}
