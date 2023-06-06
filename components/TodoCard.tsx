'use client';
import {
  DraggableProvidedDragHandleProps,
  DraggableProvidedDraggableProps,
} from 'react-beautiful-dnd';
import { useBoardStore } from '@/stores/BoardStore';
import { XCircleIcon } from '@heroicons/react/24/solid';
import { useEffect, useState } from 'react';
import getUrl from '@/lib/getUrl';
import Image from 'next/image';

type Props = {
  id: TypedColumn;
  index: number;
  todo: Todo;
  innerRef: (element: HTMLElement | null) => void;
  draggableProps: DraggableProvidedDraggableProps;
  dragHandleProps: DraggableProvidedDragHandleProps | undefined | null;
};

export default function TodoCard({
  id,
  index,
  todo,
  innerRef,
  draggableProps,
  dragHandleProps,
}: Props) {
  const deleteTodo = useBoardStore((state) => state.deleteTodo);
  const [imageUrl, setImageUrl] = useState<string | null>(null);

  useEffect(() => {
    const fetchImage = async () => {
      const url = await getUrl(todo.image!);
      if (url) {
        setImageUrl(url.toString());
      }
    };

    fetchImage();
  }, [todo]);

  return (
    <div
      className="space-y-2 rounded-md bg-white drop-shadow-md"
      {...draggableProps}
      {...dragHandleProps}
      ref={innerRef}
    >
      <div className="flex items-center justify-between p-5">
        <p>{todo.title}</p>
        <button
          onClick={() => deleteTodo(index, todo, id)}
          className="text-red-500 hover:text-red-600"
        >
          <XCircleIcon className="ml-5 h-8 w-8" />
        </button>
      </div>

      {imageUrl && (
        <div className="relative h-full w-full rounded-b-md">
          <Image
            src={imageUrl}
            alt="Todo Image"
            width={400}
            height={200}
            className="w-full rounded-b-md object-contain"
          />
        </div>
      )}
    </div>
  );
}
