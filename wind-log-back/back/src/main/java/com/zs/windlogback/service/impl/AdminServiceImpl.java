package com.zs.windlogback.service.impl;

import com.zs.windlogback.Do.Admin;
import com.zs.windlogback.Dto.AdminRegister;
import com.zs.windlogback.mapper.AdminMapper;
import com.zs.windlogback.service.AdminService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

@Service
public class AdminServiceImpl implements AdminService {

    @Autowired
    private AdminMapper adminMapper;

    @Override
    public Admin selectAdmin(Admin admin) {
        return adminMapper.selectAdmin(admin);
    }

    @Override
    public int insertAdmin(AdminRegister adminRegister) {
        return adminMapper.insertAdmin(adminRegister);
    }

}
