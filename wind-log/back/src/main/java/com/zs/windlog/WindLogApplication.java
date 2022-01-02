package com.zs.windlog;

import org.mybatis.spring.annotation.MapperScan;
import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;

@SpringBootApplication
@MapperScan("com.zs.windlog.mapper")
public class WindLogApplication {

    public static void main(String[] args) {
        SpringApplication.run(WindLogApplication.class, args);
    }

}
