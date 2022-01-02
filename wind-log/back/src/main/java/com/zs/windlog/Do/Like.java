package com.zs.windlog.Do;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.time.LocalDateTime;

@Data
@NoArgsConstructor
@AllArgsConstructor
public class Like {

    private Integer likeUserId;
    private Integer likedArticleId;
    private LocalDateTime likeCreateTime;

}
