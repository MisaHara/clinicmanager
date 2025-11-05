package com.example.ClinicManager.service;

import org.springframework.security.crypto.password.PasswordEncoder;
import com.example.ClinicManager.model.User;
import com.example.ClinicManager.repository.UserRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.stereotype.Service;

@Service
@RequiredArgsConstructor
public class UserService implements UserDetailsService {

    private final UserRepository userRepository;
    private final PasswordEncoder passwordEncoder;

    // для регистрации
    public User saveUser(User user) {
        user.setPassword(passwordEncoder.encode(user.getPassword())); // шифрование
        return userRepository.save(user);
    }

    // поиск по username
    public User findByUsername(String username) {
        return userRepository.findByUsername(username)
                .orElseThrow(() -> new UsernameNotFoundException("Пользователь не найден"));
    }

    // для Spring Security
    @Override
    public UserDetails loadUserByUsername(String username) throws UsernameNotFoundException {
        return findByUsername(username);
    }
}
