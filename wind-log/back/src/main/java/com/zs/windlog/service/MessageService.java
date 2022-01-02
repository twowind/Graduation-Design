package com.zs.windlog.service;

import com.zs.windlog.Do.Message;

import java.util.List;

public interface MessageService {
    int insertMessage(Message message);

    List<Message> selectMessageByUserId(int userId);
}
