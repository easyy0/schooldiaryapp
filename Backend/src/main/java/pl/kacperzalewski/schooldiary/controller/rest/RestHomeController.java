package pl.kacperzalewski.schooldiary.controller.rest;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RestController;
import pl.kacperzalewski.schooldiary.entity.News;
import pl.kacperzalewski.schooldiary.exception.BadCredentialsException;
import pl.kacperzalewski.schooldiary.service.NewsService;

import java.util.Set;

@RestController
public class RestHomeController {

    private final NewsService newsService;

    @Autowired
    public RestHomeController(NewsService newsService) {
        this.newsService = newsService;
    }

    /**
     * Handles GET requests for the home page data, including news articles.
     *
     * This endpoint provides the data necessary to render the home page,
     * such as the latest news.
     *
     * @return ResponseEntity containing an array of news articles in case of success,
     *         or 404 Not Found if the user is not found.
     */
    @GetMapping("/api/home")
    public ResponseEntity<?> getHomePageData() {
        try {
            Set<News> userNews = newsService.getUserNews(null);
            return ResponseEntity.ok(userNews);
        } catch (BadCredentialsException e) {
            return ResponseEntity.notFound().build();
        }
    }
}