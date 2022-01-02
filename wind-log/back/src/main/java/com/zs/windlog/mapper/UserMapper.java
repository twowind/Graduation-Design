package com.zs.windlog.mapper;

import com.zs.windlog.Do.Article;
import com.zs.windlog.Dto.User;
import com.zs.windlog.Dto.Account;
import org.apache.ibatis.annotations.Mapper;

import java.util.List;

@Mapper
public interface UserMapper {

    User selectUserByUser(User user);

    int insertUserByUser(User user);

    int modUserProfile(User user);

    int modUserAccount(Account account);

    User selectUserByUsername(String username);

    List<User> selectPopularUser();

    List<User> getFollowers(int userId);

    List<User> getFolloweds(int userId);

}
