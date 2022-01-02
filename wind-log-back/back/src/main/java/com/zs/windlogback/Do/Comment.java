package com.zs.windlogback.Do;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.time.LocalDateTime;

@Data
@AllArgsConstructor
@NoArgsConstructor
public class Comment {
    private Integer commentId;
    private Integer commentPid;
    private Integer articleId;
    private String articleComment;
    private Integer commentUserId;
    private LocalDateTime commentTime;
    private String userNickname;
    private String userAvatar;
}
