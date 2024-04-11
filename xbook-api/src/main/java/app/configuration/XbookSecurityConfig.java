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

import java.util.List;

@Log4j2
@Configuration
@EnableWebSecurity
@EnableMethodSecurity(securedEnabled = true, jsr250Enabled = true)
public class XbookSecurityConfig {
    private final JwtFilter jwtFilter;
    private final UserRepository userRepo;
    private final PasswordEncoder enc;

    public XbookSecurityConfig(UserRepository userRepo, PasswordEncoder enc, JwtFilter jwtFilter) {
        this.userRepo = userRepo;
        this.enc = enc;
        this.jwtFilter = jwtFilter;

        userRepo.saveAll(List.of(
                new User("Roma", enc.encode("123"), "roma22@gmail.com", "USER"),
                new User("Sasha", enc.encode("456"), "sasha_kuss@gmail.com", "USER")
        ));
    }

    @Bean
    public SecurityFilterChain filterChain(HttpSecurity http) throws Exception {

        http.csrf(AbstractHttpConfigurer::disable)
                .authorizeHttpRequests(authorizationManagerRequestMatcherRegistry ->
                        authorizationManagerRequestMatcherRegistry.requestMatchers(HttpMethod.DELETE).hasRole("ADMIN")
                                .requestMatchers("/admin/**").hasAnyRole("ADMIN")
//                                .requestMatchers("/user/**").hasAnyRole("USER", "ADMIN")
                                .requestMatchers("/user/register").permitAll()
                                .requestMatchers("/user/login").permitAll()
                                .requestMatchers("/user/calc/**").authenticated()
                                .requestMatchers("/user/hello").permitAll()
                                .anyRequest().authenticated())
                .httpBasic(Customizer.withDefaults())
                .sessionManagement(httpSecuritySessionManagementConfigurer ->
                        httpSecuritySessionManagementConfigurer.sessionCreationPolicy(SessionCreationPolicy.STATELESS));

        http.addFilterBefore(jwtFilter, UsernamePasswordAuthenticationFilter.class);

        return http.build();
    }
}
