package com.zs.windlog.Dto;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.util.Date;

@Data
@NoArgsConstructor
@AllArgsConstructor
public class User {
    private Integer userId;
    private String userName;
    private String userPass;
    private String userNickname;
    private String userEmail;
    private String userAvatar;
    private Date userRegisterTime;
    private String userBio;
    private String userGithub;
    private String userLocation;
    private String userWeibo;
    private Integer followCount;
    private Integer followedCount;
}
