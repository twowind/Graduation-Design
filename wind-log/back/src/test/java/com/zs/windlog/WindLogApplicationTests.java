package com.zs.windlog;

import com.zs.windlog.utils.Word.WordFilter;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.context.SpringBootTest;

import javax.sql.DataSource;
import java.sql.Connection;
import java.sql.SQLException;
import java.util.Collection;
import java.util.Collections;

@SpringBootTest
class WindLogApplicationTests {

    @Autowired
    DataSource dataSource;


    @Test
    public void test() {
        String str= WordFilter.doFilter("日小姐");

        System.out.println(str);
    }

}
