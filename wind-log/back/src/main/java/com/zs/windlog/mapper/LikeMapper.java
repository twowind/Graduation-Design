package com.zs.windlog.mapper;


import com.zs.windlog.Do.Like;
import org.apache.ibatis.annotations.Mapper;

@Mapper
public interface LikeMapper {
    int insertLike(Like like);

    Like selectLikeByLike(Like like);

    int deleteLike(Like like);
}
