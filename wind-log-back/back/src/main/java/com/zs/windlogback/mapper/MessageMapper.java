package com.zs.windlogback.mapper;

import com.zs.windlogback.Do.Message;
import com.zs.windlogback.Dto.MessageParam;
import org.apache.ibatis.annotations.Mapper;

import java.util.List;

@Mapper
public interface MessageMapper {
    int insertMessage(Message message);

    List<Message> selectMessage(MessageParam messageParam);

    int deleteMessage(int messageId);
}
