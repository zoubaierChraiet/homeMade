import React from 'react';
import {
  Button,
  Dialog,
  Divider,
  IconButton,
  makeStyles,
  Typography,
  useMediaQuery,
  useTheme,
} from '@material-ui/core';
import { Add, Remove } from '@material-ui/icons';
import { IDish, IMenu } from '../../../domain/Domain';

interface Iprops {
  open: boolean;
  closeDialog: () => void;
  dish: IDish;
  menu?: IMenu;
  addToCart: (
    dish: IDish,
    menu: IMenu | undefined,
    quantity: number
  ) => void | undefined;
}

const useStyles = makeStyles({
  root: {},
  header: {
    position: 'relative',
  },
  namePrice: {
    left: '4px',
    bottom: '10px',
    padding: '12px',
    zIndex: 10,
    overflow: 'hidden',
    position: 'absolute',
    maxWidth: '97%',
    maxHeight: '80%',
    fontFamily: 'CustomFourBold',
    borderRadius: '4px',
    backgroundColor: 'hsla(0,0%,100%,.75)',
  },
  content: {
    padding: '20px',
    overflow: 'hidden',
  },
  description: {
    color: 'grey',
    whiteSpace: 'pre-wrap',
  },
  addSection: {
    display: 'flex',
    padding: '16px 20px',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  addToBag: {
    background: '#fa8a4a',
    color: 'white',
    '& .MuiButton-label': {
      fontWeight: 600,
    },
    '&:hover': {
      background: '#fa8a4a',
    },
    borderRadius: '2px',
  },
});

export const AddToCard = ({
  open,
  closeDialog,
  dish,
  addToCart,
  menu,
}: Iprops) => {
  const theme = useTheme();
  const fullScreen = useMediaQuery(theme.breakpoints.down('xs'));
  const classes = useStyles();

  const [quantity, setQuantity] = React.useState(0);

  return (
    <Dialog
      fullScreen={fullScreen}
      open={open}
      onClose={closeDialog}
      className={classes.root}
    >
      <div className={classes.header}>
        <img
          alt="dish"
          src={dish.photo}
          style={{ maxHeight: 250, width: '100%' }}
        />
        <div className={classes.namePrice}>
          <Typography variant="h4">{dish?.name}</Typography>
          <Typography variant="h5">{dish?.price}</Typography>
        </div>
      </div>
      <div className={classes.content}>
        <Typography variant="body1" className={classes.description}>
          {dish?.description}
        </Typography>
      </div>
      <Divider />
      <section className={classes.addSection}>
        <div>
          <IconButton onClick={() => setQuantity(quantity + 1)}>
            <Add />
          </IconButton>
          {quantity}
          <IconButton onClick={() => setQuantity(quantity - 1)}>
            <Remove />
          </IconButton>
        </div>
        <Button
          className={classes.addToBag}
          variant="contained"
          onClick={() => addToCart(dish, menu, quantity)}
        >
          Add to bag
        </Button>
      </section>
    </Dialog>
  );
};
