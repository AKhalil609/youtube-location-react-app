import React, { Component } from "react";
import { withStyles } from "@material-ui/core/styles";
import { ThemeProvider } from "@material-ui/styles";
import CssBaseline from "@material-ui/core/CssBaseline";
import Hidden from "@material-ui/core/Hidden";
import Navigator from "./Navigator";
import Header from "./Header";
import search from "youtube-search";
import Grid from "./Grid";
import Typography from "@material-ui/core/Typography";
import { styles, theme } from "./style";
import Maps from "./Maps";

/**
 * This is the root component that combines all components together and has the state of the app
 *
 * @class index
 * @extends {Component}
 */
class index extends Component {
  constructor(props) {
    super(props);
    this.state = {
      mobileOpen: false,
      setMobileOpen: false,
      loading: true,
      videos: [],
      lat: 30.0444,
      lng: 31.2357
    };
  }
  handleDrawerToggle = () => {
    this.setState({ mobileOpen: !this.state.mobileOpen });
  };
  /**
   * This function is responsible for requesting youtube videos from the youtube api
   * and uses the state lat and lng to filter the results
   *
   * @memberof index
   */
  getVideos = async () => {
    await this.setState({ loading: true });
    var opts = {
      maxResults: 20,
      location: `${this.state.lat},${this.state.lng}`,
      locationRadius: "1000km",
      part:"snippet",
      type: "video",
      key: "AIzaSyBOy5c8bsrLZwYSlVo0U4b3wQiDsqosNr8"
    };

    search("jsconf", opts, async (err, results) => {
      if (err) return console.log(err);
      await this.setState({ videos: results });
      await this.setState({ loading: false });
    });
  };

  /**
   * Changes the lat and lng state with the user clicks on the map
   *
   * @memberof index
   */
  changeLocation = async e => {
    await this.setState({ lat: e.lat, lng: e.lng });
    await this.getVideos();
  };

  /**
   * lifecycle method that runs the getVides function after the component is mounted
   *
   * @memberof index
   */
  componentDidMount() {
    this.getVideos();
  }

  render() {
    const { classes } = this.props;

    return (
      <ThemeProvider theme={theme}>
        <div className={classes.root}>
          <CssBaseline />
          <nav className={classes.drawer}>
            <Hidden smUp implementation="js">
              <Navigator
                PaperProps={{ style: { width: 256 } }}
                variant="temporary"
                open={this.state.mobileOpen}
                onClose={this.handleDrawerToggle}
              />
            </Hidden>
            <Hidden xsDown implementation="css">
              <Navigator PaperProps={{ style: { width: 256 } }} />
            </Hidden>
          </nav>
          <div className={classes.appContent}>
            <Header onDrawerToggle={this.handleDrawerToggle} />
            <Typography color="inherit" variant="h6" component="h6">
              This web application is used to list youtube videos based on the
              location specified on the map
            </Typography>
            <Typography color="inherit" variant="h6" component="h6">
              Please click on any location on the map to try it
            </Typography>
            <main className={classes.mainContent}>
              <Grid videos={this.state.videos} loading={this.state.loading} />

              <Maps
                location={{ lat: this.state.lat, lng: this.state.lng }}
                changeLocation={this.changeLocation}
              />
            </main>
          </div>
        </div>
      </ThemeProvider>
    );
  }
}

export default withStyles(styles)(index);
