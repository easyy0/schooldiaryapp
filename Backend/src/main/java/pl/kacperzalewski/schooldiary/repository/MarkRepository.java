package pl.kacperzalewski.schooldiary.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;
import pl.kacperzalewski.schooldiary.entity.Mark;

import java.util.Optional;

@Repository
public interface MarkRepository extends JpaRepository<Mark, Long> {
    Optional<Mark> findByCode(String code);
}
