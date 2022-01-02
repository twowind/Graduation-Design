package com.zs.windlog.service.impl;


import com.zs.windlog.Do.Star;
import com.zs.windlog.mapper.StarMapper;
import com.zs.windlog.service.StarService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class StarServiceImpl implements StarService {

    @Autowired
    private StarMapper starMapper;

    @Override
    public int insertStar(Star star) {
        return starMapper.insertStar(star);
    }

    @Override
    public List<String> selectStarCategoryByUserId(int userId) {
        return starMapper.selectStarCategoryByUserId(userId);
    }

    @Override
    public Star selectStarArticle(int userId, int articleId) {
        return starMapper.selectStarArticle(userId,articleId);
    }

    @Override
    public int deleteStar(Star star) {
        return starMapper.deleteStar(star);
    }
}
