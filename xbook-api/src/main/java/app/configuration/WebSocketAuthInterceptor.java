package app.configuration;

import app.security.JwtTokenService;
import app.security.JwtUserDetails;
import app.service.UserService;
import jakarta.validation.constraints.NotNull;
import lombok.extern.log4j.Log4j2;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.messaging.Message;
import org.springframework.messaging.MessageChannel;
import org.springframework.messaging.simp.stomp.StompCommand;
import org.springframework.messaging.simp.stomp.StompHeaderAccessor;
import org.springframework.messaging.support.ChannelInterceptor;
import org.springframework.messaging.support.MessageHeaderAccessor;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.stereotype.Component;

import java.security.Principal;
import java.util.Optional;

@Log4j2
@Component
public class WebSocketAuthInterceptor implements ChannelInterceptor {
    @Autowired
    JwtTokenService jwtService;
    @Autowired
    private UserService userService;

    @Override
    public Message<?> preSend(@NotNull Message<?> message, @NotNull MessageChannel channel) {
//        System.out.println("\nMessage<?> preSend WORKS!!!");

        StompHeaderAccessor accessor = MessageHeaderAccessor.getAccessor(message, StompHeaderAccessor.class);
        assert accessor != null;
        final StompCommand cmd = accessor.getCommand();
        if (StompCommand.CONNECT.equals(cmd) || StompCommand.SEND.equals(cmd) || StompCommand.SUBSCRIBE.equals(cmd)) {
            String requestTokenHeader = accessor.getFirstNativeHeader("Authorization");
            if (requestTokenHeader != null && requestTokenHeader.startsWith("Bearer")) {
                String token = requestTokenHeader.substring(7);
                authenticateUser(token).ifPresentOrElse(accessor::setUser, () -> {
                    throw new RuntimeException("User is unauthorized!");
                });
            }
        }
        return message;
    }

    private Optional<Principal> authenticateUser(String token){
//        System.out.println("\nOptional<Principal> authenticateUser WORKS!!!");
        Optional<Integer> maybeUserId = jwtService.parseToken(token);

        maybeUserId.flatMap(id -> userService.findById(Long.valueOf(id))
                        .map(JwtUserDetails::new)
                        .map(jwtUD -> new UsernamePasswordAuthenticationToken(jwtUD, null, jwtUD.getAuthorities())))
                .ifPresentOrElse(at -> SecurityContextHolder.getContext().setAuthentication(at), () -> log.error("Failed to process authentication in websocket!"));
        return Optional.of(SecurityContextHolder.getContext().getAuthentication());
    }
}
