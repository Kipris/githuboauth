import React from 'react';
import { connect } from 'react-redux';
import { getUser } from '../../store/selectors/login';

class Home extends React.PureComponent {
  render() {
    const { user } = this.props;
    return <h1>{user.login} - {user.name}</h1>
  }
}

const mapStateToProps = (state) => ({
  user: getUser(state),
});

export default connect(mapStateToProps)(Home);
