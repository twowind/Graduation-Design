package com.zs.windlogback.Dto;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.time.LocalDateTime;
import java.util.Map;

@Data
@NoArgsConstructor
@AllArgsConstructor
public class CommentParam {

    private  Integer pageSize;
    private Integer current;
    private Map<String,String> sort;
    private Integer start;
    private Integer articleId;
    private String articleComment;
    private Integer commentUserId;
    private LocalDateTime commentTime;

}
