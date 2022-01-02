package com.zs.windlogback;

import com.zs.windlogback.Do.Message;
import com.zs.windlogback.Dto.MessageParam;
import com.zs.windlogback.mapper.MessageMapper;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.context.SpringBootTest;

import java.util.List;

@SpringBootTest
class WindlogbackApplicationTests {

    @Autowired
    MessageMapper messageMapper;

    @Test
    void contextLoads() {
        List<Message> messages = messageMapper.selectMessage(new MessageParam());
        System.out.println(messages);
    }

}
