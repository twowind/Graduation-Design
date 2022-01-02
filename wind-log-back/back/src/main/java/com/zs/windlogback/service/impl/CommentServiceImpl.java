package com.zs.windlogback.service.impl;

import com.zs.windlogback.Do.Comment;
import com.zs.windlogback.mapper.CommentMapper;
import com.zs.windlogback.Dto.CommentParam;
import com.zs.windlogback.service.CommentService;
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
    public List<Comment> selectComment(CommentParam commentParam) {
        return commentMapper.selectComment(commentParam);
    }

    @Override
    public int deleteComment(int commentId) {
        return commentMapper.deleteComment(commentId);
    }


}
