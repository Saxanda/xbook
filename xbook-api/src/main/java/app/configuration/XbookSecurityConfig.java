package app.configuration;

import app.entity.User;
import app.security.JwtAuthenticationEntryPoint;
import app.security.JwtFilter;
import app.service.UserService;
import app.service.UsersDetailsServiceJpa;
import io.swagger.v3.oas.models.Components;
import io.swagger.v3.oas.models.OpenAPI;
import io.swagger.v3.oas.models.security.SecurityRequirement;
import io.swagger.v3.oas.models.security.SecurityScheme;
import lombok.RequiredArgsConstructor;
import lombok.extern.log4j.Log4j2;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.security.config.annotation.method.configuration.EnableMethodSecurity;
import org.springframework.security.config.annotation.web.builders.HttpSecurity;
import org.springframework.security.config.annotation.web.configuration.EnableWebSecurity;
import org.springframework.security.config.annotation.web.configuration.WebSecurityConfiguration;
import org.springframework.security.config.annotation.web.configurers.AbstractHttpConfigurer;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.oauth2.client.endpoint.OAuth2AccessTokenResponseClient;
import org.springframework.security.oauth2.client.endpoint.OAuth2AuthorizationCodeGrantRequest;
import org.springframework.security.oauth2.client.oidc.userinfo.OidcUserRequest;
import org.springframework.security.oauth2.client.userinfo.OAuth2UserService;
import org.springframework.security.oauth2.core.oidc.user.DefaultOidcUser;
import org.springframework.security.oauth2.core.oidc.user.OidcUser;
import org.springframework.security.web.SecurityFilterChain;
import org.springframework.security.web.authentication.UsernamePasswordAuthenticationFilter;
import org.springframework.security.web.util.matcher.AntPathRequestMatcher;
import org.springframework.web.cors.CorsConfiguration;
import org.springframework.web.cors.CorsConfigurationSource;
import org.springframework.web.cors.UrlBasedCorsConfigurationSource;

import java.lang.reflect.Method;
import java.lang.reflect.Proxy;
import java.util.Arrays;
import java.util.Set;

@Configuration
@RequiredArgsConstructor
@Log4j2
@EnableWebSecurity
@EnableMethodSecurity(securedEnabled = true, jsr250Enabled = true)
public class XbookSecurityConfig {
    private final JwtFilter jwtFilter;
    private final JwtAuthenticationEntryPoint jwtAuthenticationEntryPoint;
    @Value("${frontend.url}")
    private String clientUrl;

    private final PasswordEncoderConfig encoder;

    private final UsersDetailsServiceJpa usersDetailsServiceJpa;

    private final UserService userService;

    private final OAuth2AuthenticationSuccessHandler oAuth2AuthenticationSuccessHandler;

    @Bean
    public SecurityFilterChain securityFilterChain(HttpSecurity http) throws Exception {

        http.csrf(AbstractHttpConfigurer::disable)
                .headers(headers -> headers.frameOptions().disable());

        http

                .exceptionHandling().authenticationEntryPoint(jwtAuthenticationEntryPoint)
                .and()
                .cors()
                .and()
                .authorizeRequests(authorize -> authorize
                        .requestMatchers(AntPathRequestMatcher.antMatcher("/api/v1/auth/**")).permitAll()
                        .requestMatchers(AntPathRequestMatcher.antMatcher("/api/v1/**")).authenticated()
                                .anyRequest().permitAll())
                        .oauth2Login(oauth2 -> oauth2.successHandler(oAuth2AuthenticationSuccessHandler)
                                .userInfoEndpoint(userInfo -> userInfo.oidcUserService(oidcUService())));

        http.addFilterBefore(jwtFilter, UsernamePasswordAuthenticationFilter.class);

        return http.build();
    }

    @Bean
    CorsConfigurationSource corsConfigurationSource() {
        CorsConfiguration configuration = new CorsConfiguration();
        configuration.setAllowedOrigins(Arrays.asList(clientUrl));
        configuration.setAllowedMethods(Arrays.asList("GET", "POST", "PUT", "DELETE", "PATCH", "OPTIONS"));
        configuration.setAllowedHeaders(Arrays.asList("Authorization", "Content-Type", "X-Requested-With"));
        configuration.setAllowCredentials(true); //to handle cookies or authentication
        UrlBasedCorsConfigurationSource source = new UrlBasedCorsConfigurationSource();
        source.registerCorsConfiguration("/**", configuration);
        return source;
    }

    private SecurityScheme createAPIKeyScheme() {
        return new SecurityScheme().type(SecurityScheme.Type.HTTP)
                .bearerFormat("JWT")
                .scheme("bearer");
    }

    @Bean
    public OpenAPI openAPI() {
        return new OpenAPI().addSecurityItem(new SecurityRequirement().
                        addList("Bearer Authentication"))
                .components(new Components().addSecuritySchemes
                        ("Bearer Authentication", createAPIKeyScheme()));
    }

    private OAuth2UserService<OidcUserRequest, OidcUser> oidcUService() {
        return userRequest -> {
            String email = userRequest.getIdToken().getClaim("email");

            if (!userService.isEmailExisting(email)) {
                User user = new User();
                user.setEmail(email);
                user.setName(userRequest.getIdToken().getGivenName());
                user.setSurname(userRequest.getIdToken().getFamilyName());
                user.setPassword(encoder.passwordEncoder().encode("11112222"));
                user.setGender(userRequest.getIdToken().getGender());
                user.setPhoto(userRequest.getIdToken().getPicture());
                user.setActivated(true);
                user.setRole("USER");
                userService.saveUser(user);
            }

            UserDetails userDetails = usersDetailsServiceJpa.loadUserByUsername(email);
            DefaultOidcUser oidcUser = new DefaultOidcUser(userDetails.getAuthorities(), userRequest.getIdToken());
            Set<Method> userDetailsMethods = Set.of(UserDetails.class.getMethods());

            return (OidcUser) Proxy.newProxyInstance(WebSecurityConfiguration.class.getClassLoader(),
                    new Class[]{UserDetails.class, OidcUser.class}, (proxy, method, args) ->
                            userDetailsMethods.contains(method)
                                    ? method.invoke(userDetails, args) : method.invoke(oidcUser, args));
        };
    }


}