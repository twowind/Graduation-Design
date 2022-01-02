package com.zs.windlogback.Dto;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.util.Date;
import java.util.Map;

@Data
@NoArgsConstructor
@AllArgsConstructor
public class UserParam {
    private  Integer pageSize;
    private Integer current;
    private Map<String,String> sort;
    private Integer userId;
    private String userNickname;
    private String userName;
    private Date userRegisterTime;
}
