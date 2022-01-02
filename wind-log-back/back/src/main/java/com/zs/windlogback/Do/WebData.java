package com.zs.windlogback.Do;

import com.fasterxml.jackson.annotation.JsonFormat;
import com.fasterxml.jackson.annotation.JsonIgnoreProperties;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;
import org.springframework.format.annotation.DateTimeFormat;

import java.time.LocalDateTime;
import java.util.Date;
import java.util.List;
import java.util.Map;

@Data
@NoArgsConstructor
@AllArgsConstructor
public class WebData {
    private Integer newUsers;
    private Integer newComments;
    private Integer allUsers;
    private Integer newMessages;
    private Integer allComments;

    private List<Map<String, Integer>> timeArticle;
}
