package com.zs.windlog.service.impl;

import com.zs.windlog.Do.Tag;
import com.zs.windlog.mapper.TagMapper;
import com.zs.windlog.service.TagService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class TagServiceImpl implements TagService {

    @Autowired
    TagMapper tagMapper;

    @Override
    public int insertTag(List<Tag> tags) {
        return tagMapper.insertTag(tags);
    }

    @Override
    public List<Tag> selectTagsByUserId(int userId) {
        return tagMapper.selectTagsByUserId(userId);
    }

    @Override
    public List<Tag> selectPopularTags() {
        return tagMapper.selectPopularTags();
    }

    @Override
    public int selectTagIdByTagName(String tagName) {
        return tagMapper.selectTagIdByTagName(tagName);
    }
}
