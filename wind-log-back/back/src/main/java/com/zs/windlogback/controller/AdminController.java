package com.zs.windlogback.controller;

import com.zs.windlogback.Do.Admin;
import com.zs.windlogback.Do.Result;
import com.zs.windlogback.Dto.AdminRegister;
import com.zs.windlogback.service.AdminService;
import com.zs.windlogback.util.JWT.JWTUtils;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import javax.servlet.http.Cookie;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import java.util.HashMap;
import java.util.Map;
import java.util.Objects;

@RestController
public class AdminController {

    @Autowired
    private AdminService adminService;

    @RequestMapping("/login")
    public Result login(@RequestBody Admin admin, HttpServletResponse response) {

        Result result = new Result();
        admin = adminService.selectAdmin(admin);
        if (admin != null) {
            result.setState("ok");
            Map<String, String> map = new HashMap<>();
            map.put("username",admin.getAdminName());
            response.setHeader("token",JWTUtils.getToken(map));
        } else result.setRs("fault");

        return result;
    }

    @RequestMapping("/register")
    public Result register(@RequestBody AdminRegister adminRegister) {
        Result result = new Result();
        if (!adminRegister.getAdminPass().equals(adminRegister.getAdminRepass())) {
            result.setState("fault");
        } else {
            int state = adminService.insertAdmin(adminRegister);
            if (state == 0) result.setState("fault");
            else result.setState("ok");
        }
        return result;
    }
}
