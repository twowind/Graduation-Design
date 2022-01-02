package com.zs.windlog.mapper;

import com.zs.windlog.Do.Comment;
import org.apache.ibatis.annotations.Mapper;

import java.util.List;

@Mapper
public interface CommentMapper {
    int insertComment(Comment comment);

    List<Comment> selectCommentByArticleId(int articleId);

    int deleteComment(int commentId);
}
