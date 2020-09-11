import React from 'react';
import { connect } from 'react-redux';
import { Card } from 'antd';
import {
  getLoadingStatus,
  getClientId,
  getRedirectUri,
  getProxyUrl,
  getLoginError,
} from '../../store/selectors/login';
import { login, setUserRoles } from '../../store/actions/login';
import LoginSelect from './login-select';
import LoginButton from './login-button';
import './github-login.scss';

class GithubLogin extends React.PureComponent {
  state = {
    roles: ['author', 'student', 'supervisor', 'course_manager'],
  };

  componentDidMount() {
    const url = window.location.href;
    const hasCode = url.includes('?code=');

    if (hasCode) {
      const newUrl = url.split('?code=');
      const { clientId, redirectUri, proxyUrl, login } = this.props;
      const requestData = {
        client_id: clientId,
        redirect_uri: redirectUri,
        code: newUrl[1],
      };
      window.history.pushState({}, null, newUrl[0]);
      login(requestData, proxyUrl);
    }
  }

  handleChooseRoles = (value) => {
    const { setUserRoles } = this.props;
    setUserRoles(value);
  };

  renderLoginForm = () => {
    const { roles } = this.state;
    const { clientId, redirectUri, error } = this.props;
    return (
      <div role="main" className="login">
        <Card
          style={{ width: '320px' }}
          cover={error ? <span role="textbox" style={{ color: "red" }}>{error}</span> : null}
          actions={[<LoginButton clientId={clientId} redirectUri={redirectUri} />]}
        >
          <Card.Meta
            title="Please login via GitHub"
            description="In order to access the App, you need to login with your GitHub account. If you login first time, please choose your role(s)."
          />
          <br />
          <LoginSelect roles={roles} change={this.handleChooseRoles} />
        </Card>
      </div>
    );
  };

  render() {
    const { loading } = this.props;
    if (loading) {
      return <div role="textbox" style={{ width: '100%', height: '100vh' }}>Loading...</div>;
    }
    return this.renderLoginForm();
  }
}

const mapStateToProps = (state) => ({
  loading: getLoadingStatus(state),
  clientId: getClientId(state),
  redirectUri: getRedirectUri(state),
  proxyUrl: getProxyUrl(state),
  error: getLoginError(state),
});

const mapDispatchToProps = (dispatch) => ({
  login: (requestData, proxyUrl) => dispatch(login(requestData, proxyUrl)),
  setUserRoles: (roles) => dispatch(setUserRoles(roles)),
});

export default connect(mapStateToProps, mapDispatchToProps)(GithubLogin);
