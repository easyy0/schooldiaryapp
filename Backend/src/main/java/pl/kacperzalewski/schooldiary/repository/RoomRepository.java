package pl.kacperzalewski.schooldiary.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;
import pl.kacperzalewski.schooldiary.entity.Room;

@Repository
public interface RoomRepository extends JpaRepository<Room, Long> {
}
