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

    public Set<News> getUserNews() throws UserNotFoundException {
        return newsRepository.findAllByUserId(userService.getLoggedInUser().getId());
    }
}
