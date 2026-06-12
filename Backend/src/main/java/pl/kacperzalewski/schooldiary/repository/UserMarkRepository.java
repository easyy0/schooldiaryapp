package pl.kacperzalewski.schooldiary.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;
import pl.kacperzalewski.schooldiary.entity.UserMark;

import java.util.List;

@Repository
public interface UserMarkRepository extends JpaRepository<UserMark, Long> {
    List<UserMark> findByToUserId(Long userId);
}
