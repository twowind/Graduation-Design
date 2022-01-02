package com.zs.windlog.Dto;

import com.zs.windlog.Do.Tag;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.util.Date;
import java.util.List;

@Data
@NoArgsConstructor
@AllArgsConstructor
public class Category {
    private String articleCategory;
    private List<ArticleCategory> articleCategoryList;
}

@Data
@NoArgsConstructor
@AllArgsConstructor
class ArticleCategory {
    private Integer articleId;
    private String articleTitle;
    private String articleContent;
    private Date articleCreateTime;
    private Date articleUpdateTime;
    private String articleSummary;
    private List<Tag> articleTags;
}
