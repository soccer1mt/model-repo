import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import Badge from '@material-ui/core/Badge';
import ShoppingCartIcon from '@material-ui/icons/ShoppingCart';
import IconButton from '@material-ui/core/IconButton';


const styles = theme => ({
  root:{
    height: 10,
    padding:5
  },
  badge: {
    top: '5%',
    right: '-20px',
  },
});


class BadgeVisibility extends React.Component {


  handleClick = () => {
    this.props.clicked();
  }


  render() {
    const { classes } = this.props;
    return (
      <div onClick={this.handleClick}>
        <IconButton aria-label="Cart">
          <Badge 
            badgeContent={this.props.numItems} 
            color="primary" 
            classes={{ 
              badge: classes.badge}}
            invisible={this.props.showBadge}>
            <ShoppingCartIcon />
          </Badge>
        </IconButton>
      </div>
    );
  }
}

BadgeVisibility.propTypes = {
  classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(BadgeVisibility);