import React from 'react';
import { makeStyles, Theme, createStyles } from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';
import CardHeader from '@material-ui/core/CardHeader';
import CardMedia from '@material-ui/core/CardMedia';
import CardContent from '@material-ui/core/CardContent';
import Avatar from '@material-ui/core/Avatar';
import Typography from '@material-ui/core/Typography';
import { red } from '@material-ui/core/colors';
import { useHistory } from 'react-router';
import { IMenu } from '../../../domain/Domain';

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    root: {
      maxWidth: 345,
      boxShadow: '0 0 8px 2px rgb(29 29 29 / 25%)',
      transition:
        'box-shadow 200ms ease-in, transform 200ms ease-in, border 200ms linear',
      cursor: 'pointer',
      '&:hover': {
        border: 'transparent',
        transform: 'translateY(-5px)',
        boxShadow: '-2px 4px 18px 0 #c0c0c0',
      },
    },
    media: {
      height: 0,
      paddingTop: '56.25%', // 16:9
    },
    expand: {
      transform: 'rotate(0deg)',
      marginLeft: 'auto',
      transition: theme.transitions.create('transform', {
        duration: theme.transitions.duration.shortest,
      }),
    },
    expandOpen: {
      transform: 'rotate(180deg)',
    },
    avatar: {
      backgroundColor: red[500],
    },
  })
);

interface Iprops {
  menu: IMenu;
}

export default function RecipeReviewCard({ menu }: Iprops) {
  const classes = useStyles();
  const history = useHistory();
  return (
    <Card
      className={classes.root}
      onClick={() => history.push(`/menus/${menu._id}`)}
    >
      <CardHeader
        avatar={
          <Avatar
            aria-label="recipe"
            className={classes.avatar}
            src={menu?.chef?.photo}
          />
        }
        title={`${menu?.chef?.firstName} ${menu?.chef?.lastName}`}
        subheader={new Date(menu?.day).toLocaleDateString()}
      />
      <CardMedia
        className={classes.media}
        image={menu.cover}
        title="Paella dish"
      />
      <CardContent>
        <Typography variant="body2" color="textSecondary" component="p">
          {menu.description}
        </Typography>
      </CardContent>
    </Card>
  );
}
