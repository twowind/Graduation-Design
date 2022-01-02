package com.zs.windlog.controller;

import com.zs.windlog.Do.Like;
import com.zs.windlog.Dto.Result;
import com.zs.windlog.service.LikeService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.time.LocalDateTime;

@RestController
public class LikeController {

    @Autowired
    private LikeService likeService;

    @RequestMapping("/getlike")
    public Result getLike(@RequestBody Like like) {
        Result result = new Result();
        like = likeService.selectLikeByLike(like);
        if (like == null) {
            result.setState("fault");
        } else {
            result.setState("ok");
        }
        return result;
    }

    @RequestMapping("/addlike")
    public Result addLike(@RequestBody Like like) {
        System.out.println("++++++++++++++++++++++++++++++++++++++++"+like);
        Result result = new Result();
        like.setLikeCreateTime(LocalDateTime.now());
        int state = likeService.insertLike(like);
        if (state == 1)
            result.setState("ok");
        else result.setState("fault");
        return result;
    }

    @RequestMapping("/deletelike")
    public Result deleteLike(@RequestBody Like like) {
        Result result = new Result();
        int state = likeService.deleteLike(like);
        if (state == 1)
            result.setState("ok");
        else result.setState("fault");
        return result;
    }


}
