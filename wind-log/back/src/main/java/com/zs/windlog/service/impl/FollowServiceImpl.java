package com.zs.windlog.service.impl;

import com.zs.windlog.Do.Follow;
import com.zs.windlog.mapper.FollowMapper;
import com.zs.windlog.service.FollowService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

@Service
public class FollowServiceImpl implements FollowService {

    @Autowired
    private FollowMapper followMapper;

    @Override
    public int selectFollowCount(int userId) {
        return followMapper.selectFollowCount(userId);
    }

    @Override
    public int selectFollowedCount(int userId) {
        return followMapper.selectFollowedCount(userId);
    }

    @Override
    public Follow selectIsFollow(Follow follow) {
        return followMapper.selectIsFollow(follow);
    }

    @Override
    public void insertFollow(Follow follow) {
        followMapper.insertFollow(follow);
    }

    @Override
    public void deleteFollow(Follow follow) {
        followMapper.deleteFollow(follow);
    }
}
