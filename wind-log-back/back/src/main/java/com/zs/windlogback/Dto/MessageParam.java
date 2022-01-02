package com.zs.windlogback.Dto;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.util.Date;
import java.util.Map;

@Data
@NoArgsConstructor
@AllArgsConstructor
public class MessageParam {
    private Integer pageSize;
    private Integer current;
    private Map<String, String> sort;
    private Integer start;
    private Integer messageId;
    private Integer messagerId;
    private Integer messagedId;
    private String messageContent;
    private Date messageTime;
}
