package app.configuration;


import app.entity.User;
import app.filter.JwtFilter;
import app.repository.UserRepository;
import lombok.extern.log4j.Log4j2;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.http.HttpMethod;
import org.springframework.security.config.Customizer;
import org.springframework.security.config.annotation.method.configuration.EnableMethodSecurity;
import org.springframework.security.config.annotation.web.builders.HttpSecurity;
import org.springframework.security.config.annotation.web.configuration.EnableWebSecurity;
import org.springframework.security.config.annotation.web.configurers.AbstractHttpConfigurer;
import org.springframework.security.config.http.SessionCreationPolicy;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.security.web.SecurityFilterChain;
import org.springframework.security.web.authentication.UsernamePasswordAuthenticationFilter;
import org.springframework.security.web.util.matcher.AntPathRequestMatcher;

import java.util.List;

@Log4j2
@Configuration
@EnableWebSecurity
@EnableMethodSecurity(securedEnabled = true, jsr250Enabled = true)
public class XbookSecurityConfig {
    private final JwtFilter jwtFilter;
    private final UserRepository repo;
    private final PasswordEncoder enc;

    public XbookSecurityConfig(UserRepository repo, PasswordEncoder enc, JwtFilter jwtFilter) {
        this.repo = repo;
        this.enc = enc;
        this.jwtFilter = jwtFilter;

        repo.saveAll(List.of(
                new User("Roma", enc.encode("123"), "roma22@gmail.com", "USER"),
                new User("Sasha", enc.encode("456"), "sasha_kuss@gmail.com", "USER")
        ));
    }

    @Bean
    public SecurityFilterChain securityFilterChain(HttpSecurity http) throws Exception {

        http.csrf(AbstractHttpConfigurer::disable)
                .headers(headers -> headers.frameOptions().disable());

        http
                .authorizeRequests(authorize -> authorize
                        .requestMatchers(
                                AntPathRequestMatcher.antMatcher("/"),
                                AntPathRequestMatcher.antMatcher("/h2-console/**"),
                                AntPathRequestMatcher.antMatcher("/swagger*/**"),
                                AntPathRequestMatcher.antMatcher("/user/register"),
                                AntPathRequestMatcher.antMatcher("/user/login")
                        ).permitAll()
                        .anyRequest().authenticated());

        http.addFilterBefore(jwtFilter, UsernamePasswordAuthenticationFilter.class);

        return http.build();
    }
}
