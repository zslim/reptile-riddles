package com.codecool.quizzzz.security.authmodel;

import org.springframework.security.authentication.AbstractAuthenticationToken;
import org.springframework.security.core.GrantedAuthority;

import java.util.Collection;

public class AuthenticationModel extends AbstractAuthenticationToken {
  private final Object principal;
  private Object credentials;

  public AuthenticationModel(Object principal, Collection<? extends GrantedAuthority> authorities, Object credentials) {
    super(authorities);
    this.principal = principal;
    this.credentials = credentials;
  }

  public AuthenticationModel(Object principal, Collection<? extends GrantedAuthority> authorities) {
    super(authorities);
    this.principal = principal;
  }

  @Override
  public Object getCredentials() {
    return credentials;
  }

  @Override
  public Object getPrincipal() {
    return principal;
  }
}
