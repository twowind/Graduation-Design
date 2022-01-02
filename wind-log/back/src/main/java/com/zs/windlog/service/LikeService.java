package com.zs.windlog.service;


import com.zs.windlog.Do.Like;

public interface LikeService {
    int insertLike(Like like);

    Like selectLikeByLike(Like like);

    int deleteLike(Like like);
}
