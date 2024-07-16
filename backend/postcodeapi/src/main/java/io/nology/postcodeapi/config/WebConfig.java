package io.nology.postcodeapi.config;

import org.springframework.context.annotation.Configuration;
import org.springframework.web.servlet.config.annotation.CorsRegistry;
import org.springframework.web.servlet.config.annotation.WebMvcConfigurer;

@Configuration
public class WebConfig implements WebMvcConfigurer {

  public void addCorsMappings(CorsRegistry registry) {

    String[] allowedOrigins = { "http://localhost:5173/", "http://localhost:5174/", "http://localhost:5175/",
        "http://localhost:5176/", "http://127.0.0.1:5173/", "http://127.0.0.1:5174/",
        "https://octopus-app-cr8az.ondigitalocean.app/", "https://tangerine-mermaid-99ad73.netlify.app/",
        "https://postcodeapi.netlify.app/" };

    registry.addMapping("/**").allowedOrigins(allowedOrigins).allowedMethods("GET", "POST", "DELETE", "PATCH")
        .allowedHeaders("*");
  }

}
