package com.zs.windlogback.mapper;

import com.zs.windlogback.Do.Admin;
import com.zs.windlogback.Dto.AdminRegister;
import org.apache.ibatis.annotations.Mapper;

@Mapper
public interface AdminMapper {
    Admin selectAdmin(Admin admin);

    int insertAdmin(AdminRegister adminRegister);
}
