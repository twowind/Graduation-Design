package com.zs.windlog.controller;

import com.zs.windlog.Dto.Account;
import com.zs.windlog.Dto.Result;
import com.zs.windlog.Dto.User;
import com.zs.windlog.service.FollowService;
import com.zs.windlog.service.UserService;
import com.zs.windlog.utils.JWT.JWTUtils;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import javax.servlet.http.Cookie;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

@RestController
public class UserController {

    @Autowired
    private UserService userService;

    @Autowired
    private FollowService followService;

    @RequestMapping("/login")
    public Result<User> login(HttpServletResponse response, @RequestBody User user) {

        user = userService.selectUserByUser(user);
        Result<User> rs = new Result<>();

        if (user != null) {
            user.setFollowCount(followService.selectFollowCount(user.getUserId()));
            user.setFollowedCount(followService.selectFollowedCount(user.getUserId()));

            Map<String, String> map = new HashMap<>();
            map.put("username",user.getUserName());
            response.setHeader("token", JWTUtils.getToken(map));

            rs.setState("ok");
            rs.setRs(user);
            return rs;
        }
        rs.setState("fault");
        return rs;
    }

    @RequestMapping("/register")
    public Result register(@RequestBody User user) {

        int state = userService.insertUserByUser(user);
        Result rs = new Result<>();
        System.out.println("insert+++++++++++++++++++++++++++" + state);
        if (state == 1) {
            rs.setState("ok");
            return rs;
        }
        rs.setState("fault");
        return rs;

    }

    @RequestMapping("/modprofile")
    public Result modUserProfile(@RequestBody User user) {

        int state = userService.modUserProfile(user);
        Result<User> rs = new Result<>();
        if (state == 1) {
            rs.setState("ok");
            return rs;
        }
        rs.setState("fault");
        return rs;
    }

    @RequestMapping("/modaccount")
    public Result modUserAccount(@RequestBody Account account) {
        int state = userService.modUserAccount(account);
        System.out.println(account);
        Result rs = new Result();
        if (state == 1) {
            rs.setState("ok");
            return rs;
        }
        rs.setState("fault");
        return rs;
    }

    @RequestMapping("/user/{username}")
    public Result getUserProfile(@PathVariable String username) {
        User user = userService.selectUserByUsername(username);
        Result<User> result = new Result();
        if (user != null) {
            user.setFollowCount(followService.selectFollowCount(user.getUserId()));
            user.setFollowedCount(followService.selectFollowedCount(user.getUserId()));
            result.setState("ok");
            result.setRs(user);
            return result;
        }
        result.setState("fault");
        return result;
    }

    @RequestMapping("/explore/getpopularuser")
    public Result getPopularUser() {
        Result<List<User>> result = new Result<>();
        List<User> userList = userService.selectPopularUser();
        result.setRs(userList);
        result.setState("ok");
        return result;
    }

    @RequestMapping("/getfollowers/{userId}")
    public Result getFollowers(@PathVariable int userId) {
        Result<List<User>> result = new Result<>();
        List<User> userList = userService.getFollowers(userId);
        result.setRs(userList);
        result.setState("ok");
        return result;
    }

    @RequestMapping("/getfolloweds/{userId}")
    public Result getFolloweds(@PathVariable int userId) {
        Result<List<User>> result = new Result<>();
        List<User> userList = userService.getFolloweds(userId);
        result.setRs(userList);
        result.setState("ok");
        return result;
    }
}
