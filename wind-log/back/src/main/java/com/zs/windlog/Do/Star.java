package com.zs.windlog.Do;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@AllArgsConstructor
@NoArgsConstructor
public class Star {
    private Integer starId;
    private Integer articleId;
    private Integer userId;
    private String starCategory;
}
