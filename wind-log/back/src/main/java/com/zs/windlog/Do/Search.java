package com.zs.windlog.Do;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.util.Date;

@Data
@NoArgsConstructor
@AllArgsConstructor
public class Search {
    private String author;
    private String category;
    private String tag;
    private Date startTime;
    private Date endTime;
    private String content;
}
