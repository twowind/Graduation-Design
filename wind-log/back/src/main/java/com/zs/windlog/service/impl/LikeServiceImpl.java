package com.zs.windlog.service.impl;

import com.zs.windlog.Do.Like;
import com.zs.windlog.mapper.LikeMapper;
import com.zs.windlog.service.LikeService;
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

    @Override
    public Like selectLikeByLike(Like like) {
        return likeMapper.selectLikeByLike(like);
    }


    @Override
    public int deleteLike(Like like) {
        return likeMapper.deleteLike(like);
    }


}
