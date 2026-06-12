package pl.kacperzalewski.schooldiary.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;
import pl.kacperzalewski.schooldiary.entity.News;

import java.util.Set;

@Repository
public interface NewsRepository extends JpaRepository<News, Long> {
    Set<News> findAllByUserIdOrderByIdDesc(Long userId);
}