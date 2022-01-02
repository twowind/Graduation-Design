package com.zs.windlogback.mapper;

import com.zs.windlogback.Do.Follow;
import org.apache.ibatis.annotations.Mapper;

@Mapper
public interface FollowMapper {
    int insertFollow(Follow follow);
}
