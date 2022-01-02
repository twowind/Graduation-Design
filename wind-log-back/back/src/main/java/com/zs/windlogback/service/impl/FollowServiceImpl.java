package com.zs.windlogback.service.impl;

import com.zs.windlogback.Do.Follow;
import com.zs.windlogback.mapper.FollowMapper;
import com.zs.windlogback.service.FollowService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

@Service
public class FollowServiceImpl implements FollowService {

    @Autowired
    private FollowMapper followMapper;

    @Override
    public int insertFollow(Follow follow) {
        return followMapper.insertFollow(follow);
    }
}
