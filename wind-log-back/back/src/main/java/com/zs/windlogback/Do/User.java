package com.zs.windlogback.Do;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.time.LocalDateTime;

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
    private LocalDateTime userRegisterTime;
    private String userBio;
    private String userGithub;
    private String userLocation;
    private String userWeibo;
    private Integer followCount;
    private Integer followedCount;

}
