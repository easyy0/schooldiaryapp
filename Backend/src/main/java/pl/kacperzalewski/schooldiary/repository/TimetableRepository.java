package pl.kacperzalewski.schooldiary.repository;

import org.springframework.data.jpa.repository.EntityGraph;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;
import pl.kacperzalewski.schooldiary.entity.Timetable;

import java.util.Optional;

@Repository
public interface TimetableRepository extends JpaRepository<Timetable, Long> {
}
