package pl.kacperzalewski.schooldiary.controller.rest;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.servlet.ModelAndView;
import pl.kacperzalewski.schooldiary.exception.UserNotFoundException;
import pl.kacperzalewski.schooldiary.service.NewsService;

import java.util.List;

@RestController
public class RestHomeController {

    private final NewsService newsService;

    @Autowired
    public RestHomeController(NewsService newsService) {
        this.newsService = newsService;
    }

    @GetMapping("/api/home")
    public ResponseEntity<?> homeView() {
        try {
            return ResponseEntity.ok(newsService.getUserNews(null));
        } catch (UserNotFoundException e) {
            return ResponseEntity.notFound().build();
        }
    }
}