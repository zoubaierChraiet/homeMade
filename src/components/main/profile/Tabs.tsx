import React from 'react';
import { makeStyles, Theme } from '@material-ui/core/styles';
import Tabs from '@material-ui/core/Tabs';
import Tab from '@material-ui/core/Tab';
import Typography from '@material-ui/core/Typography';
import Box from '@material-ui/core/Box';
import { Avatar } from '@material-ui/core';

import { MenuItem } from '../chief/MenuItem';
import { IDish, IUser } from '../../../domain/Domain';

interface TabPanelProps {
  children?: React.ReactNode;
  index: any;
  value: any;
}

function TabPanel(props: TabPanelProps) {
  const { children, value, index, ...other } = props;

  return (
    <div
      role="tabpanel"
      hidden={value !== index}
      id={`simple-tabpanel-${index}`}
      aria-labelledby={`simple-tab-${index}`}
      {...other}
    >
      {value === index && (
        <Box p={3}>
          <Typography>{children}</Typography>
        </Box>
      )}
    </div>
  );
}

function a11yProps(index: any) {
  return {
    id: `simple-tab-${index}`,
    'aria-controls': `simple-tabpanel-${index}`,
  };
}

const useStyles = makeStyles((theme: Theme) => ({
  root: {
    flexGrow: 1,
    backgroundColor: theme.palette.background.paper,
  },
}));

interface Iprops {
  profile: IUser | null;
  dishes: IDish[];
}

export const ProfileItems = ({ profile, dishes }: Iprops) => {
  const classes = useStyles();
  const [value, setValue] = React.useState(0);

  const handleChange = (event: React.ChangeEvent<{}>, newValue: number) => {
    setValue(newValue);
  };

  return (
    <div className={classes.root}>
      <Tabs
        value={value}
        onChange={handleChange}
        aria-label="simple tabs example"
      >
        <Tab label="Overview" {...a11yProps(0)} />
        <Tab label="Dishes" {...a11yProps(1)} />
      </Tabs>
      <TabPanel value={value} index={0}>
        <Avatar
          style={{
            width: '10rem',
            height: '10rem',
            borderColor: '#FFFFFF',
            borderStyle: 'solid',
            borderWidth: '2px',
          }}
          src={profile?.photo}
        />
        <Typography variant="h4" style={{ color: 'black', fontWeight: 500 }}>
          {`${profile?.firstName} ${profile?.lastName}`}
        </Typography>
      </TabPanel>
      <TabPanel value={value} index={1}>
        {dishes?.map((dish: IDish) => {
          return (
            <div>
              <MenuItem dish={dish} />
            </div>
          );
        })}
      </TabPanel>
    </div>
  );
};
