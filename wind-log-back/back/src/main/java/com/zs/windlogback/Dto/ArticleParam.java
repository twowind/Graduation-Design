package com.zs.windlogback.Dto;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.util.Date;
import java.util.List;
import java.util.Map;

@Data
@AllArgsConstructor
@NoArgsConstructor
public class ArticleParam {
    private  Integer pageSize;
    private Integer current;
    private Map<String,String> sort;
    private Integer articleId;
    private Integer articleUserId;
    private String articleTitle;
    private String articleCategory;
    private String articleSummary;
    private String articleContent;
    private List<Map<String,String>> articleTags;
    private Date articleCreateTime;
    private Date articleUpdateTime;
}
