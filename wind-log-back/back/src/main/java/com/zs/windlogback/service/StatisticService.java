package com.zs.windlogback.service;

import java.time.LocalDateTime;
import java.util.Date;
import java.util.List;
import java.util.Map;

public interface StatisticService {
    int selectNowVisits();

    int selectNowComments();

    int selectNowMessage();

    int selectAllUsers();

    int selectAllArticles();

    int selectAllComments();

    List<Map<String,Integer>> selectTimeArticle();
}
