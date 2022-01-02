package com.zs.windlog.Do;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@NoArgsConstructor
@AllArgsConstructor
public class ArticleTagRef {
    private Integer articleId;
    private Integer taId;
}
