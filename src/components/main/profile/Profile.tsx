import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import client from '../../../utils/feathersConfig';
import profile1 from '../../../images/profile1.png';
import profile2 from '../../../images/profile2.png';
import profile3 from '../../../images/profile3.png';
import profile4 from '../../../images/profile4.png';
import { ProfileItems } from './Tabs';
import { IDish, IUser } from '../../../domain/Domain';

export const Profile = () => {
  const params: any = useParams();
  const [profile, setProfile] = useState<IUser | null>(null);
  const [dishes, setDishes] = useState<IDish[]>([]);
  useEffect(() => {
    client
      .service('users')
      .get(params.id)
      .then((res: IUser) => {
        setProfile(res);
      });
  }, [params.id]);

  useEffect(() => {
    client
      .service('dishes')
      .find({ query: { chef: params.id } })
      .then((res: any) => {
        setDishes(res.data);
      });
  }, [params.id]);

  return (
    <div
      style={{
        display: 'grid',
        gridTemplateRows: 'auto 60px 1fr',
        gridTemplateColumns: '1fr',
      }}
    >
      <div style={{ gridRow: '1 / 3', gridColumn: 1 }}>
        <div
          style={{
            width: '100%',
            height: '360px',
            margin: '0 auto',
            display: 'grid',
            gridGap: '1px',
            overflow: 'hidden',
            gridTemplateColumns: ' repeat(4, calc(100% / 4))',
          }}
        >
          <div
            style={{
              background: `url(${profile1}) center center / cover no-repeat`,
              height: '100%',
            }}
          />
          <div
            style={{
              background: `url(${profile2}) center center / cover no-repeat`,
              height: '100%',
            }}
          />
          <div
            style={{
              background: `url(${profile3}) center center / cover no-repeat`,
              height: '100%',
            }}
          />
          <div
            style={{
              background: `url(${profile4}) center center / cover no-repeat`,
              height: '100%',
            }}
          />
        </div>
      </div>
      <div
        style={{
          width: '58%',
          margin: 'auto',
          display: 'flex',
          gridRow: '2 / -1',
          maxWidth: '120rem',
          alignItems: 'flex-start',
          gridColumn: 1,
          justifyContent: 'space-between',
          backgroundColor: 'transparent',
        }}
      >
        <div
          style={{
            padding: '.5rem',
            flexGrow: 1,
            maxWidth: '600px',
            background: '#FFFFFF',
            borderRadius: '5px 5px 0 0',
          }}
        >
          <ProfileItems profile={profile} dishes={dishes} />
        </div>
      </div>
    </div>
  );
};
