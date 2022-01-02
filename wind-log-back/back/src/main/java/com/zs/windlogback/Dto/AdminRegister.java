package com.zs.windlogback.Dto;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@NoArgsConstructor
@AllArgsConstructor
public class AdminRegister {
    private String adminName;
    private String adminPass;
    private String adminRepass;
    private Integer adminPermission;
}
