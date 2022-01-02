package com.zs.windlogback.Do;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.time.LocalDateTime;
import java.util.List;

@Data
@AllArgsConstructor
@NoArgsConstructor
public class Article {
    private Integer articleId;
    private Integer articleUserId;
    private String articleTitle;
    private String articleContent;
    private LocalDateTime articleCreateTime;
    private LocalDateTime articleUpdateTime;
    private String articleSummary;
    private String articleCategory;
    private List<Tag> articleTags;
    private Integer articleReadCount;
}
