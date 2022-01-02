package com.zs.windlog.config;

import org.springframework.boot.SpringBootConfiguration;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.web.cors.CorsConfiguration;
import org.springframework.web.cors.UrlBasedCorsConfigurationSource;
import org.springframework.web.filter.CorsFilter;
import org.springframework.web.servlet.config.annotation.CorsRegistry;
import org.springframework.web.servlet.config.annotation.WebMvcConfigurer;

// @Configuration
public class CorsConfig {

    @Bean
    public CorsFilter corsFilter() {
        //1.添加CORS配置信息
        CorsConfiguration config = new CorsConfiguration();

        /*是否允许请求带有验证信息*/
        config.setAllowCredentials(true);

        //1) 允许的域,不要写*，否则cookie就无法使用了
        config.addAllowedOrigin("http://localhost:3000");

        //3) 允许的请求方式
        config.addAllowedMethod("*");
        // 4）允许的头信息
        config.addAllowedHeader("*");

        //初始化Cors配置源
        UrlBasedCorsConfigurationSource configSource = new UrlBasedCorsConfigurationSource();
        //2.添加映射路径，我们拦截一切请求
        configSource.registerCorsConfiguration("/**", config);


        //3.返回CorsFilter实例.参数:cors配置源
        return new CorsFilter(configSource);
    }

}