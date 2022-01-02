package com.zs.windlog.service;

import com.zs.windlog.Do.Comment;

import java.util.List;

public interface CommentService {
    int insertComment(Comment comment);

    List<Comment> selectCommentByArticleId(int articleId);

    int deleteComment(int commentId);
}
