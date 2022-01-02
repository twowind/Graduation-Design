package com.zs.windlogback.service;

import com.zs.windlogback.Do.Comment;
import com.zs.windlogback.Dto.CommentParam;

import java.util.List;

public interface CommentService {
    int insertComment(Comment comment);

    List<Comment> selectComment(CommentParam commentParam);

    int deleteComment(int commentId);
}
