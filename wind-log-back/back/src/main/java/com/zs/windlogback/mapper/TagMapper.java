package com.zs.windlogback.mapper;

import com.zs.windlogback.Do.ArticleTagRef;
import com.zs.windlogback.Do.Tag;
import org.apache.ibatis.annotations.Mapper;
import org.apache.ibatis.annotations.Param;

import java.util.List;

@Mapper
public interface TagMapper {
    int insertTag(@Param("tag") String tag);

    int insertTagRef(ArticleTagRef articleTagRef);

    List<Tag> selectAllTags();

    int selectTagIdByTagName(String tagName);
}
