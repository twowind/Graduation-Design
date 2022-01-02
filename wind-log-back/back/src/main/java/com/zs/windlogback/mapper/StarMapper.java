package com.zs.windlogback.mapper;

import com.zs.windlogback.Do.Star;
import org.apache.ibatis.annotations.Mapper;

@Mapper
public interface StarMapper {
    int insertStar(Star star);
}
