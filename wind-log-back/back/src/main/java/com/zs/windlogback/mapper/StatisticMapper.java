package com.zs.windlogback.mapper;

import org.apache.ibatis.annotations.Mapper;

import java.time.LocalDateTime;
import java.util.Date;
import java.util.List;
import java.util.Map;

@Mapper
public interface StatisticMapper {
    int selectNowVisits();

    int selectNowComments();

    int selectNowMessage();

    int selectAllUsers();

    int selectAllArticles();

    int selectAllComments();

    List<Map<String, Integer>> selectTimeArticle();
}
