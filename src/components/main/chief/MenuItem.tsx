import React from 'react';
import { Theme, createStyles, makeStyles } from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import CardMedia from '@material-ui/core/CardMedia';
import Typography from '@material-ui/core/Typography';
import { AddToCard } from './AddToCard';
import { IDish, IMenu } from '../../../domain/Domain';

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    root: {
      display: 'flex',
      borderRadius: 0,
      boxShadow: '0 2px 9px 0 rgb(22 22 22 / 34%)',
      cursor: 'pointer',
      transition:
        'box-shadow 200ms ease-in, transform 200ms ease-in, border 200ms linear',
      '&:hover': {
        border: 'transparent',
        transform: 'translateY(-5px)',
        boxShadow: '-2px 4px 18px 0 #c0c0c0',
      },
      '& .MuiPaper-rounded': {
        borderRadius: 0,
      },
    },
    details: {
      display: 'flex',
      flexDirection: 'column',
      width: '70%',
    },
    content: {
      flex: '1 0 auto',
    },
    cover: {
      width: '30%',
    },
    controls: {
      display: 'flex',
      alignItems: 'center',
      paddingLeft: theme.spacing(2),
      paddingBottom: theme.spacing(1),
    },
    playIcon: {
      height: 38,
      width: 38,
    },
  })
);

interface IProps {
  dish: IDish;
  addToCart?: any;
  menu?: IMenu;
}

export const MenuItem = ({ dish, addToCart, menu }: IProps) => {
  const classes = useStyles();
  const [open, setOpen] = React.useState(false);

  const closeDialog = () => {
    setOpen(false);
  };

  const openDialog = () => {
    setOpen(true);
  };

  console.log(dish);

  return (
    <>
      <Card className={classes.root} onClick={openDialog}>
        <div className={classes.details}>
          <CardContent className={classes.content}>
            <Typography component="h5" variant="h5">
              {dish?.name}
            </Typography>
            <Typography variant="subtitle1" color="textSecondary">
              {dish?.description}
            </Typography>
          </CardContent>
          <div className={classes.controls}>{dish?.price}</div>
        </div>
        <CardMedia
          className={classes.cover}
          image={dish.photo}
          title="Live from space album cover"
        />
      </Card>
      <AddToCard
        open={open}
        closeDialog={closeDialog}
        dish={dish}
        addToCart={addToCart}
        menu={menu}
      />
    </>
  );
};
