import React, {useEffect, useState} from 'react';
import {Pressable} from 'react-native';
import {Box} from '..';
import {Chip} from './Chip';

type ChipListProps = {
  availableTime: any;
  onTimeSelected: (activeItem: any) => void;
};
export const ChipList = ({availableTime, onTimeSelected}: ChipListProps) => {
  const [active, setActive] = useState<boolean>(false);
  const [activeItem, setActiveItem] = useState<any[]>([]);
  const onPress = (index: any, item: any) => {
    if (active) {
      setActiveItem([]);
    } else {
      setActiveItem([item]);
    }
    setActive(!active);
  };

  useEffect(() => {
    if (active) {
      onTimeSelected(activeItem);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [active]);

  return (
    <Box gap="m" mt="n" flexDirection="row" flexWrap="wrap">
      {availableTime.map((item: any, index: React.Key | null | undefined) => (
        <Pressable key={index} onPress={() => onPress(index, item)}>
          <Chip
            item={item}
            active={active && activeItem[0].index === item.index}
          />
        </Pressable>
      ))}
    </Box>
  );
};
