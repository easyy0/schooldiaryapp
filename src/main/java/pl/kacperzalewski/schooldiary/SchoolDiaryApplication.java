package pl.kacperzalewski.schooldiary;

import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.data.jpa.repository.config.EnableJpaRepositories;
import org.springframework.security.config.annotation.web.configuration.EnableWebSecurity;

@SpringBootApplication
@EnableWebSecurity
@EnableJpaRepositories
public class SchoolDiaryApplication {

	public static void main(String[] args) {
		SpringApplication.run(SchoolDiaryApplication.class, args);
	}
}
