package com.zs.windlogback.controller;

import com.github.pagehelper.PageHelper;
import com.github.pagehelper.PageInfo;
import com.zs.windlogback.Do.Comment;
import com.zs.windlogback.Do.Result;
import com.zs.windlogback.Do.User;
import com.zs.windlogback.Dto.CommentParam;
import com.zs.windlogback.service.CommentService;
import com.zs.windlogback.service.StatisticService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
public class CommentController {

    @Autowired
    private CommentService commentService;

    @RequestMapping("getallcomment")
    public Result getAllComment(@RequestBody CommentParam commentParam) {
        Result<List<Comment>> result = new Result<>();

        PageHelper.startPage(commentParam.getCurrent(),commentParam.getPageSize());
        List<Comment> commentList = commentService.selectComment(commentParam);
        PageInfo<Comment> pageInfo=new PageInfo<>(commentList);

        result.setTotal(pageInfo.getTotal());
        result.setRs(commentList);
        result.setState("ok");
        return result;
    }

    @DeleteMapping("/deletecomment/{commentId}")
    public Result deleteComment(@PathVariable int commentId) {
        int state = commentService.deleteComment(commentId);
        Result result = new Result();
        if (state == 1)
            result.setState("ok");
        return result;
    }
}
