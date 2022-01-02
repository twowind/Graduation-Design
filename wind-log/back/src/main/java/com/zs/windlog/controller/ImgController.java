package com.zs.windlog.controller;

import com.zs.windlog.Dto.Result;
import org.springframework.http.MediaType;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;

import java.io.*;
import java.util.UUID;

@RestController
public class ImgController {

    @RequestMapping("/uploadimg")
    public Result uploadImg(@RequestParam(value = "file") MultipartFile img) throws IOException {

        String imgName = UUID.randomUUID().toString().replace("_", "") + "_" + img.getOriginalFilename().replaceAll(" ", "");
        //保存图片

        String imgFilePath = "F:\\img\\" + imgName;

        OutputStream out = new FileOutputStream(imgFilePath);
        out.write(img.getBytes());
        out.flush();
        out.close();

        Result<String> result = new Result();
        result.setRs("http://localhost:8080/img/" + imgName);
        result.setState("ok");
        return result;
    }


    //通过produces 告知浏览器我要返回的媒体类型
    @GetMapping(value = "/img/{imgName}", produces = {MediaType.IMAGE_JPEG_VALUE, MediaType.IMAGE_GIF_VALUE, MediaType.IMAGE_PNG_VALUE})
    public byte[] getImage2(@PathVariable String imgName) throws IOException {
        FileInputStream inputStream = new FileInputStream(new File("F:\\img\\" + imgName));
        byte[] bytes = new byte[inputStream.available()];
        inputStream.read(bytes, 0, inputStream.available());
        return bytes;
    }

}
