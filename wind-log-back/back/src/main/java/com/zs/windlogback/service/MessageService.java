package com.zs.windlogback.service;

import com.zs.windlogback.Do.Comment;
import com.zs.windlogback.Do.Message;
import com.zs.windlogback.Dto.CommentParam;
import com.zs.windlogback.Dto.MessageParam;

import java.util.List;

public interface MessageService {
    int insertMessage(Message message);

    List<Message> selectMessage(MessageParam messageParam);

    int deleteMessage(int messageId);
}
