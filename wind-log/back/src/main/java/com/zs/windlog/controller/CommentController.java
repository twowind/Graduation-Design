package com.zs.windlog.controller;

import com.zs.windlog.Do.Comment;
import com.zs.windlog.Dto.Result;
import com.zs.windlog.service.CommentService;
import com.zs.windlog.utils.Word.WordFilter;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.Date;
import java.util.List;

@RestController
public class CommentController {

    @Autowired
    private CommentService commentService;

    @RequestMapping("/comment")
    public Result addComment(@RequestBody Comment comment) {

        comment.setArticleComment(WordFilter.doFilter(comment.getArticleComment()));

        comment.setCommentTime(new Date());
        commentService.insertComment(comment);
        Result<Integer> result = new Result();
        result.setRs(comment.getCommentId());
        result.setState("ok");

        return result;
    }

    @RequestMapping("/getcomment")
    public Result getComment(@RequestBody int articleId) {
        List<Comment> commentList = commentService.selectCommentByArticleId(articleId);
        Result<List<Comment>> result = new Result<>();
        result.setState("ok");
        result.setRs(commentList);
        return result;
    }

    @DeleteMapping("/deletecomment/{commentId}")
    public Result deleteComment(@PathVariable int commentId) {
        Result result = new Result();
        int state = commentService.deleteComment(commentId);
        if (state == 1)
            result.setState("ok");
        return result;
    }
}
