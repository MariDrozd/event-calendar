'use client';

import { eventQueryKeys, type EventTask } from '@/src/entities/event';
import {
  fetchAdminEvents,
  fetchDeleteEvent,
} from '@/src/entities/event/api/client';
import {
  getDeleteErrorMessage,
  TrashDropZone,
  trashDropZoneId,
} from '@/src/features/delete-event';
import { DndContext } from '@dnd-kit/core';
import { DragEndEvent } from '@dnd-kit/core';
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import { useEffect, useMemo, useState } from 'react';
import { AdminEventsList } from './AdminEventsList';
import { CreateEvent } from '@/src/features/create-event';
import { AdminEventsFilters } from './AdminEventsFilters';
import { Notice } from '@/src/shared/ui/notice';
import { useRouter } from 'next/navigation';
import { toast } from 'sonner';
import { getAdminAccessErrorAction } from '@/src/shared/lib/error-actions/access-error-actions';
import { DEFAULT_ERROR_NOTICE } from '@/src/shared/config/error-notice';

export type StatusFilter = 'all' | 'active' | 'done';

export const AdminEventsPage = () => {
  const {
    data: events = [],
    isPending,
    isError,
    error,
  } = useQuery<EventTask[], Error>({
    queryKey: eventQueryKeys.adminList,
    queryFn: fetchAdminEvents,
  });

  const [search, setSearch] = useState<string>('');
  const [statusFilter, setStatusFilter] = useState<StatusFilter>('all');

  const qc = useQueryClient();

  const router = useRouter();

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

  const deleteEventMutation = useMutation({
    mutationFn: fetchDeleteEvent,
    onSuccess: () => {
      qc.invalidateQueries({
        queryKey: eventQueryKeys.adminList,
      });

      toast.success('Event deleted.');
    },

    onError: (error) => {
      const errorAction = getAdminAccessErrorAction(error);

      if (errorAction.type === 'redirect') {
        toast.error(errorAction.message);
        router.replace(errorAction.href);
        return;
      }

      const deleteErrorNotice = getDeleteErrorMessage(error);
      toast.error(deleteErrorNotice.message);
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

    deleteEventMutation.mutate(start);
  };

  const errorAction = useMemo(() => {
    return isError ? getAdminAccessErrorAction(error) : null;
  }, [isError, error]);

  useEffect(() => {
    if (errorAction?.type === 'redirect') {
      toast.error(errorAction.message);
      router.replace(errorAction.href);
    }
  }, [errorAction, router]);

  const isSuccessQuery = !isPending && !isError;
  const hasEvents = events.length > 0;
  const hasFilteredEvents = filteredEvents.length > 0;

  const isEmptyResult = isSuccessQuery && !hasEvents;
  const isEmptyFilterResult = isSuccessQuery && hasEvents && !hasFilteredEvents;
  const isSuccessResult = isSuccessQuery && hasFilteredEvents;

  return (
    <section className="mx-auto max-w-6xl space-y-6">
      <h1 className="text-2xl font-semibold">Admin Events</h1>
      <div className="flex flex-col gap-10">
        {isPending && <p>Loading events...</p>}

        {isError && errorAction?.type === 'none' && (
          <Notice variant="error" message={DEFAULT_ERROR_NOTICE.message} />
        )}

        {isSuccessQuery && (
          <>
            <AdminEventsFilters
              search={search}
              statusFilter={statusFilter}
              onSearchChange={setSearch}
              onStatusFilterChange={setStatusFilter}
            />

            <CreateEvent />

            <DndContext onDragEnd={handleDragEnd}>
              {isEmptyResult && (
                <Notice
                  variant="info"
                  message="No events have been created yet."
                />
              )}

              {isEmptyFilterResult && (
                <Notice
                  variant="info"
                  message="No events match your filters."
                />
              )}

              {isSuccessResult && <AdminEventsList events={filteredEvents} />}
              {hasEvents && (
                // TODO: make TrashDropZone responsive
                <div className="fixed right-8 bottom-8 z-50 hidden min-[1400px]:block">
                  <TrashDropZone />
                </div>
              )}
            </DndContext>
          </>
        )}
      </div>
    </section>
  );
};
