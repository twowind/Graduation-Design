package com.zs.windlogback.service;

import com.zs.windlogback.Do.Admin;
import com.zs.windlogback.Dto.AdminRegister;

public interface AdminService {
    Admin selectAdmin(Admin admin);

    int insertAdmin(AdminRegister adminRegister);

}
