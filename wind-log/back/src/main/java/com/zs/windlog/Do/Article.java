package com.zs.windlog.Do;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.util.Date;
import java.util.List;

@Data
@AllArgsConstructor
@NoArgsConstructor
public class Article {
    private Integer articleId;
    private Integer articleUserId;
    private String articleTitle;
    private String articleContent;
    private Date articleCreateTime;
    private Date articleUpdateTime;
    private String articleSummary;
    private String articleCategory;
    private String userAvatar;
    private String userNickname;
    private String username;
    private List<Tag> articleTags;
}
