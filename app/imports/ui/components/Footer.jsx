import React from 'react';
import { Grid } from 'semantic-ui-react';
import { NavLink } from 'react-router-dom';

/** The Footer appears at the bottom of every page. Rendered by the App Layout component. */
class Footer extends React.Component {
  render() {
    const divStyle = { paddingTop: '15px' };
    return (
      <footer>
        <div style={divStyle} className="ui center aligned container">
          <hr />
          <Grid columns={2} divided>
            <Grid.Row>
            </Grid.Row>
            <Grid.Row>
              <Grid.Column>
              Department of Information and Computer Sciences <br />
              University of Hawaii<br />
              Honolulu, HI 96822 <br />
                <a href="https://github.com/bug-catchers">Home Page</a>
              </Grid.Column>
              <Grid.Column>
                Developer<br/>
                <a href="https://chakhon.github.io/">Chak Hon Lam</a>
                <br/>
                <a href="https://ianbm.github.io/">Ian Manzano</a>
                <br/>
                <a href="https://shengt-jin.github.io/">Shengtong Jin</a>
                <br/>
                <a href="https://sulao1999.github.io/">Su Lao</a>
                <br/>
              </Grid.Column>
            </Grid.Row>
          </Grid>
          <NavLink exact to="/feedback">Send us your feedback</NavLink>
        </div>
      </footer>
    );
  }
}

export default Footer;
