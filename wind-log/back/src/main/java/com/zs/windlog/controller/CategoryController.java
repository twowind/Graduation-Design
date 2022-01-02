package com.zs.windlog.controller;

import com.zs.windlog.Dto.CategoryArticle;
import com.zs.windlog.Dto.Result;
import com.zs.windlog.service.CategoryService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.List;

@RestController
public class CategoryController {

    @Autowired
    private CategoryService categoryService;

    @RequestMapping("/getpopularcategories")
    public Result getPopularCategories() {

        List<String> listCategory = categoryService.selectPopularCategories();

        Result rs = new Result();
        rs.setState("ok");
        rs.setRs(listCategory);
        return rs;
    }

    @RequestMapping("/getarticleinstartocategory/{userId}")
    public Result getArticleInStarToCategory(@PathVariable int userId) {
        Result<List<CategoryArticle>> result = new Result();
        List<CategoryArticle> categoryList = categoryService.selectCategoryArticleByUserId(userId);
        result.setRs(categoryList);
        result.setState("ok");
        return result;
    }
}
