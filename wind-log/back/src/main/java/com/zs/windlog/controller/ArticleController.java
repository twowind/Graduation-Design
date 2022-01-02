package com.zs.windlog.controller;

import com.zs.windlog.Do.*;
import com.zs.windlog.Dto.Category;
import com.zs.windlog.Dto.Result;
import com.zs.windlog.service.ArticleService;
import com.zs.windlog.service.ArticleTagRefService;
import com.zs.windlog.service.TagService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.ArrayList;
import java.util.Date;
import java.util.LinkedList;
import java.util.List;

@CrossOrigin
@RestController
public class ArticleController {

    @Autowired
    private ArticleService articleService;

    @Autowired
    private TagService tagService;

    @Autowired
    private ArticleTagRefService articleTagRefService;

    @RequestMapping("/addarticle")
    public Result addArticle(@RequestBody Article article) {

        article.setArticleCreateTime(new Date());
        article.setArticleUpdateTime(new Date());

        if (article.getArticleId() == 0) {
            articleService.insertArticle(article);
        } else {
            articleService.updateArticle(article);
            //删除该文章下的所有标签
            articleTagRefService.deleteArticleTagRefToArticleId(article.getArticleId());
        }

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


        Result rs = new Result<>();

        rs.setState("ok");
        return rs;

    }

    @RequestMapping("/getarticlebycategory")
    public Result getArticleByCategory(@RequestBody int userId) {

        List<Category> categoryList = articleService.selectArticleByUserIdToCategory(userId);

        Result<List<Category>> rs = new Result<>();

        rs.setState("ok");
        rs.setRs(categoryList);

        return rs;
    }

    @RequestMapping("/getallblogstouser")
    public Result getAllArticleToUser(@RequestBody int userId) {
        System.out.println(userId);
        List<Article> articleList = articleService.selectAllArticleToUser(userId);
        Result<List<Article>> rs = new Result();
        rs.setState("ok");
        rs.setRs(articleList);
        return rs;
    }

    @RequestMapping("/getpopulararticles")
    public Result getPopularArticles() {

        List<Article> articleList = articleService.selectPopularArticles();
        Result<List<Article>> rs = new Result<>();

        rs.setState("ok");
        rs.setRs(articleList);

        return rs;

    }

    @RequestMapping("/getmoststararticles")
    public Result getMostStarArticles() {

        List<Article> articleList = articleService.selectMostStarArticles();
        Result<List<Article>> rs = new Result<>();

        rs.setState("ok");
        rs.setRs(articleList);
        return rs;

    }

    @RequestMapping("/getmostcommentarticles")
    public Result getMostCommentArticles() {

        List<Article> articleList = articleService.selectMostCommentArticles();
        Result<List<Article>> rs = new Result<>();

        rs.setState("ok");
        rs.setRs(articleList);
        return rs;

    }

    @RequestMapping("/getmostreadarticles")
    public Result getMostReadArticles() {

        List<Article> articleList = articleService.selectMostReadArticles();
        Result<List<Article>> rs = new Result<>();

        rs.setState("ok");
        rs.setRs(articleList);
        return rs;

    }

    @RequestMapping("/blog/{articleId}")
    public Result getBlogByArticleId(@PathVariable("articleId") int articleId) {

        Article article = articleService.selectArticleByArticleId(articleId);

        articleService.addArticleCountByArticleId(articleId);

        Result<Article> rs = new Result<>();

        rs.setState("ok");
        rs.setRs(article);
        return rs;
    }

    @PostMapping("/categoryarticle/{category}")
    public Result getArticleByCategoryAndUserId(@PathVariable("category") String category, @RequestBody int userId) {

        List<Article> articleList = articleService.selectArticleByUserIdAndCategory(userId, category);

        Result<List<Article>> result = new Result<>();

        result.setState("ok");
        result.setRs(articleList);
        return result;
    }

    @GetMapping("/explore/categoryarticle/{category}")
    public Result getArticleByCategory(@PathVariable("category") String category) {
        List<Article> articleList = articleService.selectArticleByCategory(category);

        Result<List<Article>> result = new Result<>();
        result.setRs(articleList);
        result.setState("ok");
        return result;
    }

    @RequestMapping("/tagarticle/{userId}")
    public Result getArticleByUserIdAndTags(@PathVariable("userId") int userId, @RequestBody List<Integer> tags) {
        List<Article> articleList = new LinkedList<>();
        if (tags.size() == 0) {
            articleList = articleService.selectAllArticleToUser(userId);
        } else {
            articleList = articleService.selectArticleByUserIdAndTags(userId, tags);
        }
        Result<List<Article>> result = new Result<>();

        result.setState("ok");
        result.setRs(articleList);
        return result;
    }

    @RequestMapping("/explore/tagarticle")
    public Result getArticleByTags(@RequestBody List<Integer> tags) {

        List<Article> articleList = new LinkedList<>();
        if (tags.size() == 0) {
            articleList = articleService.selectPopularArticles();
        } else {
            articleList = articleService.selectArticleByTags(tags);
        }
        Result<List<Article>> result = new Result<>();
        result.setState("ok");
        result.setRs(articleList);
        return result;
    }

    @RequestMapping("/explore/search")
    public Result getArticleBySearch(@RequestBody Search search) {
        System.out.println(search);
        List<Article> articleList = articleService.selectArticleBySearch(search);
        Result<List<Article>> result = new Result();
        result.setRs(articleList);
        result.setState("ok");
        return result;
    }

    @RequestMapping("/getstarblog/{userId}")
    public Result getStarBlogs(@PathVariable int userId) {
        Result<List<Article>> result = new Result<>();
        List<Article> articleList = articleService.getStarBlogs(userId);
        result.setRs(articleList);
        result.setState("ok");
        return result;
    }

    @RequestMapping("/getcategoryarticletostar/{category}/{userId}")
    public Result getCategoryArticleToStar(@PathVariable String category, @PathVariable int userId) {
        Result<List<Article>> result = new Result();
        List<Article> articleList = articleService.getCategoryArticleToStar(category, userId);
        result.setRs(articleList);
        result.setState("ok");
        return result;
    }
}
