create table if not exists support_requests (
  id serial primary key,
  request_id text unique not null,
  created_at timestamp default now(),
  updated_at timestamp default now(),
  preferred_language text not null,
  applicant_category text not null,
  host_institution text not null,
  host_department text,
  host_contact text,
  full_name text not null,
  email text not null,
  current_country text,
  nationality text,
  planned_arrival_date date,
  planned_departure_date date,
  family_members integer,
  requested_services text not null,
  message text,
  consent boolean not null default false,
  status text not null default 'New',
  assigned_staff text,
  internal_memo text
);
create index if not exists idx_support_requests_status on support_requests(status);
create index if not exists idx_support_requests_arrival on support_requests(planned_arrival_date);
