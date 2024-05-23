package pl.kacperzalewski.schooldiary.service;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import pl.kacperzalewski.schooldiary.entity.News;
import pl.kacperzalewski.schooldiary.exception.UserNotFoundException;
import pl.kacperzalewski.schooldiary.repository.NewsRepository;

import java.util.Set;

@Service
public class NewsService {

    private final NewsRepository newsRepository;
    private final UserService userService;

    @Autowired
    public NewsService(NewsRepository newsRepository, UserService userService) {
        this.newsRepository = newsRepository;
        this.userService = userService;
    }

    public Set<News> getUserNews(Long userId) throws UserNotFoundException {
        return newsRepository.findAllByUserIdOrderByIdDesc(userId == null ? userService.getLoggedInUser().getId() :
                userId);
    }

    public News saveUserNews(News news) {
        try {
            Set<News> userNews = getUserNews(news.getUser().getId());
            if (userNews.size() >= 7) {
                News oldestNews = userNews.stream().toList().get(userNews.size() - 1);
                newsRepository.delete(oldestNews);
            }
            return newsRepository.save(news);
        } catch (UserNotFoundException e) {
            throw new RuntimeException(e);
        }
    }
}
