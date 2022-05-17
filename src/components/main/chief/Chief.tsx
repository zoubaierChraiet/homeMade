import React, { useEffect, useState } from 'react';
import { Theme, createStyles, makeStyles } from '@material-ui/core/styles';
import { OrderSummary } from './Order';
import img from '../../../images/chiefHeader.png';
import { MenuItem } from './MenuItem';
import { useHistory, useParams } from 'react-router-dom';
import client from '../../../utils/feathersConfig';
import { Avatar, Button, Typography } from '@material-ui/core';
import { IDish, IMenu } from '../../../domain/Domain';

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    root: {
      display: 'flex',
      justifyContent: 'space-between',
    },
    content: {
      display: 'flex',
      flexDirection: 'column',
      flexGrow: 1,
    },
    menus: {
      width: '75%',
      margin: '0 auto',
      padding: '0rem 2rem',
      maxWidth: '844px',
    },
    menusList: {
      display: 'grid',
      gridGap: '2rem',
      gridAutoColumns: 'auto',
      gridTemplateColumns: 'repeat(auto-fill, minmax(300px, 1fr))',
    },
    overImage: {
      top: 0,
      left: 0,
      right: 0,
      bottom: 0,
      position: 'absolute',
      background: 'rgba(0,0,0,.59)',
    },
    header: {
      backgroundImage: `url(${img})`,
      backgroundSize: 'cover',
      height: 350,
      width: '100%',
      position: 'relative',
    },
    buttons: {
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

export const Chief = () => {
  const classes = useStyles();
  const params: any = useParams();
  const history = useHistory();
  const [dishes, setDishes] = useState([]);
  const [menu, setMenu] = useState<any>({});
  const [items, setItems] = React.useState(() => {
    if (localStorage.getItem('cart')) {
      return JSON.parse(String(localStorage.getItem('cart')));
    } else {
      return [];
    }
  });

  const clearItems = () => {
    setItems([]);
  };

  const deleteItem = (dishId: string) => {
    const cartContent: [any] = JSON.parse(String(localStorage.getItem('cart')));
    cartContent.splice(
      cartContent.findIndex((x: any) => x.dish._id === dishId),
      1
    );
    localStorage.setItem('cart', JSON.stringify(cartContent));
    setItems(cartContent);
  };

  const addToCart = (dish: IDish, menu: IMenu, quantity: number) => {
    const cart = localStorage.getItem('cart');
    if (!cart) {
      localStorage.setItem(
        'cart',
        JSON.stringify([{ dish: dish, menu: menu, quantity }])
      );
      setItems([...items, { dish: dish, menu: menu, quantity }]);
    } else {
      const cartContent: [any] = JSON.parse(
        String(localStorage.getItem('cart'))
      );
      const existingItem = cartContent.find(
        (cart: any) => cart.dish._id === dish._id
      );
      if (existingItem) {
        cartContent[
          cartContent.findIndex((x: any) => x.dish._id === dish._id)
        ] = {
          dish: dish,
          menu: menu,
          quantity: existingItem.quantity + quantity,
        };
        localStorage.setItem('cart', JSON.stringify(cartContent));
        setItems(cartContent);
      } else {
        localStorage.setItem(
          'cart',
          JSON.stringify([...cartContent, { dish: dish, menu: menu, quantity }])
        );
        setItems([...cartContent, { dish: dish, menu: menu, quantity }]);
      }
    }
  };

  useEffect(() => {
    client
      .service('menus')
      .find({ query: { _id: params.id, $populate: ['dishes', 'chef'] } })
      .then((res: any) => {
        setDishes(res.data[0].dishes);
        setMenu(res.data[0]);
      });
  }, [params.id]);

  return (
    <div className={classes.root}>
      <div className={classes.content}>
        <div className={classes.header}>
          <div className={classes.overImage}></div>
          <div
            style={{
              width: '100%',
              height: '100%',
              margin: '0 auto',
              display: 'flex',
              padding: '23px 2rem 0',
              position: 'relative',
              maxWidth: '844px',
              justifyContent: 'space-between',
            }}
          >
            <div
              style={{
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
              }}
            >
              <div style={{ cursor: 'pointer', marginTop: '1rem' }}>
                <Avatar
                  style={{
                    width: '10rem',
                    height: '10rem',
                    borderColor: '#FFFFFF',
                    borderStyle: 'solid',
                    borderWidth: '2px',
                  }}
                  src={menu?.chef?.photo}
                />
                <div
                  style={{
                    display: 'flex',
                    alignItems: 'center',
                    flexDirection: 'column',
                    marginTop: 5,
                  }}
                >
                  <Typography
                    variant="body2"
                    style={{ color: '#FFFFFF', fontWeight: 500 }}
                  >
                    {`${menu?.chef?.firstName} ${menu?.chef?.lastName}`}
                  </Typography>
                </div>
              </div>
              <div
                style={{
                  width: '100%',
                  display: 'flex',
                  maxWidth: '100px',
                  marginTop: '0.5rem',
                  flexDirection: 'column',
                  justifyContent: 'space-between',
                }}
              >
                <Button
                  className={classes.buttons}
                  variant="contained"
                  onClick={() => history.push(`/profile/${menu?.chef?._id}`)}
                >
                  Profile
                </Button>
              </div>
            </div>
          </div>
        </div>
        <div className={classes.menus}>
          <h4>Place Your Order</h4>
          <div className={classes.menusList}>
            {dishes?.map((dish: IDish) => {
              return (
                <MenuItem
                  addToCart={addToCart}
                  key={dish._id}
                  dish={dish}
                  menu={menu}
                />
              );
            })}
          </div>
        </div>
      </div>
      <OrderSummary
        deleteItem={deleteItem}
        clearItems={clearItems}
        items={items}
      />
    </div>
  );
};
