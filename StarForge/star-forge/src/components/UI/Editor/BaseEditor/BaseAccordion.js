import React, {Component} from 'react';

import { withStyles } from '@material-ui/core/styles';
import ExpansionPanel from '@material-ui/core/ExpansionPanel';
import ExpansionPanelSummary from '@material-ui/core/ExpansionPanelSummary';
import Typography from '@material-ui/core/Typography';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';
import cssClasses from './BaseAccordion.css';

import BaseGridList from './GridLists/BaseGridList/GridList';
import ItemsGridList from './GridLists/ItemsGridList/GridList';
import PetsGridList from './GridLists/PetsGridList/GridList';


class ItemsAccordion extends Component {
    state = {
      expanded: null,
    };

    handleChange = panel => (event, expanded) => {
      this.setState({
        expanded: expanded ? panel : false,
      });
    };




  render() {
    const { classes } = this.props;
    const { expanded } = this.state;

    return (
      <div className={classes.root}>
          <div>
            <ExpansionPanel expanded={expanded === 'panel1'} onChange={this.handleChange('panel1')}>
              <ExpansionPanelSummary
                  classes={{
                    root: classes.heading, // class name, e.g. `classes-nesting-root-x`
                    expanded: classes.headingExpanded,
                    expandIcon: classes.expandIcon
                    }}
                expandIcon={<ExpandMoreIcon className={classes.typography} />}>
                <Typography 
                  className={classes.typography}
                  align="center">
                  Base
                </Typography>
              </ExpansionPanelSummary>
                  <BaseGridList state={this.props.state} updateSelection={this.props.updateSelection}/>
            </ExpansionPanel>
        </div>

         <div className={cssClasses.Accordion}>
            <ExpansionPanel expanded={expanded === 'panel2'} onChange={this.handleChange('panel2')}>
              <ExpansionPanelSummary
                  classes={{
                    root: classes.heading, // class name, e.g. `classes-nesting-root-x`
                    expanded: classes.headingExpanded, // class name, e.g. `classes-nesting-label-x`
                    expandIcon: classes.expandIcon
                    }}
                expandIcon={<ExpandMoreIcon className={classes.typography} />}>
                <Typography className={classes.typography}>
                  Items
                </Typography>
              </ExpansionPanelSummary>
                  <ItemsGridList state={this.props.state} updateSelection={this.props.updateSelection}/>
            </ExpansionPanel>
        </div>

        <div className={cssClasses.Accordion}>
            <ExpansionPanel expanded={expanded === 'panel3'} onChange={this.handleChange('panel3')}>
              <ExpansionPanelSummary
                  classes={{
                    root: classes.heading,
                    expanded: classes.headingExpanded, 
                    expandIcon: classes.expandIcon
                    }}
                expandIcon={<ExpandMoreIcon className={classes.typography} />}>
                <Typography 
                  classes={{
                    root: classes.typography, // class name, e.g. `classes-nesting-root-x`
                    }}>
                    Pets
                </Typography>
              </ExpansionPanelSummary>
                  <PetsGridList state={this.props.state} updateSelection={this.props.updateSelection}/>
            </ExpansionPanel>
        </div>
      </div>
    );
  }
}

const styles = theme => ({
  root: {
    height: 70,
    width: '30%',
    borderRadius: "10px",
    opacity: .8,
  },
  heading: {
      '&:hover': {
        backgroundColor: '#FFA500',
      },
    border: 'solid',
    height: '2rem',
    borderRadius: '10',
    backgroundColor: '#06437A',
    fontSize: theme.typography.pxToRem(15),
    flexBasis: '33.33%',
    flexShrink: 0,
    minHeight: '2rem',
  },
  headingExpanded: {
    backgroundColor: '#FFA500',
    fontSize: theme.typography.pxToRem(15),
    flexBasis: '33.33%',
    flexShrink: 0,
  },
  typography: {
    margin: 0,
    opacity: 1,
    fontWeight: 'normal',
    color: 'white',
  },
  expandIcon: {
    backgroundColor: 'transparent',
    height: '.25rem',
  }
});



export default withStyles(styles)(ItemsAccordion);
