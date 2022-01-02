package com.zs.windlogback.service.impl;

import com.zs.windlogback.Do.Star;
import com.zs.windlogback.mapper.StarMapper;
import com.zs.windlogback.service.StarService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

@Service
public class StarServiceImpl implements StarService {

    @Autowired
    private StarMapper starMapper;

    @Override
    public int insertStar(Star star) {
        return starMapper.insertStar(star);
    }
}
