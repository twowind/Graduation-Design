package com.zs.windlog.Do;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.util.Date;

@Data
@AllArgsConstructor
@NoArgsConstructor
public class Comment {
    private Integer commentId;
    private Integer commentPid;
    private Integer articleId;
    private String articleComment;
    private Integer commentUserId;
    private Date commentTime;
    private String userNickname;
    private String userAvatar;
    private String pUserNickname;
}
