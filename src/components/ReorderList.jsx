import { DndContext, closestCenter } from '@dnd-kit/core'
import {
  arrayMove,
  SortableContext,
  verticalListSortingStrategy
} from '@dnd-kit/sortable'
import { useEffect, useState } from 'react'
import TrackItemSortable from './TrackItemSortable'

export default function ReorderList ({
  initialItems,
  handleSorter
}) {
  const [items, setItems] = useState([])

  const handleDragEnd = (event) => {
    const { active, over } = event

    if (active.id !== over.id) {
      setItems((items) => {
        const oldIndex = items.findIndex(
          (item) => item.id === active.id
        )
        const newIndex = items.findIndex((item) => item.id === over.id)
        const newItems = arrayMove(items, oldIndex, newIndex)

        const newItemsWithIndexInSort = newItems.map((item, index) => {
          return {
            ...item,
            sort: index
          }
        })

        handleSorter(newItemsWithIndexInSort)

        return newItemsWithIndexInSort
      })
    }
  }

  useEffect(() => {
    if (initialItems) {
      setItems(initialItems)
    }
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
