package com.zs.windlogback.controller;

import com.github.pagehelper.PageHelper;
import com.github.pagehelper.PageInfo;
import com.zs.windlogback.Do.Article;
import com.zs.windlogback.Do.Result;
import com.zs.windlogback.Do.User;
import com.zs.windlogback.Dto.UserParam;
import com.zs.windlogback.service.UserService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpRequest;
import org.springframework.web.bind.annotation.*;

import javax.servlet.http.HttpServletRequest;
import java.time.LocalDateTime;
import java.util.List;

@RestController
public class UserController {


    @Autowired
    private UserService userService;

    @RequestMapping("getallusers")
    public Result getAllUsers( @RequestBody UserParam userParam) {
        System.out.println(userParam);
        PageHelper.startPage(userParam.getCurrent(), userParam.getPageSize());
        List<User> userList = userService.getAllUsers(userParam);
        PageInfo<User> pageInfo = new PageInfo<>(userList);
        Result<List<User>> result = new Result<>();
        result.setRs(userList);
        result.setTotal(pageInfo.getTotal());
        result.setState("ok");

        return result;

    }

    @PostMapping("/adduser")
    public Result addUser(@RequestBody User user) {
        user.setUserRegisterTime(LocalDateTime.now());

        int state = userService.insertUser(user);
        Result result = new Result();
        if (state == 1) {
            result.setState("ok");
        } else result.setState("fault");

        return result;

    }

    @PostMapping("/edituser")
    public Result editUser(@RequestBody User user) {
        Result result = new Result();

        int state = userService.editUser(user);

        result.setState("ok");
        return result;
    }
}
