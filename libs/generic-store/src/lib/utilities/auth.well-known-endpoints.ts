export class AuthWellKnownEndpoints {
  issuer = '';
  // tslint:disable-next-line:variable-name
  jwks_uri = '';
  // tslint:disable-next-line:variable-name
  authorization_endpoint = '';
  // tslint:disable-next-line:variable-name
  token_endpoint = '';
  // tslint:disable-next-line:variable-name
  userinfo_endpoint = '';
  // tslint:disable-next-line:variable-name
  end_session_endpoint = '';
  // tslint:disable-next-line:variable-name
  check_session_iframe = '';
  // tslint:disable-next-line:variable-name
  revocation_endpoint = '';
  // tslint:disable-next-line:variable-name
  introspection_endpoint = '';

  public setWellKnownEndpoints(data: any) {
    this.issuer = data.issuer;
    this.jwks_uri = data.jwks_uri;
    this.authorization_endpoint = data.authorization_endpoint;
    this.token_endpoint = data.token_endpoint;
    this.userinfo_endpoint = data.userinfo_endpoint;

    if (data.end_session_endpoint) {
      this.end_session_endpoint = data.end_session_endpoint;
    }

    if (data.check_session_iframe) {
      this.check_session_iframe = data.check_session_iframe;
    }

    if (data.revocation_endpoint) {
      this.revocation_endpoint = data.revocation_endpoint;
    }

    if (data.introspection_endpoint) {
      this.introspection_endpoint = data.introspection_endpoint;
    }
  }
}
