/*
 * Click nbfs://nbhost/SystemFileSystem/Templates/Licenses/license-default.txt to change this license
 * Click nbfs://nbhost/SystemFileSystem/Templates/Classes/Class.java to edit this template
 */
package com.opalmp3;
/**
 *
 * @author avinashpandey
 */
import java.util.List;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.ComponentScan;
import org.springframework.context.annotation.Configuration;
import org.springframework.http.converter.HttpMessageConverter;
import org.springframework.http.converter.json.MappingJackson2HttpMessageConverter;
import org.springframework.web.servlet.config.annotation.EnableWebMvc;
import org.springframework.web.servlet.config.annotation.WebMvcConfigurerAdapter;
import org.springframework.web.servlet.view.InternalResourceViewResolver;

/**
 *
 * @author avinashpandey
 */
@EnableWebMvc
@Configuration
@ComponentScan(basePackages = "com.opalmp3")
public class WebConfig extends WebMvcConfigurerAdapter {
    
    private static final String PREFIX = "/WEB-INF/view/";
    private static final String SUFFIX = ".jsp";
    
    @Bean
    public InternalResourceViewResolver jspResourceViewResolver() {
        InternalResourceViewResolver internalResourceViewResolver = new InternalResourceViewResolver();
        internalResourceViewResolver.setPrefix(PREFIX);
        internalResourceViewResolver.setSuffix(SUFFIX);
        return internalResourceViewResolver;
    }
    @Override
    public void configureMessageConverters(List<HttpMessageConverter<?>> converters) {
    converters.add(new MappingJackson2HttpMessageConverter());
    }

//   @Override
//   public void addViewControllers(ViewControllerRegistry registry) {
//      registry.addViewController("/").setViewName("index");
//   }
   
//   @Bean
//   public ViewResolver viewResolver() {
//      InternalResourceViewResolver bean = new InternalResourceViewResolver();
//
//      bean.setViewClass(JstlView.class);
//      bean.setPrefix("/WEB-INF/view/");
//      bean.setSuffix(".jsp");
//      return bean;
//   }
   
//   @Bean
//   public DataSource dataSource(){
//       DriverManagerDataSource ds = new DriverManagerDataSource();
//       ds.setDriverClassName("com.mysql.cj.jdbc.Driver");
//       ds.setUrl("jdbc:mysql://localhost:3306/opalmp3?useSSL=false&serverTimezone=UTC");
//       ds.setUsername("root");
//       ds.setPassword("opalbpm@1234");
//       return ds;
//   }
//   
//    @Bean
//    public JdbcTemplate jdbcTemplate(DataSource ds) {
//        return new JdbcTemplate(ds);
//    }
    
    
    // Implemented Abstract Methods
//    @Override
//    public MessageCodesResolver getMessageCodesResolver() {
//    return null;
//    }
//    
//    @Override
//    public Validator getValidator() {
//        // No custom validation
//        return null;
//    }
//
//    @Override
//    public void extendHandlerExceptionResolvers(List<HandlerExceptionResolver> exceptionResolvers) {
//        
//    }
//
//    @Override
//    public void configurePathMatch(PathMatchConfigurer arg0) {
//    }
//
//    @Override
//    public void configureContentNegotiation(ContentNegotiationConfigurer arg0) {
//    }
//
//    @Override
//    public void configureAsyncSupport(AsyncSupportConfigurer arg0) {
//    }
//
//    @Override
//    public void configureDefaultServletHandling(DefaultServletHandlerConfigurer arg0) {
//    }
//
//    @Override
//    public void addFormatters(FormatterRegistry arg0) {
//    }
//
//    @Override
//    public void addInterceptors(InterceptorRegistry arg0) {
//    }
//
//    @Override
//    public void addResourceHandlers(ResourceHandlerRegistry arg0) {
//    }
//
//    @Override
//    public void addCorsMappings(CorsRegistry arg0) {
//    }
//
//    @Override
//    public void configureViewResolvers(ViewResolverRegistry arg0) {
//    }
//
//    @Override
//    public void addArgumentResolvers(List<HandlerMethodArgumentResolver> arg0) {
//    }
//
//    @Override
//    public void addReturnValueHandlers(List<HandlerMethodReturnValueHandler> arg0) {
//
//    }
//
//    @Override
//    public void configureMessageConverters(List<HttpMessageConverter<?>> arg0) {
//    }
//
//    @Override
//    public void extendMessageConverters(List<HttpMessageConverter<?>> arg0) {
//    }
//
//    @Override
//    public void configureHandlerExceptionResolvers(List<HandlerExceptionResolver> arg0) {
//    }

//    @Override
//    public void addViewControllers(ViewControllerRegistry arg0) {
//        throw new UnsupportedOperationException("Not supported yet."); //To change body of generated methods, choose Tools | Templates.
//    }

}
