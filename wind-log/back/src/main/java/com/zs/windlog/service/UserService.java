package com.zs.windlog.service;

import com.zs.windlog.Dto.User;
import com.zs.windlog.Dto.Account;

import java.util.List;

public interface UserService {
    User selectUserByUser(User user);

    int insertUserByUser(User user);

    int modUserProfile(User user);

    int modUserAccount(Account account);

    User selectUserByUsername(String username);

    List<User> selectPopularUser();

    List<User> getFollowers(int userId);

    List<User> getFolloweds(int userId);
}
