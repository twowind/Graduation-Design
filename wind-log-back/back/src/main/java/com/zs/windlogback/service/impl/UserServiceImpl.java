package com.zs.windlogback.service.impl;

import com.zs.windlogback.Do.User;
import com.zs.windlogback.Dto.UserParam;
import com.zs.windlogback.mapper.UserMapper;
import com.zs.windlogback.service.UserService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class UserServiceImpl implements UserService {

    @Autowired
    private UserMapper userMapper;

    @Override
    public int insertUser(User user) {
        return userMapper.insertUser(user);
    }

    @Override
    public List<User> getAllUsers(UserParam userParam) {
        return userMapper.getAllUsers(userParam);
    }

    @Override
    public int editUser(User user) {
        return userMapper.editUser(user);
    }
}
