package com.zs.windlog.mapper;

import com.zs.windlog.Do.Tag;
import org.apache.ibatis.annotations.Mapper;

import java.util.List;

@Mapper
public interface TagMapper {
    int insertTag(List<Tag> tags);

    List<Tag> selectTagsByUserId(int articleId);

    List<Tag> selectPopularTags();

    int selectTagIdByTagName(String tagName);


}
