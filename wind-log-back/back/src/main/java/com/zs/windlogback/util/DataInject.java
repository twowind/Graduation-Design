package com.zs.windlogback.util;

import com.apifan.common.random.source.*;
import com.zs.windlogback.Do.*;
import com.zs.windlogback.service.*;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.ArrayList;
import java.util.List;

@RestController
public class DataInject {

    @Autowired
    private ArticleService articleService;

    @Autowired
    private TagService tagService;

    @Autowired
    private UserService userService;

    @Autowired
    private MessageService messageService;

    @Autowired
    private FollowService followService;

    @Autowired
    private CommentService commentService;

    @Autowired
    private StarService starService;

    @Autowired
    private LikeService likeService;

    @RequestMapping("/article")
    public void injectArticle() {
        List<String> list = new ArrayList<>();
        list.add("Java");
        list.add("C++");
        list.add("JavaScript");
        list.add("Spring");
        list.add("Vue");
        list.add("React");
        list.add("计算机网络");
        list.add("计算机组成原理");
        list.add("操作系统");
        list.add("数据结构与算法");

        Article article = new Article();
        for (int i = 0; i < 50; i++) {

            article.setArticleUserId(NumberSource.getInstance().randomInt(1, 21));
            article.setArticleTitle(OtherSource.getInstance().randomChineseSentence());
            article.setArticleContent(OtherSource.getInstance().randomChineseSentence() + OtherSource.getInstance().randomChineseSentence() + OtherSource.getInstance().randomChineseSentence() + OtherSource.getInstance().randomChineseSentence() + OtherSource.getInstance().randomChineseSentence());
            article.setArticleCreateTime(DateTimeSource.getInstance().randomPastTime(30));
            article.setArticleSummary(OtherSource.getInstance().randomChineseSentence() + OtherSource.getInstance().randomChineseSentence() + OtherSource.getInstance().randomChineseSentence());
            article.setArticleCategory(list.get(NumberSource.getInstance().randomInt(0, 10)));
            article.setArticleReadCount(NumberSource.getInstance().randomInt(1, 10001));
            article.setArticleUpdateTime(DateTimeSource.getInstance().randomFutureTime(1));
            int nums = articleService.insertArticles(article);
        }


    }

    @RequestMapping("/tag")
    public void injectTag() {
        String str = "";
        for (int i = 0; i < 50; i++) {
            str = PersonInfoSource.getInstance().randomChineseNickName(5);
            tagService.insertTag(str);
        }

    }

    @RequestMapping("/tagref")
    public void injectTagRef() {
        ArticleTagRef articleTagRef = new ArticleTagRef();
        for (int i = 0; i < 50; i++) {
            articleTagRef.setArticleId(NumberSource.getInstance().randomInt(1, 51));
            articleTagRef.setTaId(NumberSource.getInstance().randomInt(1, 51));
            tagService.insertTagRef(articleTagRef);
        }
    }

    @RequestMapping("/user")
    public void injectUser() {
        List<String> list = new ArrayList<>();
        list.add("https://ss1.bdstatic.com/70cFuXSh_Q1YnxGkpoWK1HF6hhy/it/u=3392663359,4194879068&fm=26&gp=0.jpg");
        list.add("https://ss1.bdstatic.com/70cFvXSh_Q1YnxGkpoWK1HF6hhy/it/u=3480070665,2380656812&fm=26&gp=0.jpg");
        list.add("https://ss3.bdstatic.com/70cFv8Sh_Q1YnxGkpoWK1HF6hhy/it/u=807498736,2545362365&fm=26&gp=0.jpg");
        list.add("https://ss2.bdstatic.com/70cFvnSh_Q1YnxGkpoWK1HF6hhy/it/u=1004953359,2131419137&fm=11&gp=0.jpg");
        list.add("https://ss2.bdstatic.com/70cFvnSh_Q1YnxGkpoWK1HF6hhy/it/u=3199448612,855593598&fm=26&gp=0.jpg");
        list.add("https://ss1.bdstatic.com/70cFvXSh_Q1YnxGkpoWK1HF6hhy/it/u=2748621384,3514446995&fm=11&gp=0.jpg");
        list.add("https://ss0.bdstatic.com/70cFvHSh_Q1YnxGkpoWK1HF6hhy/it/u=3279074139,2537768719&fm=11&gp=0.jpg");
        list.add("https://ss0.bdstatic.com/70cFvHSh_Q1YnxGkpoWK1HF6hhy/it/u=3826142549,889292993&fm=11&gp=0.jpg");
        list.add("https://ss0.bdstatic.com/70cFvHSh_Q1YnxGkpoWK1HF6hhy/it/u=1690101440,4018861958&fm=26&gp=0.jpg");
        list.add("https://ss2.bdstatic.com/70cFvnSh_Q1YnxGkpoWK1HF6hhy/it/u=2434952319,3937981215&fm=26&gp=0.jpg");

        User user = new User();
        for (int i = 0; i < 19; i++) {
            user.setUserName(PersonInfoSource.getInstance().randomNickName(8));
            user.setUserPass(PersonInfoSource.getInstance().randomStrongPassword(8, false));
            user.setUserNickname(PersonInfoSource.getInstance().randomChineseNickName(4));
            user.setUserEmail(InternetSource.getInstance().randomEmail(8));
            user.setUserAvatar(list.get(NumberSource.getInstance().randomInt(0, 10)));
            user.setUserRegisterTime(DateTimeSource.getInstance().randomPastTime(30));
            user.setUserBio(OtherSource.getInstance().randomChineseSentence() + OtherSource.getInstance().randomChineseSentence() + OtherSource.getInstance().randomChineseSentence());
            user.setUserGithub(PersonInfoSource.getInstance().randomNickName(8));
            user.setUserLocation(AreaSource.getInstance().randomProvince());
            user.setUserWeibo(PersonInfoSource.getInstance().randomPinyinNickName(4));

            userService.insertUser(user);
        }
    }

    @RequestMapping("/inject_message")
    public void injectMessage(){
        Message message=new Message();

        for (int i = 0; i < 50; i++) {
            message.setMessagerId(NumberSource.getInstance().randomInt(1, 21));
            message.setMessagedId(NumberSource.getInstance().randomInt(1, 21));
            message.setMessageContent(OtherSource.getInstance().randomChineseSentence()+OtherSource.getInstance().randomChineseSentence()+OtherSource.getInstance().randomChineseSentence());
            message.setMessageTime(DateTimeSource.getInstance().randomPastTime(30));

            messageService.insertMessage(message);
        }
    }

    @RequestMapping("/follow")
    public void injectFollow(){
        Follow follow=new Follow();
        for (int i = 0; i < 60; i++) {
            follow.setFollowId(NumberSource.getInstance().randomInt(1, 21));
            follow.setFollowedId(NumberSource.getInstance().randomInt(1, 21));

            followService.insertFollow(follow);
        }
    }

    @RequestMapping("comment")
    public void injectComment(){
        Comment comment=new Comment();

        for (int i = 0; i < 200; i++) {
            comment.setCommentPid(0);
            comment.setArticleId(NumberSource.getInstance().randomInt(1, 31));
            comment.setArticleComment(OtherSource.getInstance().randomChineseSentence()+OtherSource.getInstance().randomChineseSentence()+OtherSource.getInstance().randomChineseSentence()+OtherSource.getInstance().randomChineseSentence());
            comment.setCommentUserId(NumberSource.getInstance().randomInt(1, 21));
            comment.setCommentTime(DateTimeSource.getInstance().randomPastTime(30));

            commentService.insertComment(comment);
        }
    }

    @RequestMapping("/star")
    public void  injectStar(){
        Star star=new Star();
        List<String> list = new ArrayList<>();
        list.add("Python");
        list.add("C#");
        list.add("Go");
        list.add("C");
        list.add("Angular");

        for (int i = 0; i < 100; i++) {
            star.setArticleId(NumberSource.getInstance().randomInt(1, 51));
            star.setUserId(NumberSource.getInstance().randomInt(1, 21));
            star.setStarCategory(list.get(NumberSource.getInstance().randomInt(0, 5)));
            starService.insertStar(star);
        }
    }

    @RequestMapping("/like")
    public void injectLike(){
        Like like=new Like();

        for (int i = 0; i < 200; i++) {
            like.setLikeUserId(NumberSource.getInstance().randomInt(1, 21));
            like.setLikedArticleId(NumberSource.getInstance().randomInt(1, 31));
            like.setLikeCreateTime(DateTimeSource.getInstance().randomPastTime(30));

            likeService.insertLike(like);
        }
    }
}
