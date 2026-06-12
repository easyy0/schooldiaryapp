package pl.kacperzalewski.schooldiary.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;
import pl.kacperzalewski.schooldiary.entity.User;
import pl.kacperzalewski.schooldiary.entity.enums.UserRole;

import java.util.Optional;
import java.util.Set;

@Repository
public interface UserRepository extends JpaRepository<User, Long> {

    public User findByUsername(String username);

    public User findById(long id);

    @Query("""
        select u from User u
        left join fetch u.schoolClass sc
        left join fetch sc.subjectList
        where u.id = :id
    """)
    Optional<User> findByIdWithClassAndSubjects(long id);

    @Query("""
        select u from User u
        left join fetch u.schoolClass
    """)
    Set<User> findAllWithSchoolClass();

    @Query("""
        select u from User u
        left join fetch u.schoolClass
        where u.id != :userId and u.role != :role
    """)
    Set<User> findByRolesNotContainingWithSchoolClass(Long userId, @Param("role") UserRole role);

    Set<User> findBySchoolClassId(Long classId);
}
