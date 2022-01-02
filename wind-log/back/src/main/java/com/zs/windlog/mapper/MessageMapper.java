package com.zs.windlog.mapper;

import com.zs.windlog.Do.Message;
import org.apache.ibatis.annotations.Mapper;
import org.apache.ibatis.annotations.Param;

import java.util.List;

@Mapper
public interface MessageMapper {
    int insertMessage(Message message);
    List<Message> selectMessageByUserId(@Param("userId") int userId);
}
