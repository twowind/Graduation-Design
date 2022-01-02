package com.zs.windlog.service;

import com.zs.windlog.Dto.CategoryArticle;

import java.util.List;

public interface CategoryService {
    List<String> selectPopularCategories();

    List<CategoryArticle> selectCategoryArticle(int userId);

    List<CategoryArticle> selectCategoryArticleByUserId(int userId);
}
