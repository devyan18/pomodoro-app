import { DndContext, closestCenter } from '@dnd-kit/core'
import {
  arrayMove,
  SortableContext,
  verticalListSortingStrategy,
  useSortable
} from '@dnd-kit/sortable'
import { useEffect, useState } from 'react'
import { CSS } from '@dnd-kit/utilities'

export function Item (props) {
  const [activeItem, setActiveItem] = useState(false)

  const { attributes, listeners, setNodeRef, transform, transition } =
    useSortable({ id: props.item })

  const style = {
    transform: CSS.Transform.toString(transform),
    transition
  }

  useEffect(() => {
    setActiveItem(props.item === props.track)
  }, [props.track])

  return (
    <li ref={setNodeRef} style={style} className={`item-father ${activeItem ? 'active' : ''}`} {...attributes}>
      <div {...listeners} className='item'>
        <img src={props.item.image} alt={props.item.title} className={`${activeItem ? 'track_image sm rotate' : 'track_image_borderless'}`} />
        <p>{`${props.item.title}`}</p>
      </div>
      <button
        className='button'
        onClick={() => {
          props.handleSelectTrack(props.item)
        }}
        data-no-dnd='true'
      >
        play
      </button>
    </li>
  )
}

export default function ReorderList ({
  handleSelectTrack,
  tracks,
  handleChangeTracks,
  track
}) {
  const [items, setItems] = useState(tracks)

  const handleDragEnd = (event) => {
    const { active, over } = event

    if (active.id.sort !== over.id.sort) {
      setItems((items) => {
        const oldIndex = items.findIndex(
          (item) => item.sort === active.id.sort
        )
        const newIndex = items.findIndex((item) => item.sort === over.id.sort)
        const newItems = arrayMove(items, oldIndex, newIndex)
        return newItems
      })
    }
  }

  return (
    <DndContext collisionDetection={closestCenter} onDragEnd={handleDragEnd}>
      <button
        className='button'
        onClick={() => {
          handleChangeTracks(items)
        }}
      >
        Save
      </button>
      <ul className='track_list'>
        <SortableContext items={items} strategy={verticalListSortingStrategy}>
          {items.map((item) => (
            <Item
              key={item.sort}
              item={item}
              sort={item.sort}
              handleSelectTrack={handleSelectTrack}
              track={track}
            />
          ))}
        </SortableContext>
      </ul>
    </DndContext>
  )
}
