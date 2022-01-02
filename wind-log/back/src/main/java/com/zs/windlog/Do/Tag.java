package com.zs.windlog.Do;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@AllArgsConstructor
@NoArgsConstructor
public class Tag {
    private Integer tagId;
    private String tagName;

    public Tag(String tagName) {
        this.tagName = tagName;
    }
}
