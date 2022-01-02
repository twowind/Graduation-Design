package com.zs.windlogback.mapper;

import com.zs.windlogback.Do.Comment;
import com.zs.windlogback.Dto.CommentParam;
import org.apache.ibatis.annotations.Mapper;

import java.util.List;


@Mapper
public interface CommentMapper {
    int insertComment(Comment comment);

    List<Comment> selectComment(CommentParam commentParam);

    int deleteComment(int commentId);
}
