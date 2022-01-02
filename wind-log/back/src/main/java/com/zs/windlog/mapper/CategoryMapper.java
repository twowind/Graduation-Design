package com.zs.windlog.mapper;

import com.zs.windlog.Dto.CategoryArticle;
import org.apache.ibatis.annotations.Mapper;

import java.util.List;

@Mapper
public interface CategoryMapper {

    List<String> selectPopularCategories();

    List<CategoryArticle> selectCategoryArticle(int userId);

    List<CategoryArticle> selectCategoryArticleByUserId(int userId);
}
