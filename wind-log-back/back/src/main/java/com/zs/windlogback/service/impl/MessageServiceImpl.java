package com.zs.windlogback.service.impl;

import com.zs.windlogback.Do.Comment;
import com.zs.windlogback.Do.Message;
import com.zs.windlogback.Dto.MessageParam;
import com.zs.windlogback.mapper.MessageMapper;
import com.zs.windlogback.service.MessageService;
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
    public List<Message> selectMessage(MessageParam messageParam) {
        return messageMapper.selectMessage(messageParam);
    }

    @Override
    public int deleteMessage(int messageId) {
        return messageMapper.deleteMessage(messageId);
    }

}
