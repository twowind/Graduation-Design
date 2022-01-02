package com.zs.windlog.controller;

import com.zs.windlog.Do.Message;
import com.zs.windlog.Dto.Result;
import com.zs.windlog.service.MessageService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.List;

@RestController
public class MessageController {

    @Autowired
    private MessageService messageService;

    @RequestMapping("/sendmessage")
    public Result sendMessage(@RequestBody Message message) {
        int messageId = messageService.insertMessage(message);

        Result<Integer> result = new Result();
        result.setRs(messageId);
        result.setState("ok");
        return result;
    }

    @RequestMapping("/getmessage")
    public Result getMessage(@RequestBody int userId) {
        List<Message> messageList = messageService.selectMessageByUserId(userId);
        Result<List<Message>> result = new Result();
        result.setRs(messageList);
        result.setState("ok");
        return result;
    }
}
