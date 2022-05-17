import {
  CircularProgress,
  createStyles,
  makeStyles,
  Theme,
} from '@material-ui/core';
import React, { ReactElement, useEffect, useState } from 'react';
import client from '../../../utils/feathersConfig';
import CardView from './Card';
import { SearchSection } from './SearchSection';
import { IMenu } from '../../../domain/Domain';

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    root: {
      width: '100%',
      margin: '0 auto 3rem auto',
      display: 'grid',
      padding: 0,
      gridGap: '2em',
      maxWidth: '1128px',
      paddingBottom: 'calc(5rem + env(safe-area-inset-bottom))',
      listStyleType: 'none',
      gridTemplateColumns: 'repeat(auto-fill, minmax(300px, 1fr))',
    },
    listItem: {
      width: '100%',
      margin: '0 auto',
      maxWidth: '376px',
    },
  })
);

export const Menus = (): ReactElement => {
  const [menus, setMenus] = useState<IMenu[]>([]);
  const classes = useStyles();

  useEffect(() => {
    client
      .service('menus')
      .find({ query: { $limit: -1, $populate: ['dishes', 'chef'] } })
      .then((res: IMenu[]) => {
        setMenus(res);
      });
  }, []);

  return (
    <div>
      <SearchSection />
      {menus.length ? (
        <div>
          <div style={{ margin: '1.5rem', display: 'flex' }}>
            <ol className={classes.root}>
              {menus.map((menu: IMenu) => (
                <li key={menu._id} className={classes.listItem}>
                  <CardView menu={menu} key={menu._id} />
                </li>
              ))}
            </ol>
          </div>
        </div>
      ) : (
        <CircularProgress style={{ margin: 'auto' }} />
      )}
    </div>
  );
};
