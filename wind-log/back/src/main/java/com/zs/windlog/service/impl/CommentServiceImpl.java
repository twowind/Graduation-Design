package com.zs.windlog.service.impl;

import com.zs.windlog.Do.Comment;
import com.zs.windlog.mapper.CommentMapper;
import com.zs.windlog.service.CommentService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class CommentServiceImpl implements CommentService {

    @Autowired
    private CommentMapper commentMapper;

    @Override
    public int insertComment(Comment comment) {
        return commentMapper.insertComment(comment);
    }

    @Override
    public List<Comment> selectCommentByArticleId(int articleId) {
        return commentMapper.selectCommentByArticleId(articleId);
    }

    @Override
    public int deleteComment(int commentId) {
        return commentMapper.deleteComment(commentId);
    }
}
