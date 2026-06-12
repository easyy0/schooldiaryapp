package pl.kacperzalewski.schooldiary.service;

import jakarta.annotation.PostConstruct;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import pl.kacperzalewski.schooldiary.entity.News;
import pl.kacperzalewski.schooldiary.entity.User;
import pl.kacperzalewski.schooldiary.exception.BadCredentialsException;
import pl.kacperzalewski.schooldiary.repository.NewsRepository;

import java.time.LocalDateTime;
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

    /**
     * Retrieves the news for a given user. If the {@code userId} is {@code null},
     * the news of the currently logged-in user will be returned.
     *
     * @param userId the ID of the user whose news should be retrieved. If {@code null},
     *               the logged-in user's news will be retrieved.
     * @return a set of {@link News} objects associated with the specified user,
     *         ordered by their ID in descending order.
     * @throws BadCredentialsException if the user is not authenticated or if there
     *                                 are issues retrieving the logged-in user's details.
     */
    public Set<News> getUserNews(Long userId) throws BadCredentialsException {
        return newsRepository.findAllByUserIdOrderByIdDesc(userId == null ? userService.getLoggedInUser().getId() :
                userId);
    }

    /**
     * Saves the given {@code news} into the database. If the number of news
     * items for the user is equal to or greater than 7, the oldest record is
     * removed before saving the new one.
     *
     * @param news the {@link News} object to be saved, containing information
     *             about the user and the news item.
     * @return the saved {@link News} object after it has been persisted.
     *
     * @throws RuntimeException if a {@link BadCredentialsException} occurs during the process.
     */
    private News saveUserNewsReplacingOldestIfLimitExceeded(News news) {
        try {
            Set<News> userNews = getUserNews(news.getUser().getId());
            if (userNews.size() >= 7) {
                News oldestNews = userNews.stream().toList().get(userNews.size() - 1);
                newsRepository.delete(oldestNews);
            }
            return newsRepository.save(news);
        } catch (BadCredentialsException e) {
            throw new RuntimeException(e);
        }
    }

    public void prepareAndSaveNewsForUser(
            User recipient,
            String title,
            String header,
            String description) {
        News news = News
                .builder()
                .user(recipient)
                .header(header)
                .description(description)
                .title(title)
                .date(LocalDateTime.now())
                .build();

        saveUserNewsReplacingOldestIfLimitExceeded(news);
    }
}
