import React from 'react';
import { Theme, createStyles, makeStyles } from '@material-ui/core/styles';
import Drawer from '@material-ui/core/Drawer';
import { Button, Divider, IconButton, Typography } from '@material-ui/core';
import { Delete } from '@material-ui/icons';
import emptyBagImage from '../../../images/emptyBag.png';
import { OrderUserInfo } from './OrderUserInfo';

const drawerWidth = 400;

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    root: {
      width: drawerWidth,
    },
    drawer: {
      width: drawerWidth,
      flexShrink: 0,
    },
    drawerPaper: {
      width: drawerWidth,
      top: 'auto',
      boxShadow: '0px 2px 14px #bcbcbc',
    },
    button: {
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
  })
);

export const OrderSummary = ({ items, clearItems, deleteItem }: any) => {
  const classes = useStyles();
  const [open, setOpen] = React.useState(false);

  const closeDialog = () => {
    setOpen(false);
  };

  const getOrderSum = () => {
    return items.reduce((acc: any, el: any) => {
      return (acc += el.dish.price * el.quantity);
    }, 0);
  };

  const submitOrder = () => {
    setOpen(true);
  };

  return (
    <div className={classes.root}>
      <Drawer
        className={classes.drawer}
        variant="permanent"
        classes={{
          paper: classes.drawerPaper,
        }}
        anchor="right"
      >
        {Boolean(items.length) ? (
          <div>
            <Typography
              style={{
                padding: '1rem 0',
                textAlign: 'center',
                fontWeight: 600,
                backgroundColor: '#F9F9F9',
              }}
              variant="body2"
            >
              Your order
            </Typography>
            {items.map((item: any) => {
              console.log(item);
              return (
                <React.Fragment>
                  <div
                    style={{
                      display: 'flex',
                      justifyContent: 'space-between',
                      padding: '0px 10px',
                      marginBottom: 10,
                    }}
                  >
                    <div style={{ display: 'flex' }}>
                      <img
                        style={{
                          width: '56px',
                          height: '56px',
                          marginRight: '1rem',
                        }}
                        src={item?.dish?.photo}
                        alt="img"
                      />
                      <div style={{ display: 'flex', flexDirection: 'column' }}>
                        <Typography
                          style={{ color: '#fa8a4a', fontWeight: 600 }}
                        >
                          {item?.dish?.name}
                        </Typography>
                        <Typography>{item?.quantity}x</Typography>
                      </div>
                    </div>
                    <div style={{ display: 'flex', alignItems: 'center' }}>
                      <IconButton onClick={() => deleteItem(item.dish._id)}>
                        <Delete />
                      </IconButton>
                      <Typography> {item?.dish?.price} DT </Typography>
                    </div>
                  </div>
                  <Divider style={{ marginBottom: 5 }} />
                </React.Fragment>
              );
            })}
            <div>
              <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                <Typography>ITEMS SUBTOTAL:</Typography>
                <Typography>{getOrderSum()} DT</Typography>
              </div>
              <Button
                onClick={submitOrder}
                fullWidth
                className={classes.button}
              >
                Submit order
              </Button>
            </div>{' '}
          </div>
        ) : (
          <div
            style={{
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
            }}
          >
            <Typography
              gutterBottom
              style={{ paddingTop: 20, color: '#AEAEAE' }}
            >
              Your bag is empty, add a dish
            </Typography>
            <img
              style={{ width: 100, height: 103 }}
              src={emptyBagImage}
              alt="empty Bag"
            />
          </div>
        )}
        <OrderUserInfo
          open={open}
          close={closeDialog}
          clearItems={clearItems}
        />
      </Drawer>
    </div>
  );
};
