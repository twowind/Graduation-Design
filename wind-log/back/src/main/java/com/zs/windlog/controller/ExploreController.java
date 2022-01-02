package com.zs.windlog.controller;

import com.zs.windlog.Do.Article;
import com.zs.windlog.Dto.Result;
import com.zs.windlog.mapper.ArticleMapper;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.List;

@RestController
@RequestMapping("/explore")
public class ExploreController {
    @Autowired
    ArticleMapper articleService;


    @RequestMapping("/getpopulararticles")
    public Result getPopularArticles() {
        List<Article> articleList = articleService.selectPopularArticles();
        Result<List<Article>> rs = new Result<>();
        rs.setState("ok");
        rs.setRs(articleList);
        return rs;

    }

    @RequestMapping("/getmoststararticles")
    public Result getMostStarArticles() {

        List<Article> articleList = articleService.selectMostStarArticles();
        Result<List<Article>> rs = new Result<>();

        rs.setState("ok");
        rs.setRs(articleList);
        return rs;

    }

    @RequestMapping("/getmostcommentarticles")
    public Result getMostCommentArticles() {

        List<Article> articleList = articleService.selectMostCommentArticles();
        Result<List<Article>> rs = new Result<>();

        rs.setState("ok");
        rs.setRs(articleList);
        return rs;

    }

    @RequestMapping("/getmostreadarticles")
    public Result getMostReadArticles() {

        List<Article> articleList = articleService.selectMostReadArticles();
        Result<List<Article>> rs = new Result<>();

        rs.setState("ok");
        rs.setRs(articleList);
        return rs;

    }

}
