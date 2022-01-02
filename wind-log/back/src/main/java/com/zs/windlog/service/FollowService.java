package com.zs.windlog.service;

import com.zs.windlog.Do.Follow;

public interface FollowService {
    int selectFollowCount(int userId);

    int selectFollowedCount(int userId);

    Follow selectIsFollow(Follow follow);

    void insertFollow(Follow follow);

    void deleteFollow(Follow follow);
}
