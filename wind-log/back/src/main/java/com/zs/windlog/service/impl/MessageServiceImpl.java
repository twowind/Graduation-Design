package com.zs.windlog.service.impl;

import com.zs.windlog.Do.Message;
import com.zs.windlog.mapper.MessageMapper;
import com.zs.windlog.service.MessageService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class MessageServiceImpl implements MessageService {
    @Autowired
    private MessageMapper messageMapper;

    @Override
    public int insertMessage(Message message) {
        return messageMapper.insertMessage(message);
    }

    @Override
    public List<Message> selectMessageByUserId(int userId) {
        return messageMapper.selectMessageByUserId(userId);
    }
}
