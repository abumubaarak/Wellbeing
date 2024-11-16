import React from 'react';
import {Delivered, Pending, Read, Sent} from '../../assets/svgs';

type DeliveryStatusProps = {
  status: string;
};
export const DeliveryStatus = ({status}: DeliveryStatusProps) => {
  return (
    <>
      {status === 'pending' ? (
        <Pending />
      ) : status === 'sent' ? (
        <Sent />
      ) : status === 'delivered' ? (
        <Delivered />
      ) : status === 'read' ? (
        <Read />
      ) : (
        <></>
      )}
    </>
  );
};
