'use client';

import { type EventTask } from '@/src/entities/event';
import {
  fetchAdminEvents,
  fetchDeleteEvent,
} from '@/src/entities/event/api/client';
import { TrashDropZone, trashDropZoneId } from '@/src/features/delete-event';
import { DndContext } from '@dnd-kit/core';
import { DragEndEvent } from '@dnd-kit/core';
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import { useMemo, useState } from 'react';
import { AdminEventsList } from './AdminEventsList';
import { CreateEvent } from '@/src/features/create-event';
import { AdminEventsFilters } from './AdminEventsFilters';

export type StatusFilter = 'all' | 'active' | 'done';

export const AdminEventsPage = () => {
  const {
    data: events = [],
    isPending,
    isError,
    error,
  } = useQuery<EventTask[], Error>({
    queryKey: ['admin-events'],
    queryFn: fetchAdminEvents,
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
        queryKey: ['admin-events'],
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
    <section className="mx-auto max-w-6xl space-y-6">
      <h1 className="text-2xl font-semibold">Admin Events</h1>

      <AdminEventsFilters
        search={search}
        statusFilter={statusFilter}
        onSearchChange={setSearch}
        onStatusFilterChange={setStatusFilter}
      />

      <CreateEvent />
      <DndContext onDragEnd={handleDragEnd}>
        <div className="flex flex-col gap-10">
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
            <AdminEventsList events={filteredEvents} />
          )}
          <div className="fixed right-8 bottom-8 z-50">
            <TrashDropZone />
          </div>
        </div>
      </DndContext>
    </section>
  );
};
