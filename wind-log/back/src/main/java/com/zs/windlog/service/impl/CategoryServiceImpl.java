package com.zs.windlog.service.impl;

import com.zs.windlog.Dto.CategoryArticle;
import com.zs.windlog.mapper.CategoryMapper;
import com.zs.windlog.service.CategoryService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class CategoryServiceImpl implements CategoryService {

    @Autowired
    private CategoryMapper categoryMapper;

    @Override
    public List<String> selectPopularCategories() {
        return categoryMapper.selectPopularCategories();
    }

    @Override
    public List<CategoryArticle> selectCategoryArticle(int userId) {
        return categoryMapper
                .selectCategoryArticle(userId);
    }

    @Override
    public List<CategoryArticle> selectCategoryArticleByUserId(int userId) {
        return categoryMapper.selectCategoryArticleByUserId(userId);
    }
}
