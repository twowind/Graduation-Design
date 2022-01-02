package com.zs.windlogback.mapper;

import com.zs.windlogback.Do.Like;
import org.apache.ibatis.annotations.Mapper;

@Mapper
public interface LikeMapper {
    int insertLike(Like like);
}
