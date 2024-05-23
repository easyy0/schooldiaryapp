package pl.kacperzalewski.schooldiary.repository;

import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.CrudRepository;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;
import pl.kacperzalewski.schooldiary.entity.User;
import pl.kacperzalewski.schooldiary.entity.enums.UserRole;

import java.util.Set;

@Repository
public interface UserRepository extends CrudRepository<User, Long> {

    public User findByUsername(String username);

    public User findById(int id);

    @Query("SELECT u FROM User u WHERE u.id != :userId AND u.role = :role")
    Set<User> findByRolesNotContaining(Long userId, @Param("role") UserRole role);
}