package pl.kacperzalewski.schooldiary.repository;

import org.springframework.data.repository.CrudRepository;
import org.springframework.stereotype.Repository;
import pl.kacperzalewski.schooldiary.entity.User;

import java.util.Optional;

@Repository
public interface UserRepository extends CrudRepository<User, Long> {

    public User findByUsername(String username);
}