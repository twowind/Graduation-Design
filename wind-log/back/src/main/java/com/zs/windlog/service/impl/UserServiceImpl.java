package com.zs.windlog.service.impl;

import com.zs.windlog.Dto.User;
import com.zs.windlog.Dto.Account;
import com.zs.windlog.mapper.UserMapper;
import com.zs.windlog.service.UserService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class UserServiceImpl implements UserService {

    @Autowired
    private UserMapper userMapper;

    @Override
    public User selectUserByUser(User user) {
        return userMapper.selectUserByUser(user);
    }

    @Override
    public int insertUserByUser(User user) {
        return userMapper.insertUserByUser(user);
    }

    @Override
    public int modUserProfile(User user) {
        return userMapper.modUserProfile(user);
    }

    @Override
    public int modUserAccount(Account account) {
        return userMapper.modUserAccount(account);
    }

    @Override
    public User selectUserByUsername(String username) {
        return userMapper.selectUserByUsername(username);
    }

    @Override
    public List<User> selectPopularUser() {
        return userMapper.selectPopularUser();
    }

    @Override
    public List<User> getFollowers(int userId) {
        return userMapper.getFollowers(userId);
    }

    @Override
    public List<User> getFolloweds(int userId) {
        return userMapper.getFolloweds(userId);
    }
}
