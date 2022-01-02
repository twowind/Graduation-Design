package com.zs.windlogback.controller;

import com.zs.windlogback.Do.Result;
import com.zs.windlogback.Do.Tag;
import com.zs.windlogback.service.TagService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.ResponseBody;
import org.springframework.web.bind.annotation.RestController;

import java.util.List;

@RestController
public class TagController {

    @Autowired
    private TagService tagService;

    @RequestMapping("/getalltags")
    public Result getAllTags() {
        List<Tag> tagList = tagService.selectAllTags();
        Result<List<Tag>> result = new Result<>();
        result.setRs(tagList);
        result.setState("ok");
        return result;
    }
}
