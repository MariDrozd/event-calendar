'use client';

import {
  EventList,
  type EventListItem,
  fetchEvents,
} from '@/src/entities/event';
import { fetchDeleteEvent } from '@/src/entities/event/api/client';
import { TrashDropZone, trashDropZoneId } from '@/src/features/delete-event';
import { DndContext } from '@dnd-kit/core';
import { DragEndEvent } from '@dnd-kit/core';
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import { useMemo, useState } from 'react';

type StatusFilter = 'all' | 'active' | 'done';

export const AdminEventsPage = () => {
  const {
    data: events = [],
    isPending,
    isError,
    error,
  } = useQuery<EventListItem[], Error>({
    queryKey: ['events'],
    queryFn: fetchEvents,
  });

  const [search, setSearch] = useState<string>('');
  const [statusFilter, setStatusFilter] = useState<StatusFilter>('all');

  const qc = useQueryClient();

  const filteredEvents = useMemo(() => {
    const normalizedSearch = search.trim().toLocaleLowerCase();

    return events.filter((event) => {
      const matchesSearch =
        !normalizedSearch ||
        event.title.toLowerCase().includes(normalizedSearch);

      const matchesStatus =
        statusFilter === 'all' ||
        (statusFilter === 'active' && !event.isDone) ||
        (statusFilter === 'done' && event.isDone);

      return matchesSearch && matchesStatus;
    });
  }, [search, events, statusFilter]);

  const deleteEvent = useMutation({
    mutationFn: fetchDeleteEvent,
    onSuccess: () => {
      qc.invalidateQueries({
        queryKey: ['events'],
      });
    },
  });

  const handleDragEnd = (event: DragEndEvent) => {
    const { active, over } = event;

    if (!over) {
      return;
    }

    if (over.id !== trashDropZoneId) {
      return;
    }

    const start = active.data.current?.start;

    if (typeof start !== 'string') {
      return;
    }

    deleteEvent.mutate(start);
  };

  return (
    <section className="space-y-6">
      <header className="space-y-2">
        <h1 className="text-2xl font-semibold">Admin Events</h1>
      </header>
      <div className="flex flex-col gap-4">
        <label className="flex flex-col gap-2">
          <span>Search by title:</span>
          <input
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            type="text"
            placeholder="Search"
            className="rounded-b-md p-4"
          />
        </label>
        <label className="flex gap-2">
          <span>Status:</span>
          <select
            value={statusFilter}
            onChange={(e) => setStatusFilter(e.target.value as StatusFilter)}
          >
            <option value="all">All</option>
            <option value="active">Active</option>
            <option value="done">Done</option>
          </select>
        </label>
      </div>

      <DndContext onDragEnd={handleDragEnd}>
        <div>
          {isPending && <p>Loading events</p>}
          {isError && (
            <p className="text-red-600">
              Failed to load events: {error.message}
            </p>
          )}
          {!isPending && !isError && filteredEvents.length === 0 && (
            <p>Events not found</p>
          )}
          {!isPending && !isError && filteredEvents.length > 0 && (
            <EventList events={filteredEvents} />
          )}
          <TrashDropZone />
        </div>
      </DndContext>
    </section>
  );
};
