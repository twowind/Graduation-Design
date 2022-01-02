package com.zs.windlogback.mapper;

import com.zs.windlogback.Do.User;
import com.zs.windlogback.Dto.UserParam;
import org.apache.ibatis.annotations.Mapper;

import java.util.List;

@Mapper
public interface UserMapper {
    int insertUser(User user);

    List<User> getAllUsers(UserParam userParam);

    int editUser(User user);

}
