package com.zs.windlog.Dto;

import com.zs.windlog.Do.Article;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.util.List;

@Data
@AllArgsConstructor
@NoArgsConstructor
public class CategoryArticle {
    private String articleCategory;
    private List<Article> articleCategoryList;
}
