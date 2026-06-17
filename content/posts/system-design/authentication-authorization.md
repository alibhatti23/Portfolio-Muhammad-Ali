---
title: Authentication and Authorization
draft: false
date: 2026-04-28
description: "How systems verify identity and control access - JWT, OAuth2, session vs token, RBAC vs ABAC, SSO, and the security decisions that protect real applications."
categories:
  - system-design
tags:
  - system-design
  - web
  - system-design
keywords:
  - authentication authorization
  - JWT JSON Web Token
  - OAuth2
  - session vs token auth
  - RBAC vs ABAC
  - single sign on SSO
  - access control
  - system design fundamentals
Author: Ahmad Hassan
---

Authentication answers the question: who are you? Authorization answers the question: what are you allowed to do? They are often confused but they serve different purposes. Authentication verifies identity. Authorization enforces permissions. You can be authenticated as a user but not authorized to delete a database.

Let's start with authentication.

The simplest form is username and password. The user submits credentials. The server hashes the password and compares it to the stored hash. If they match, the user is authenticated. This is direct authentication and it works for small systems where the application manages credentials directly.

But direct authentication has scale problems. Every application must store passwords securely. Every application must implement password reset, account lockout, and multi factor authentication. Every application is a target for credential theft.

This is where identity providers come in. Instead of every application managing its own credentials, a centralized identity provider handles authentication. Google, GitHub, Facebook, and corporate systems like Okta and Auth0 all serve this role. Applications redirect users to the identity provider for login. The identity provider authenticates the user and sends back a token that the application trusts.

This is OAuth 2.0 in its most common use case. The user clicks "Sign in with Google." The application redirects to Google's login page. The user authenticates with Google. Google redirects back to the application with an authorization code. The application exchanges this code for an access token. The access token is proof that the user authenticated with Google and the application trusts it.

OAuth 2.0 was originally designed for authorization, not authentication. It lets a user grant a third party application limited access to their resources without sharing their password. But it has been widely adopted for authentication through the OpenID Connect layer, which adds a standardized identity token on top of OAuth 2.0.

The key flows in OAuth 2.0 are authorization code, client credentials, and implicit. The authorization code flow is the most secure for web applications. The client credentials flow is used for server to server communication where no user is involved. The implicit flow is deprecated because it exposes tokens in the URL.

Now let's talk about how authenticated state is maintained. After the user logs in, how does the server know who they are on subsequent requests?

Session based authentication stores state on the server. After login, the server creates a session record in a database or cache and sends the session ID to the client as a cookie. On every request, the client sends the cookie. The server looks up the session ID and retrieves the user's identity.

Sessions give the server full control. The server can invalidate a session immediately by deleting the record. The server can see all active sessions and end them. The server can store arbitrary session data. But sessions require server side storage, which becomes a problem at scale. If you have 10 million active sessions, you need a distributed cache like Redis to store them. Every request requires a cache lookup, adding latency.

Token based authentication stores state on the client. After login, the server creates a token, typically a JWT, and sends it to the client. The client stores the token and sends it with every request, usually in the Authorization header. The server validates the token without looking up a session store because the token contains all the necessary information.

A JWT has three parts: a header, a payload, and a signature. The header specifies the algorithm. The payload contains claims like user ID, roles, and expiration time. The signature is created by signing the header and payload with a secret key known only to the server. If anyone modifies the payload, the signature won't match and the token is rejected.

Tokens eliminate the need for server side session storage. They're stateless. Any server can validate a token without checking a database. This makes horizontal scaling trivial. But tokens have tradeoffs.

Tokens expire based on a timestamp. You cannot revoke a token before it expires unless you maintain a blacklist and check it on every request, which reintroduces server side state. If a token is stolen, the attacker has access until it expires. This is why access tokens should have short lifetimes, typically 15 minutes. A longer lived refresh token is used to obtain new access tokens, and refresh tokens are stored securely, usually in an HTTP only cookie.

Tokens can contain sensitive information. A JWT payload is base64 encoded, not encrypted. Anyone who intercepts the token can read the payload. Never put passwords or api keys in a JWT. Only include the minimum claims needed: user ID, roles, and expiration.

Now let's move to authorization. The user is authenticated. What can they do?

The simplest model is role based access control, or RBAC. Users are assigned roles. Roles are granted permissions. A user with the "admin" role can do everything. A user with the "viewer" role can only read. Authorization checks become simple: does this user's role include the required permission?

RBAC works well when permissions are relatively static and can be grouped into a small number of roles. Most applications have a handful of roles: admin, editor, viewer. The mapping is straightforward.

RBAC breaks down when permissions need fine-grained control or when they depend on context. Can a user edit a document? In RBAC, if they have the "editor" role, yes. But what if they should only edit documents they own? What if editors in department A can't edit documents in department B? What if a user can edit during business hours but not on weekends?

Attribute based access control, or ABAC, handles these cases. Instead of roles, permissions are granted based on attributes. Attributes can be about the user: their department, their seniority, their location. Attributes can be about the resource: the owner, the classification, the project. Attributes can be about the environment: the time of day, the IP address, the device type.

An ABAC policy might read: "Allow a user to edit a document if the user's department matches the document's department and the current time is within business hours and the user's device is registered."

ABAC is more flexible than RBAC but more complex to implement and reason about. Every permission check requires evaluating multiple attributes against multiple rules. Debugging why a user can't access a resource means tracing through the policy evaluation chain.

Most real systems use a hybrid. RBAC for broad role assignments. ABAC for contextual rules layered on top. A user with the "editor" role can generally edit documents, but ABAC rules restrict which documents and under what conditions.

Single sign on, or SSO, is the practice of authenticating once and gaining access to multiple systems. A user logs into the identity provider and receives a token that is accepted by all systems in the SSO domain. This is how enterprise systems work. You log in once in the morning and access email, HR systems, and internal tools without logging in again.

SSO implementations typically use SAML or OpenID Connect. SAML is an XML based protocol common in enterprise environments. OpenID Connect is built on OAuth 2.0 and is more common in modern web applications. Both provide the same core functionality: authenticate once, access everywhere.

The security of SSO depends on the identity provider. If it's compromised, every system in the SSO domain is compromised. This makes the identity provider a high value target. Protect it with multi factor authentication, strict access controls, and thorough monitoring.

A few practical security considerations.

Always hash passwords with a slow, modern algorithm. bcrypt, scrypt, or argon2. Never use MD5 or SHA1 for password hashing. Never store plaintext passwords. The hash should be salted with a unique random salt per user. A slow algorithm makes brute force attacks expensive.

Always use HTTPS. Tokens, session cookies, and passwords transmitted over plain HTTP can be intercepted. There is no excuse for plain HTTP in production.

Always use HTTP only and Secure flags on cookies. HTTP only prevents JavaScript from reading the cookie, protecting against XSS attacks. Secure ensures the cookie is only sent over HTTPS. SameSite=Lax or Strict prevents CSRF attacks.

Set reasonable expiration times. Access tokens: 15 minutes. Refresh tokens: 7 days. Sessions: 24 hours. The longer a token lives, the longer an attacker has if they steal it.

Rate limit authentication endpoints. Login, password reset, and registration endpoints should have strict rate limits to prevent brute force and credential stuffing attacks.

Authentication and authorization are not features you bolt on. They are architectural decisions that affect every part of your system. Choose session based auth for simplicity and immediate revocation. Choose token based auth for stateless scaling. Choose RBAC for simple permission models. Choose ABAC for contextual rules. Use SSO when you have multiple systems. And always, always hash your passwords.

Happy designing