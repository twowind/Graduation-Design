package com.zs.windlog.mapper;

import com.zs.windlog.Do.Star;
import org.apache.ibatis.annotations.Mapper;
import org.apache.ibatis.annotations.Param;

import java.util.List;

@Mapper
public interface StarMapper {
    int insertStar(Star star);

    List<String> selectStarCategoryByUserId(int userId);

    Star selectStarArticle(@Param("userId") int userId,@Param("articleId") int articleId);

    int deleteStar(Star star);
}
