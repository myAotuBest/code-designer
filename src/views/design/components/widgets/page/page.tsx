import React from 'react';
import WidgetSchema from '@/interface/schema/widget/widget.schema';
import { DragDropContext, Draggable, Droppable } from 'react-beautiful-dnd';

import style from './index.less';

export interface PageWidgetProps {
  schema: WidgetSchema;
}

const grid = 8;

export default class PageWidget extends React.Component<PageWidgetProps, any> {
  constructor(props: PageWidgetProps) {
    super(props);
    this.state = {
      items: [],
    };
  }

  componentDidMount() {
    this.setState({
      items: this.getItems(10),
    });
  }

  getItems = (count) =>
    Array.from({ length: count }, (v, k) => k).map((k) => ({
      id: `item-${k}`,
      content: `item ${k}`,
    }));

  getItemStyle = (isDragging, draggableStyle) => ({
    // some basic styles to make the items look a bit nicer
    userSelect: 'none',
    padding: grid * 2,
    margin: `0 0 ${grid}px 0`,

    // change background colour if dragging
    background: isDragging ? 'lightgreen' : 'grey',

    // styles we need to apply on draggables
    ...draggableStyle,
  });

  getListStyle = (isDraggingOver) => ({
    background: isDraggingOver ? 'lightblue' : 'lightgrey',
    padding: grid,
    width: 250,
  });

  reorder(list, startIndex, endIndex) {
    const result = Array.from(list);
    const [removed] = result.splice(startIndex, 1);
    result.splice(endIndex, 0, removed);

    return result;
  }

  onDragEnd = (result: any) => {
    // dropped outside the list
    if (!result.destination) {
      return;
    }

    const items = this.reorder(
      this.state.items,
      result.source.index,
      result.destination.index
    );

    this.setState({
      items,
    });
  };

  renderDraggableItem = (item) => {
    return (provided, snapshot) => {
      console.log('style: ', provided.draggableProps.style.transform);
      return (
        <div
          ref={provided.innerRef}
          {...provided.draggableProps}
          {...provided.dragHandleProps}
          style={this.getItemStyle(
            snapshot.isDragging,
            provided.draggableProps.style
          )}
        >
          {item.content}
        </div>
      );
    };
  };

  renderDraggable = () => {
    const { items } = this.state;
    console.log('render draggable: ', items);
    return items.map((item, index) => {
      return (
        <Draggable draggableId={item.id} index={index} key={item.id}>
          {this.renderDraggableItem(item)}
          {/*{(provided, snapshot) => (*/}
          {/*  <div*/}
          {/*    ref={provided.innerRef}*/}
          {/*    {...provided.draggableProps}*/}
          {/*    {...provided.dragHandleProps}*/}
          {/*    style={this.getItemStyle(*/}
          {/*      snapshot.isDragging,*/}
          {/*      provided.draggableProps.style*/}
          {/*    )}*/}
          {/*  >*/}
          {/*    {item.content}*/}
          {/*  </div>*/}
          {/*)}*/}
        </Draggable>
      );
    });
  };

  renderDroppable = (provided, snapshot) => {
    console.log('render droppable');
    return (
      <div
        {...provided.droppableProps}
        ref={provided.innerRef}
        style={this.getListStyle(snapshot.isDraggingOver)}
      >
        {this.renderDraggable()}
        {provided.placeholder}
      </div>
    );
  };

  render() {
    const { schema } = this.props;
    const { items } = this.state;
    // console.log('render page: ', schema);
    console.log('items in line 91: ', items);
    // items 更新了之后，DND 没有重绘
    return (
      <>
        <DragDropContext onDragEnd={this.onDragEnd}>
          <Droppable droppableId={schema.id}>
            {(provided, snapshot) => this.renderDroppable(provided, snapshot)}
          </Droppable>
        </DragDropContext>
      </>
    );
  }
}
