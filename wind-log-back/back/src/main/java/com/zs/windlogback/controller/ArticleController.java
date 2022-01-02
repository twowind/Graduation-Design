package com.zs.windlogback.controller;

import com.github.pagehelper.PageHelper;
import com.github.pagehelper.PageInfo;
import com.zs.windlogback.Do.Article;
import com.zs.windlogback.Do.ArticleTagRef;
import com.zs.windlogback.Dto.ArticleParam;
import com.zs.windlogback.Do.Result;
import com.zs.windlogback.service.ArticleService;
import com.zs.windlogback.service.ArticleTagRefService;
import com.zs.windlogback.service.StatisticService;
import com.zs.windlogback.service.TagService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import javax.servlet.http.HttpServletRequest;
import java.util.ArrayList;
import java.util.List;

@RestController
public class ArticleController {

    @Autowired
    private ArticleService articleService;

    @Autowired
    private StatisticService statisticService;

    @Autowired
    private ArticleTagRefService articleTagRefService;

    @Autowired
    private TagService tagService;

    @RequestMapping("/getallarticles")
    public Result getAllArticles(@RequestBody ArticleParam articleParam) {
        Result<List<Article>> result = new Result<>();
        PageHelper.startPage(articleParam.getCurrent(), articleParam.getPageSize());
        List<Article> articleList = articleService.selectArticle(articleParam);
        PageInfo<Article> pageInfo = new PageInfo<>(articleList);
        result.setRs(articleList);
        result.setTotal(pageInfo.getTotal());
        result.setState("ok");
        return result;
    }

    @DeleteMapping("/deletearticle/{articleId}")
    public Result deleteArticle(@PathVariable int articleId) {
        Result result = new Result();

        int state = articleService.deleteArticle(articleId);
        if (state == 1) {
            result.setState("ok");
        } else result.setState("fault");

        return result;
    }

    @PostMapping("/editarticle")
    public Result editArticle(@RequestBody Article article) {
        System.out.println(article);
        Result result = new Result();
        int state = articleService.editArticle(article);

        articleTagRefService.deleteArticleTagRefToArticleId(article.getArticleId());

        if (article.getArticleTags().size() != 0) {
            //添加标签
            List<ArticleTagRef> articleTagRefList = new ArrayList<>();
            int tagId = 0;
            for (int i = 0; i < article.getArticleTags().size(); i++) {
                tagId = tagService.selectTagIdByTagName(article.getArticleTags().get(i).getTagName());
                articleTagRefList.add(new ArticleTagRef(article.getArticleId(), tagId));
            }
            articleTagRefService.insertArticleTagRef(articleTagRefList);
        }

        if (state == 1)
            result.setState("ok");
        return result;
    }

}
