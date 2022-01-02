package com.zs.windlogback.service.impl;

import com.zs.windlogback.Do.ArticleTagRef;
import com.zs.windlogback.Do.Tag;
import com.zs.windlogback.mapper.TagMapper;
import com.zs.windlogback.service.TagService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class TagServiceImpl implements TagService {

    @Autowired
    private TagMapper tagMapper;

    @Override
    public int insertTag(String tag) {
        return tagMapper.insertTag(tag);
    }

    @Override
    public int insertTagRef(ArticleTagRef articleTagRef) {
        return tagMapper.insertTagRef(articleTagRef);
    }

    @Override
    public List<Tag> selectAllTags() {
        return tagMapper.selectAllTags();
    }

    @Override
    public int selectTagIdByTagName(String tagName) {
        return tagMapper.selectTagIdByTagName(tagName);
    }
}
