package pl.kacperzalewski.schooldiary.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import pl.kacperzalewski.schooldiary.entity.News;

import java.util.Set;

public interface NewsRepository extends JpaRepository<News, Long> {
    Set<News> findAllByUserIdOrderByIdDesc(Long userId);
}