package app.configuration.cache;

import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;

import java.util.concurrent.TimeUnit;

@Configuration
public class CacheStoreBeans {

    @Bean
    public CacheStore<String> resetPasswordTokenCache() {
        return new CacheStore<String>(10, TimeUnit.MINUTES);
    }

}