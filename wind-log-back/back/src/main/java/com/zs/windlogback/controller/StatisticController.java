package com.zs.windlogback.controller;

import com.fasterxml.jackson.core.JsonProcessingException;
import com.fasterxml.jackson.databind.ObjectMapper;
import com.fasterxml.jackson.databind.util.JSONPObject;
import com.google.gson.Gson;
import com.zs.windlogback.Do.Result;
import com.zs.windlogback.Do.WebData;
import com.zs.windlogback.service.StatisticService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.text.SimpleDateFormat;
import java.util.*;

@RestController
public class StatisticController {

    @Autowired
    private StatisticService statisticService;

    @RequestMapping("get_web_data")
    public String getData(){
        Map<String,Object> result=new HashMap<>();
        WebData webData = new WebData();
        webData.setNewUsers(statisticService.selectNowVisits());
        webData.setNewComments(statisticService.selectNowComments());
        webData.setAllUsers(statisticService.selectAllUsers());
        webData.setNewMessages(statisticService.selectNowMessage());
        webData.setTimeArticle(statisticService.selectTimeArticle());
        Gson gson=new Gson();
        result.put("success",true);
        result.put("data",webData);
        String s = gson.toJson(result);
        return s;
    }

}
