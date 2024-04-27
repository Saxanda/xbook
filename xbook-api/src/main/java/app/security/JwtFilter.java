package app.security;

import app.service.UserService;
import jakarta.servlet.FilterChain;
import jakarta.servlet.ServletException;
import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpServletResponse;
import lombok.NonNull;
import lombok.RequiredArgsConstructor;
import lombok.extern.log4j.Log4j2;
import org.springframework.http.HttpHeaders;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.web.authentication.WebAuthenticationDetailsSource;
import org.springframework.stereotype.Component;
import org.springframework.web.filter.OncePerRequestFilter;

import java.io.IOException;
import java.util.Optional;

@Component
@RequiredArgsConstructor
@Log4j2
public class JwtFilter extends OncePerRequestFilter {
    private static final String BEARER = "Bearer ";
    private static final String AUTH_HEADER = HttpHeaders.AUTHORIZATION;
    private final JwtTokenService tokenService;
    private final UserService userService;

    private Optional<String> extractTokenFromRequest(HttpServletRequest rq) {
        return Optional.ofNullable(rq.getHeader(AUTH_HEADER))
                .filter(h -> h.startsWith(BEARER))
                .map(h -> h.substring(BEARER.length()));
    }

    @Override
    protected void doFilterInternal(@NonNull HttpServletRequest rq,
                                    @NonNull HttpServletResponse rs,
                                    @NonNull FilterChain filterChain) throws ServletException, IOException {

        Optional<String> token = extractTokenFromRequest(rq);

        if (token.isPresent()) {
            Optional<Integer> userId = Optional.empty();

            try {
                userId = tokenService.parseToken(token.get());
            } catch (Exception ex) {
                log.error("Cannot parse jwt token: {}", ex.getMessage());
            }

            userId.flatMap(id -> userService.findById(Long.valueOf(id))
                    .map(JwtUserDetails::new)
                    .map(jwtUD -> new UsernamePasswordAuthenticationToken(jwtUD, null, jwtUD.getAuthorities()))).ifPresent(at -> {
                at.setDetails(new WebAuthenticationDetailsSource().buildDetails(rq));
                SecurityContextHolder.getContext().setAuthentication(at);
            });
        }

        filterChain.doFilter(rq, rs);
    }
}
