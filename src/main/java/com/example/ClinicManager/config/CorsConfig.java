package com.example.ClinicManager.config;

import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.web.servlet.config.annotation.CorsRegistry;
import org.springframework.web.servlet.config.annotation.WebMvcConfigurer;

@Configuration
public class CorsConfig {

    @Bean
    public WebMvcConfigurer corsConfigurer() {
        return new WebMvcConfigurer() {
            @Override
            public void addCorsMappings(CorsRegistry registry) {
                registry.addMapping("/**")          // все URL
                        .allowedOrigins("http://localhost:3000") // фронт
                        .allowedMethods("GET", "POST", "PUT", "DELETE") // разрешённые методы
                        .allowedHeaders("*");       // разрешены все заголовки
            }
        };
    }
}

