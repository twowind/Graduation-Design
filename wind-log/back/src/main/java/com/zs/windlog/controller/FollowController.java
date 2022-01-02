package com.zs.windlog.controller;

import com.zs.windlog.Do.Follow;
import com.zs.windlog.Dto.Result;
import com.zs.windlog.service.FollowService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
public class FollowController {

    @Autowired
    private FollowService followService;

    @RequestMapping("/getfollowcount")
    public Result getFollowCount(@RequestBody int userId) {
        int followCount = followService.selectFollowCount(userId);

        Result<Integer> rs = new Result<>();
        rs.setState("ok");
        rs.setRs(followCount);
        return rs;
    }

    @RequestMapping("/getfollowedcount")
    public Result getFollowedCount(@RequestBody int userId) {
        int followedCount = followService.selectFollowedCount(userId);

        Result<Integer> rs = new Result<>();
        rs.setState("ok");
        rs.setRs(followedCount);
        return rs;
    }

    @RequestMapping("/isfollow")
    public Result getIsFollow(@RequestBody Follow follow) {
        follow = followService.selectIsFollow(follow);

        Result rs = new Result<>();
        if (follow != null) {
            rs.setState("ok");
            return rs;
        }

        rs.setState("fault");
        return rs;
    }

    @RequestMapping("/follow/{isFollow}")
    public Result switchFollow(@PathVariable boolean isFollow, @RequestBody Follow follow) {
        Result result = new Result();

        if (isFollow) followService.insertFollow(follow);
        else followService.deleteFollow(follow);

        result.setState("ok");
        return result;
    }

}
