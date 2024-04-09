package app;

import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.data.jpa.repository.config.EnableJpaAuditing;

//@EnableJpaAuditing
@SpringBootApplication
public class XbookApiApplication {
    public static void main(String[] args) {
        SpringApplication.run(XbookApiApplication.class, args);
    }
}
