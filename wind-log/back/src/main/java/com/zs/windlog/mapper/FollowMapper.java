package com.zs.windlog.mapper;

import com.zs.windlog.Do.Follow;
import org.apache.ibatis.annotations.Mapper;

@Mapper
public interface FollowMapper {
    int selectFollowCount(int userId);

    int selectFollowedCount(int userId);

    Follow selectIsFollow(Follow follow);

    void insertFollow(Follow follow);

    void deleteFollow(Follow follow);
}
