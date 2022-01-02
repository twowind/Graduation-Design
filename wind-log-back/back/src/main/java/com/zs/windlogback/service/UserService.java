package com.zs.windlogback.service;

import com.zs.windlogback.Do.User;
import com.zs.windlogback.Dto.UserParam;

import java.util.List;

public interface UserService {
    int insertUser(User user);

    List<User> getAllUsers(UserParam userParam);

    int editUser(User user);
}
