package com.zs.windlog.controller;

import com.zs.windlog.Dto.Result;
import com.zs.windlog.Do.Tag;
import com.zs.windlog.service.TagService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.List;

@RestController
public class TagController {
    @Autowired
    private TagService tagService;

    @RequestMapping("/getusertags")
    public Result getUserTags(@RequestBody int userId) {

        List<Tag> tagList = tagService.selectTagsByUserId(userId);

        Result<List<Tag>> rs = new Result<>();

        rs.setState("ok");
        rs.setRs(tagList);

        return rs;
    }

    @RequestMapping("/explore/getpopulartags")
    public Result getPopularTags() {
        List<Tag> tagList = tagService.selectPopularTags();
        Result<List<Tag>> rs = new Result<>();
        rs.setState("ok");
        rs.setRs(tagList);
        return rs;
    }

}
