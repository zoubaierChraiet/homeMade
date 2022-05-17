import React from 'react';
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogTitle from '@material-ui/core/DialogTitle';
import { MenuItem, Select } from '@material-ui/core';
import client from '../../../utils/feathersConfig';

const items = JSON.parse(String(localStorage.getItem('cart')));

interface Iprops {
  open: boolean;
  close: () => void;
  clearItems: () => void;
}

export const OrderUserInfo = ({ open, close, clearItems }: Iprops) => {
  const [order, setOrder] = React.useState<any>({
    deliveryAdress: '',
    deliveryPhone: '',
    deliveryName: '',
    payments: '',
  });
  const handleClose = () => {
    close();
  };

  const onInputsChange = (e: any) => {
    if (e.target.name) {
      setOrder({ ...order, [e.target.name]: e.target.value });
    } else {
      setOrder({ ...order, [e.target.id]: e.target.value });
    }
  };

  const getOrderSum = () => {
    return items.reduce((acc: any, el: any) => {
      return (acc += el.dish.price * el.quantity);
    }, 0);
  };

  const onSignUp = () => {
    const orderItems = items.map((item: any) => {
      return {
        dish: item.dish._id,
        menu: item.menu._id,
        quantity: item.quantity,
        totalPriceInclTax: item.quantity * item.dish.price,
      };
    });
    const orderWithUserInfo = {
      ...order,
      items: orderItems,
      valid: false,
      totalPriceInclTax: getOrderSum(),
    };
    console.log(orderWithUserInfo);
    client
      .service('orders')
      .create(orderWithUserInfo)
      .then(() => {
        localStorage.removeItem('cart');
        clearItems();
        close();
      });
  };

  return (
    <div>
      <Dialog
        open={open}
        onClose={handleClose}
        aria-labelledby="form-dialog-title"
      >
        <DialogTitle id="form-dialog-title">
          Please submit your info to confirm order
        </DialogTitle>
        <DialogContent>
          <TextField
            value={order.deliveryAdress}
            autoFocus
            margin="dense"
            onChange={onInputsChange}
            id="deliveryAdress"
            variant="outlined"
            label="Delivery Adress"
            type="text"
            fullWidth
          />
          <TextField
            margin="dense"
            onChange={onInputsChange}
            value={order.deliveryPhone}
            id="deliveryPhone"
            label="Delivery phone"
            variant="outlined"
            type="number"
            fullWidth
          />
          <TextField
            margin="dense"
            onChange={onInputsChange}
            value={order.deliveryName}
            name="deliveryName"
            id="deliveryName"
            label="Delivery name"
            variant="outlined"
            type="text"
            fullWidth
          />
          <Select
            labelId="payments"
            label="Payment type"
            variant="outlined"
            id="payments"
            name="payments"
            fullWidth
            margin="dense"
            onChange={onInputsChange}
            value={order.payments}
          >
            <MenuItem value={'cash'}>Cash</MenuItem>
            <MenuItem value={'paypal'}>Paypal</MenuItem>
          </Select>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose} color="primary">
            Cancel
          </Button>
          <Button onClick={onSignUp} color="primary">
            Confirm delivery
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  );
};
