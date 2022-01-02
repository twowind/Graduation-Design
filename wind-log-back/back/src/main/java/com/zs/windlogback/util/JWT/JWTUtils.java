package com.zs.windlogback.util.JWT;

import com.auth0.jwt.JWT;
import com.auth0.jwt.JWTCreator;
import com.auth0.jwt.algorithms.Algorithm;
import com.auth0.jwt.interfaces.DecodedJWT;

import java.util.Calendar;
import java.util.Map;

public class JWTUtils {
    private static final String SIGN = "1jw45!jnfdkv+045";

    /**
     * 生成Token
     * @param map
     * @return
     */
    public static String getToken(Map<String,String> map){
        Calendar calendar=Calendar.getInstance();
        calendar.add(Calendar.DATE,7);

        JWTCreator.Builder builder = JWT.create();

        map.forEach((k,v)->{
            builder.withClaim(k,v);
        });
        return builder.withExpiresAt(calendar.getTime()).sign(Algorithm.HMAC256(SIGN));
    }

    /**
     * 验证Token,成功则取出
     */
    public static DecodedJWT verify(String token){
        return JWT.require(Algorithm.HMAC256(SIGN)).build().verify(token);
    }


}
