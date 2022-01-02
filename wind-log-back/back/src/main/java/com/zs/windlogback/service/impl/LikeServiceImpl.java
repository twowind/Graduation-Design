package com.zs.windlogback.service.impl;

import com.zs.windlogback.Do.Like;
import com.zs.windlogback.mapper.LikeMapper;
import com.zs.windlogback.service.LikeService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

@Service
public class LikeServiceImpl implements LikeService {

    @Autowired
    private LikeMapper likeMapper;

    @Override
    public int insertLike(Like like) {
        return likeMapper.insertLike(like);
    }
}
