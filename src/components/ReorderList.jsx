import { DndContext, closestCenter } from '@dnd-kit/core'
import {
  arrayMove,
  SortableContext,
  verticalListSortingStrategy
} from '@dnd-kit/sortable'
import { useEffect, useState } from 'react'
import TrackItemSortable from './TrackItemSortable'

// export function Item (props) {
//   const [activeItem, setActiveItem] = useState(false)

//   const { attributes, listeners, setNodeRef, transform, transition } =
//     useSortable({ id: props.item })

//   const style = {
//     transform: CSS.Transform.toString(transform),
//     transition
//   }

//   useEffect(() => {
//     setActiveItem(props.item === props.track)
//   }, [props.track])

//   return (
//     <li ref={setNodeRef} style={style} className={`item-father ${activeItem ? 'active' : ''}`} {...attributes}>
//       <div {...listeners} className='item'>
//         <img src={props.item.image} alt={props.item.title} className={`${activeItem ? 'track_image sm rotate' : 'track_image_borderless'}`} />
//         <p>{`${props.item.title}`}</p>
//       </div>
//       <button
//         className='button'
//         onClick={() => {
//           props.handleSelectTrack(props.item)
//         }}
//         data-no-dnd='true'
//       >
//         play
//       </button>
//     </li>
//   )
// }

export default function ReorderList ({
  items: initialItems,
  onReorder
}) {
  const [items, setItems] = useState([])

  const handleDragEnd = (event) => {
    const { active, over } = event

    console.log(active.id, over.id)

    if (active.id !== over.id) {
      setItems((items) => {
        const oldIndex = items.findIndex(
          (item) => item.id === active.id
        )
        const newIndex = items.findIndex((item) => item.id === over.id)
        const newItems = arrayMove(items, oldIndex, newIndex)
        return newItems
      })
    }
    onReorder(items)
  }

  useEffect(() => {
    setItems(initialItems)
  }, [initialItems])

  return (
    <DndContext collisionDetection={closestCenter} onDragEnd={handleDragEnd}>
      <ul className='favorite_list'>
        <SortableContext items={items} strategy={verticalListSortingStrategy}>
          {items.map((item) => (
            <TrackItemSortable
              key={item.id}
              item={item}
              track={item}
              isFavorite
              rounded
            />
          )
          )}
        </SortableContext>
      </ul>
    </DndContext>
  )
}
