import React, { Component } from 'react'
import GridList from '@material-ui/core/GridList';
import GridListTile from '@material-ui/core/GridListTile';
import GridListTileBar from '@material-ui/core/GridListTileBar';
import IconButton from '@material-ui/core/IconButton';
import InfoIcon from '@material-ui/icons/Info';
import { withStyles } from '@material-ui/core/styles';
import styles from './style';


/**
 * Grid component that views the youtube videos in a gid list
 *
 * @class index
 * @extends {Component}
 */
class index extends Component {
    render() {
        const { classes } = this.props;
        
        return (
            <div className={classes.root}>
              <GridList cellHeight={180} className={classes.gridList}>
                <GridListTile key="Subheader" cols={2} style={{ height: 'auto' }}>
                </GridListTile>
                {this.props.loading? null : this.props.videos.map((video,index) => (
                  <GridListTile key={index}>
                    <img src={video.thumbnails.default.url} alt={video.thumbnails.medium.url} />
                    <a href={video.link} target="_blank" rel="noopener noreferrer">
                    <GridListTileBar
                      title={video.title}
                      subtitle={<span>by: {video.channelTitle}</span>}
                      actionIcon={
                        <IconButton aria-label={`info about ${video.title}`} className={classes.icon}>
                          <InfoIcon />
                        </IconButton>
                      }
                    />
                    </a>
                    
                  </GridListTile>
                ))}
              </GridList>
            </div>
          );
    }
}

export default withStyles(styles)(index);