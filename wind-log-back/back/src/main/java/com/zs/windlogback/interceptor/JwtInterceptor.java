package com.zs.windlogback.interceptor;

import com.zs.windlogback.util.JWT.JWTUtils;
import org.springframework.web.servlet.HandlerInterceptor;

import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

public class JwtInterceptor implements HandlerInterceptor {
    @Override
    public boolean preHandle(HttpServletRequest request, HttpServletResponse response, Object handler) {
        String token = request.getHeader("token");
        try {
            JWTUtils.verify(token);
            return true;
        } catch (Exception e) {
            return false;
        }
    }
}
