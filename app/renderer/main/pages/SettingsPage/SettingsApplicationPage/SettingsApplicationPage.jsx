// Container Core
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';

// Container Actions
import * as SystemActions from 'app/shared/actions/system';

// Component Core
import React from 'react';

// Styles
import classNames from 'classnames';
import classes from 'app/renderer/main/pages/ProjectPage/ProjectSettingsPage/ProjectSettingsPage.css'

// Sub Components
import { Field } from 'react-redux-form';
import { Link } from 'react-router';
import Toggle from 'app/renderer/main/components/Input/Toggle/Toggle'
import Button from 'app/renderer/main/components/Buttons/Button/Button.jsx'
import FileSelectInputElectron from 'app/renderer/main/modules/FileSelectInput/FileSelectInputElectron.jsx'

///////////////////////////////// COMPONENT /////////////////////////////////

export const Component = React.createClass({
  render() {
    const { system } = this.props;
    return (
      <div className="layout-column flex">
        <div style={{width: '600px'}}>
          <div className={classes.panel}>
            <h3>Privacy</h3>
            <p>Help us improve by sending anonymous usage data</p>

          </div>
          <div className={classes.panel}>
            <h3>Cloud file store integrations</h3>
            <p>STEMN integrates with your existing cloud providers such as Dropbox, Drive and OneDrive.</p>
            {Object.keys(system.providerPath).map( key =>
              <div key={key} style={{marginBottom: '10px'}}>
                <FileSelectInputElectron
                  model={`system.providerPath.${key}`}
                  value={system.providerPath[key]}
                />
              </div>
            )}
          </div>
        </div>
      </div>
    );
  }
});

//            <Toggle model="settings.privacy" value={this.props.settings.privacy} />

///////////////////////////////// CONTAINER /////////////////////////////////

function mapStateToProps({users, system}, {params}) {
  return {
    system,
  };
}

function mapDispatchToProps(dispatch) {
  return {
    SystemActions: bindActionCreators(SystemActions, dispatch),
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(Component);
