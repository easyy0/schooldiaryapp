package pl.kacperzalewski.schooldiary.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Service;
import pl.kacperzalewski.schooldiary.entity.News;
import pl.kacperzalewski.schooldiary.entity.User;

import java.util.Set;

public interface NewsRepository extends JpaRepository<News, Long> {
    Set<News> findAllByUserId(Long userId);
}