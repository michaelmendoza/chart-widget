import React, {useEffect, useState} from 'react';
import {SortableContainer, SortableElement} from 'react-sortable-hoc';
import arrayMove from 'array-move';
import { ChartViewItem } from './ChartViewItem';

const SortableItem = SortableElement(({value, index} : any) => {
  return <ChartViewItem item={value} index={index}></ChartViewItem>
});

const SortableContext = SortableContainer(({children} : any) => {
  return <ul>{children}</ul>;
});

const SortableView = (props : any) => {
  const defaultState : any[] = props.items;
  const [items, setItems] = useState(defaultState);

  useEffect(()=>{
    setItems(props.items);
  },[props.items])

  const onSortEnd = ({oldIndex, newIndex} : any) => {
    setItems((items)=>{
      const updatedCharts = arrayMove(items, oldIndex, newIndex);
      props.update(updatedCharts);
      return updatedCharts;
    });
  };

  return (
      <SortableContext onSortEnd={onSortEnd} pressDelay={100}>
        {items.map((value, index) => (
          <SortableItem key={`item-${value.id}`} index={index} value={value} />
        ))}
      </SortableContext>
  );
  
}

export default SortableView;