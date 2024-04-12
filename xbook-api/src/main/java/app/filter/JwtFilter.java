package app.filter;

import app.configuration.JwtUserDetails;
import app.service.JwtTokenService;
import jakarta.servlet.FilterChain;
import jakarta.servlet.ServletException;
import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpServletResponse;
import lombok.NonNull;
import lombok.RequiredArgsConstructor;
import lombok.extern.log4j.Log4j2;
import org.springframework.http.HttpHeaders;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.context.SecurityContext;
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
    // Prefix "Bearer" before token is standard to discern
    // access token from other tokens
    private static final String BEARER = "Bearer ";
    private static final String AUTH_HEADER = HttpHeaders.AUTHORIZATION;
    private final JwtTokenService tokenService;

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
                log.error(ex.getMessage());
            }

            if (userId.isPresent()) {
                JwtUserDetails jwtUserDetails = new JwtUserDetails(userId.get());

                SecurityContext context = SecurityContextHolder.createEmptyContext();

                UsernamePasswordAuthenticationToken authToken = new UsernamePasswordAuthenticationToken(
                        jwtUserDetails,
                        null,
                        jwtUserDetails.getAuthorities()
                );

                authToken.setDetails(new WebAuthenticationDetailsSource().buildDetails(rq));
                context.setAuthentication(authToken);
                SecurityContextHolder.setContext(context);
            }
        }

        filterChain.doFilter(rq, rs);
    }
}
