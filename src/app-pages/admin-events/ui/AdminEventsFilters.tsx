import { Input } from '@/src/shared/ui/input';
import { FormField } from '@/src/shared/ui/form-field';
import { StatusFilter } from './AdminEventsPage';

type AdminEventsFilterProps = {
  search: string;
  statusFilter: StatusFilter;
  onSearchChange: (value: string) => void;
  onStatusFilterChange: (value: StatusFilter) => void;
};

export const AdminEventsFilters = (props: AdminEventsFilterProps) => {
  const { search, statusFilter, onSearchChange, onStatusFilterChange } = props;

  return (
    <div
      className="
        rounded-xl border border-slate-200
        bg-white
        p-4
        shadow-sm
      "
    >
      <div className="grid gap-4 md:grid-cols-[1fr_220px]">
        <FormField label="Search by title: ">
          <Input
            value={search}
            onChange={(e) => onSearchChange(e.target.value)}
            type="text"
            placeholder="Search"
          />
        </FormField>
        <FormField label="Status: ">
          <select
            value={statusFilter}
            onChange={(e) =>
              onStatusFilterChange(e.target.value as StatusFilter)
            }
            className="
            w-full
            rounded-md border border-slate-300 outline-none
            bg-white 
            px-3 py-2
            text-sm  
            transition 
            focus:border-indigo-500 focus:ring-2 focus:ring-indigo-100
          "
          >
            <option value="all">All</option>
            <option value="active">Active</option>
            <option value="done">Done</option>
          </select>
        </FormField>
      </div>
    </div>
  );
};
