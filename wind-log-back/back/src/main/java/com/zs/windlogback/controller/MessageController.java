package com.zs.windlogback.controller;

import com.zs.windlogback.Do.Comment;
import com.zs.windlogback.Do.Message;
import com.zs.windlogback.Dto.MessageParam;
import com.zs.windlogback.service.MessageService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.HashMap;
import java.util.List;
import java.util.Map;

@RestController
public class MessageController {

    @Autowired
    private MessageService messageService;

    @RequestMapping("/message")
    public Map getMessage(@RequestBody MessageParam messageParam) {
        Map<String, Object> result = new HashMap<>();
        List<Message> messages = messageService.selectMessage(messageParam);
        result.put("success", true);
        result.put("data", messages);
        return result;
    }

    @DeleteMapping("/delete_message/{messageId}")
    public Map deleteMessage(@PathVariable int messageId) {
        Map<String, Object> result = new HashMap<>();
        int state = messageService.deleteMessage(messageId);
        if (state == 1) {
            result.put("success", true);
            return result;
        }
        result.put("success", false);
        return result;
    }

}
