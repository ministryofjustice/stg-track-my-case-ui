import ClientConfiguration from './@types/types/client-configuration.js'
import { UserIdentityClaim } from './@types/types/user-info.js'
import * as openidClient from 'openid-client'
import DIDKeySet from './@types/types/did-keyset.js'

export class OneLoginConfig {
  private static instance: OneLoginConfig

  private clientConfiguration: ClientConfiguration

  private constructor() {
    this.clientConfiguration = {
      nodeEnv: process.env.NODE_ENV || 'development',
      clientId: process.env.OIDC_CLIENT_ID ?? '',
      privateKey: process.env.OIDC_PRIVATE_KEY ?? '',
      clientSecret: process.env.OIDC_CLIENT_SECRET ?? '',
      issuer: process.env.OIDC_ISSUER ?? 'https://oidc.integration.account.gov.uk/',
      discoveryUrl: process.env.OIDC_ISSUER
        ? process.env.OIDC_ISSUER + '/.well-known/openid-configuration'
        : 'https://oidc.integration.account.gov.uk/.well-known/openid-configuration',
      ivIssuer: process.env.IV_ISSUER ?? '',
      ivDidUri: process.env.IV_DID_URI ?? '',
      scopes: process.env.OIDC_SCOPES ? process.env.OIDC_SCOPES.split(',') : ['openid', 'email', 'phone'],
      authorizeRedirectUrl: process.env.OIDC_AUTHORIZE_REDIRECT_URL ?? '',
      postLogoutRedirectUrl: process.env.OIDC_POST_LOGOUT_REDIRECT_URL ?? '',
      claims: process.env.OIDC_CLAIMS
        ? (process.env.OIDC_CLAIMS.split(',') as UserIdentityClaim[])
        : ['https://vocab.account.gov.uk/v1/coreIdentityJWT'],
      tokenAuthMethod: process.env.OIDC_TOKEN_AUTH_METHOD ?? 'private_key_jwt',
      authenticationVtr: process.env.AUTH_VECTOR_OF_TRUST ?? 'Cl.Cm',
      identityVtr: process.env.IDENTITY_VECTOR_OF_TRUST ?? 'Cl.Cm.P2',
      uiLocales: process.env.UI_LOCALES ?? 'en',
      serviceUrl: process.env.SERVICE_URL ?? '',
      immediateRedirect: process.env.IMMEDIATE_REDIRECT === 'true',
      requireJAR: process.env.REQUIRE_JAR === 'true',
      identitySupported: process.env.IDENTITY_SUPPORTED === 'true',
    }
  }

  public static getInstance(): OneLoginConfig {
    if (!OneLoginConfig.instance) {
      OneLoginConfig.instance = new OneLoginConfig()
    }
    return OneLoginConfig.instance
  }

  public static resetInstance(): void {
    OneLoginConfig.instance = new OneLoginConfig()
  }

  public getNodeEnv(): string {
    return this.clientConfiguration.nodeEnv!
  }

  public getClientId(): string {
    return this.clientConfiguration.clientId!
  }

  public getPrivateKey(): string {
    return this.clientConfiguration.privateKey!
  }

  public getClientSecret(): string {
    return this.clientConfiguration.clientSecret!
  }

  public getIssuer(): string {
    return this.clientConfiguration.issuer!
  }

  public getDiscoveryUrl(): string {
    return this.clientConfiguration.discoveryUrl!
  }

  public getIvIssuer(): string {
    return this.clientConfiguration.ivIssuer!
  }

  public getIvDidUri(): string {
    return this.clientConfiguration.ivDidUri!
  }

  public getIvPublicKeys(): DIDKeySet[] {
    return this.clientConfiguration.ivPublicKeys
  }

  public setIvPublicKeys(ivPublicKeys: DIDKeySet[]): void {
    this.clientConfiguration.ivPublicKeys = ivPublicKeys
  }

  public getScopes(): string[] {
    return this.clientConfiguration.scopes!
  }

  public getAuthorizeRedirectUrl(): string {
    let authorizeRedirectUrl = this.clientConfiguration.authorizeRedirectUrl
    if (authorizeRedirectUrl.includes(':port')) {
      return authorizeRedirectUrl.replace('port', process.env.NODE_PORT || '9999')
    } else {
      return authorizeRedirectUrl
    }
  }

  public getPostLogoutRedirectUrl(): string {
    let postLogoutRedirectUrl = this.clientConfiguration.postLogoutRedirectUrl
    if (postLogoutRedirectUrl.includes(':port')) {
      return postLogoutRedirectUrl.replace('port', process.env.NODE_PORT || '9999')
    } else {
      return postLogoutRedirectUrl
    }
  }

  public getClaims(): UserIdentityClaim[] {
    return this.clientConfiguration.claims!
  }

  public getTokenAuthMethod(): string {
    return this.clientConfiguration.tokenAuthMethod!
  }

  public getAuthenticationVtr(): string {
    return this.clientConfiguration.authenticationVtr!
  }

  public getIdentityVtr(): string {
    return this.clientConfiguration.identityVtr!
  }

  public getUiLocales(): string {
    return this.clientConfiguration.uiLocales!
  }

  public getServiceUrl(): string {
    let serviceUrl = this.clientConfiguration.serviceUrl
    if (serviceUrl.includes(':port')) {
      return serviceUrl.replace('port', process.env.NODE_PORT || '9999')
    } else {
      return serviceUrl
    }
  }

  public getSignOutLink(): string {
    return this.getServiceUrl() + '/oidc/logout'
  }

  public getOpenidClientConfiguration(): openidClient.Configuration {
    return this.clientConfiguration.openidClientConfiguration!
  }

  public setOpenidClientConfiguration(openidClientConfiguration: openidClient.Configuration): void {
    this.clientConfiguration.openidClientConfiguration = openidClientConfiguration
  }

  public getImmediateRedirect(): boolean {
    return this.clientConfiguration.immediateRedirect
  }

  public getRequireJAR(): boolean {
    return this.clientConfiguration.requireJAR
  }

  public getIdentitySupported(): boolean {
    return this.clientConfiguration.identitySupported
  }
}
