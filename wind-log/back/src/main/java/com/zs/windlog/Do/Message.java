package com.zs.windlog.Do;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.util.Date;

@Data
@NoArgsConstructor
@AllArgsConstructor
public class Message {
    private Integer messageId;
    private Integer messagerId;
    private Integer messagedId;
    private Date messageTime = new Date();
    private String messageContent;
    private Integer messageState;
    private String userNickname;
    private String userAvatar;

}
