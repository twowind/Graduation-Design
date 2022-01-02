package com.zs.windlog.controller;

import com.zs.windlog.Dto.Result;
import com.zs.windlog.Do.Star;
import com.zs.windlog.service.StarService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
public class StarController {

    @Autowired
    private StarService starService;

    @RequestMapping("stararticle")
    public Result addStar(@RequestBody Star star) {
        Result result = new Result();
        int state = starService.insertStar(star);
        result.setState("ok");
        return result;
    }

    @RequestMapping("/getstarcategory/{userId}")
    public Result getStarCategory(@PathVariable int userId) {
        Result<List<String>> result = new Result();

        List<String> list = starService.selectStarCategoryByUserId(userId);

        result.setRs(list);
        result.setState("ok");
        return result;
    }

    @RequestMapping("/getaticlestar/{userId}/{articleId}")
    public Result getArticleStar(@PathVariable int articleId, @PathVariable int userId) {
        Result result = new Result();

        Star star = starService.selectStarArticle(userId, articleId);

        if (star != null) {
            result.setState("ok");
        } else {
            result.setState("fault");
        }
        return result;
    }

    @DeleteMapping("/canclestar")
    public Result cancelStar(@RequestBody Star star){
        Result result=new Result();

        System.out.println(star);

        int state=starService.deleteStar(star);
        if(state==1){
            result.setState("ok");
        }else {
            result.setState("fault");
        }

        return result;
    }
}
