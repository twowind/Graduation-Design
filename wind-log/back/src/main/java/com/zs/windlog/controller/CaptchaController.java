package com.zs.windlog.controller;

import com.alibaba.druid.util.StringUtils;
import com.zs.windlog.Dto.ImageCode;
import com.zs.windlog.utils.AesEncryptUtils;
import org.springframework.web.bind.annotation.*;

import javax.imageio.ImageIO;
import javax.servlet.http.Cookie;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import javax.servlet.http.HttpSession;

import java.awt.image.BufferedImage;
import java.io.IOException;
import java.io.OutputStream;
import java.util.Date;
import java.util.Map;

@RestController
public class CaptchaController {

    // @ApiOperation(value = "验证码")
    // @GetMapping("/verifyCode")
    // public void verifyCode(HttpServletRequest request, HttpServletResponse response) {
    //     IVerifyCodeGen iVerifyCodeGen = new SimpleCharVerifyCodeGenImpl();
    //     try {
    //         //设置长宽
    //         VerifyCode verifyCode = iVerifyCodeGen.generate(80, 28);
    //         String code = verifyCode.getCode();
    //         LOGGER.info(code);
    //         //将VerifyCode绑定session
    //         request.getSession().setAttribute("VerifyCode", code);
    //         //设置响应头
    //         response.setHeader("Pragma", "no-cache");
    //         //设置响应头
    //         response.setHeader("Cache-Control", "no-cache");
    //         //在代理服务器端防止缓冲
    //         response.setDateHeader("Expires", 0);
    //         //设置响应内容类型
    //         response.setContentType("image/jpeg");
    //         response.getOutputStream().write(verifyCode.getImgBytes());
    //         response.getOutputStream().flush();
    //     } catch (IOException e) {
    //         System.out.println(e);
    //     }
    // }

    @RequestMapping(value = "/getimagecode")
    public String imagecode(HttpServletRequest request, HttpServletResponse response) throws Exception {
        OutputStream os = response.getOutputStream();
        Map<String, Object> map = ImageCode.getImageCode(60, 20, os);
        String simpleCaptcha = "simpleCaptcha";

        System.out.println("getimagecode" + request.getSession() + "+++++++" + request.getSession().getId());

        // request.getSession().setAttribute(simpleCaptcha, map.get("strEnsure").toString().toLowerCase());
        // request.getSession().setAttribute("codeTime",new Date().getTime());

        Cookie cookie = new Cookie("captcha", AesEncryptUtils.encrypt(map.get("strEnsure").toString()));
        cookie.setMaxAge(30);
        cookie.setPath("/");
        response.addCookie(cookie);
        request.setAttribute("captcha", "test");

        // System.out.println(map.get("strEnsure").toString());

        try {
            ImageIO.write((BufferedImage) map.get("image"), "JPEG", os);
        } catch (IOException e) {
            return "";
        }
        return null;
    }

    @RequestMapping(value = "/checkcode")
    @ResponseBody
    public String checkcode(HttpServletRequest request, HttpSession session) throws Exception {
        String checkCode = request.getParameter("checkCode");
        System.out.println("checkcode" + request.getSession() + "+++++++" + request.getSession().getId());

        Cookie[] cookies = request.getCookies();
        if (cookies != null && cookies.length > 0) {
            for (Cookie cookie : cookies) {
                System.out.println("cookie===for遍历:name " + cookie.getName());
                System.out.println("cookie===for遍历:value " + cookie.getValue());
                if (StringUtils.equalsIgnoreCase(cookie.getName(), "isLogin")) {
                    // System.out.println("有cookie ---isLogin，并且cookie还没过期...");
                    //遍历cookie如果找到登录状态则返回true继续执行原来请求url到controller中的方法
                    // return true;
                }
            }
        }


        Object cko = session.getAttribute("simpleCaptcha"); //验证码对象
        if (cko == null) {
            request.setAttribute("errorMsg", "验证码已失效，请重新输入！");
            return "验证码已失效，请重新输入！";
        }
        String captcha = cko.toString();
        Date now = new Date();
        Long codeTime = Long.valueOf(session.getAttribute("codeTime") + "");
        if (StringUtils.isEmpty(checkCode) || captcha == null || !(checkCode.equalsIgnoreCase(captcha))) {
            request.setAttribute("errorMsg", "验证码错误！");
            return "验证码错误！";
        } else if ((now.getTime() - codeTime) / 1000 / 60 > 5) {
            //验证码有效时长为5分钟
            request.setAttribute("errorMsg", "验证码已失效，请重新输入！");
            return "验证码已失效，请重新输入！";
        } else {
            session.removeAttribute("simpleCaptcha");
            System.out.println("成功");
            return "1";
        }
    }
}
