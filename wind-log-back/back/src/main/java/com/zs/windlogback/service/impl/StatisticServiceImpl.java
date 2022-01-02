package com.zs.windlogback.service.impl;

import com.zs.windlogback.mapper.StatisticMapper;
import com.zs.windlogback.service.StatisticService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.time.LocalDateTime;
import java.util.Date;
import java.util.List;
import java.util.Map;

@Service
public class StatisticServiceImpl implements StatisticService {

    @Autowired
    private StatisticMapper statisticMapper;

    @Override
    public int selectNowVisits() {
        return statisticMapper.selectNowVisits();
    }

    @Override
    public int selectNowComments() {
        return statisticMapper.selectNowComments();
    }

    @Override
    public int selectNowMessage() {
        return statisticMapper.selectNowMessage();
    }

    @Override
    public int selectAllUsers() {
        return statisticMapper.selectAllUsers();
    }

    @Override
    public int selectAllArticles() {
        return statisticMapper.selectAllArticles();
    }

    @Override
    public int selectAllComments() {
        return statisticMapper.selectAllComments();
    }

    @Override
    public List<Map<String,Integer>> selectTimeArticle() {
        return statisticMapper.selectTimeArticle();
    }
}
