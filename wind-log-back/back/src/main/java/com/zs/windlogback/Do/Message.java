package com.zs.windlogback.Do;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.time.LocalDateTime;

@Data
@NoArgsConstructor
@AllArgsConstructor
public class Message {
    private Integer messageId;
    private Integer messagerId;
    private Integer messagedId;
    private LocalDateTime messageTime;
    private String messageContent;
    private String userNickname;
    private String userAvatar;

}
