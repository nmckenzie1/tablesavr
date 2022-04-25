package com.teksystems.capstonebackendsboot.database.entity;

import com.fasterxml.jackson.annotation.JsonIgnore;
import com.fasterxml.jackson.annotation.JsonManagedReference;
import lombok.*;
import org.springframework.security.core.GrantedAuthority;
import org.springframework.security.core.userdetails.UserDetails;

import javax.persistence.*;
import javax.validation.constraints.Email;
import javax.validation.constraints.NotEmpty;
import java.util.Collection;
import java.util.Date;
import java.util.Set;

@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@Builder
@Entity

public class User implements UserDetails {
    @Id
    @Column(nullable = false, unique = true)
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    long userID;
    @Email( message = "Please enter a valid e-mail")
    @NotEmpty(message = "Please enter a valid e-mail")
    @Column(length = 50, nullable = false, unique = true)
    String username;
    @NotEmpty(message = "Please enter a valid First Name")
    @Column(length = 50, nullable = false)
    String firstName;
    @NotEmpty(message = "Please enter a valid Last Name")
    @Column(length = 50, nullable = false)
    String lastName;
    @Column(length = 100, nullable = false)
    String password;
    @OneToMany(cascade = CascadeType.ALL, mappedBy = "user",fetch = FetchType.EAGER)
    @JsonManagedReference(value = "reservations")
    Set<Reservation> reservations;
    @OneToMany(cascade = CascadeType.ALL, mappedBy = "user")
    @JsonManagedReference (value = "user_restaurants")
    private Set<User_Restaurant> userRestaurants;
    @ManyToMany(fetch = FetchType.EAGER, cascade = CascadeType.ALL)
    @JoinTable(name = "USER_ROLES",
            joinColumns = {
                    @JoinColumn(name = "USER_ID")
            },
            inverseJoinColumns = {
                    @JoinColumn(name = "ROLE_ID") })
    private Set<Role> roles;



    @Transient
    private String confirmPassword;

    private Date createdAt;
    private Date updatedAt;
    @PrePersist
    protected void onCreate() {this.createdAt = new Date();}
    @PreUpdate
    protected void onUpdate() {this.updatedAt = new Date();}

    @Override
    @JsonIgnore
    public Collection<? extends GrantedAuthority> getAuthorities() {
        return null;
    }


    @Override
    @JsonIgnore
    public boolean isAccountNonExpired() {
        return true;
    }

    @Override
    @JsonIgnore
    public boolean isAccountNonLocked() {
        return true;
    }

    @Override
    @JsonIgnore
    public boolean isCredentialsNonExpired() {
        return true;
    }

    @Override
    @JsonIgnore
    public boolean isEnabled() {
        return true;
    }
}
