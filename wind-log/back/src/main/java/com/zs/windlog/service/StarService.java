package com.zs.windlog.service;


import com.zs.windlog.Do.Star;

import java.util.List;

public interface StarService {
    int insertStar(Star star);

    List<String> selectStarCategoryByUserId(int userId);

    Star selectStarArticle(int userId, int articleId);

    int deleteStar(Star star);
}
