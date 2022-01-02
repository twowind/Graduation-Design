package com.zs.windlog.service;

import com.zs.windlog.Do.Tag;

import java.util.List;

public interface TagService {
    int insertTag(List<Tag> tags);

    List<Tag> selectTagsByUserId(int userId);

    List<Tag> selectPopularTags();

    int selectTagIdByTagName(String tagName);
}
