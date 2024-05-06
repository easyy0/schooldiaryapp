package pl.kacperzalewski.schooldiary.controller;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.servlet.ModelAndView;
import pl.kacperzalewski.schooldiary.exception.UserNotFoundException;
import pl.kacperzalewski.schooldiary.entity.CustomUserDetails;
import pl.kacperzalewski.schooldiary.repository.NewsRepository;
import pl.kacperzalewski.schooldiary.service.NewsService;
import pl.kacperzalewski.schooldiary.service.UserService;
import pl.kacperzalewski.schooldiary.util.ModelAndViewProvider;
import pl.kacperzalewski.schooldiary.util.UserUtils;

import java.util.Set;

@Controller
public class HomeController {

    private final ModelAndViewProvider modelAndViewProvider;

    private final NewsService newsService;

    @Autowired
    public HomeController(ModelAndViewProvider modelAndViewProvider, NewsService newsService) {
        this.modelAndViewProvider = modelAndViewProvider;
        this.newsService = newsService;
    }

    @GetMapping("/home")
    public ModelAndView homeView() throws UserNotFoundException {
        ModelAndView mav = modelAndViewProvider.setupMavGlobalData("home");
        mav.addObject("news", newsService.getUserNews());
        return mav;
    }
}