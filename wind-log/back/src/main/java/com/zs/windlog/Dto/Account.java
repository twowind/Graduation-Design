package com.zs.windlog.Dto;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@NoArgsConstructor
@AllArgsConstructor
public class Account {
    private Integer userId;
    private String userOldPass;
    private String userEmail;
    private String userNewPass;
}
