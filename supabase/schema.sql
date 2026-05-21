-- K + T Activities Schema
-- Run this in the Supabase SQL Editor

create type activity_category as enum ('north_cali', 'south_cali', 'either');
create type activity_tag as enum (
  'food',
  'outdoors',
  'adventure',
  'travel',
  'coffee',
  'date_night',
  'event',
  'creative',
  'movie',
  'other'
);

create table if not exists activities (
  id uuid primary key default gen_random_uuid(),
  title text not null,
  notes text,
  location text,
  estimated_cost text,
  tag activity_tag not null default 'other',
  category activity_category not null,
  completed boolean not null default false,
  favorite boolean not null default false,
  created_at timestamptz not null default now(),
  completed_at timestamptz,
  updated_at timestamptz not null default now()
);

create index if not exists activities_category_idx on activities (category);
create index if not exists activities_completed_idx on activities (completed);
create index if not exists activities_created_at_idx on activities (created_at desc);

-- Auto-update updated_at
create or replace function update_updated_at()
returns trigger as $$
begin
  new.updated_at = now();
  return new;
end;
$$ language plpgsql;

create trigger activities_updated_at
  before update on activities
  for each row
  execute function update_updated_at();

-- Set completed_at when marking complete
create or replace function set_completed_at()
returns trigger as $$
begin
  if new.completed = true and (old.completed = false or old.completed is null) then
    new.completed_at = now();
  elsif new.completed = false then
    new.completed_at = null;
  end if;
  return new;
end;
$$ language plpgsql;

create trigger activities_completed_at
  before update on activities
  for each row
  execute function set_completed_at();

-- Row Level Security (open for personal couple use — tighten for production)
alter table activities enable row level security;

create policy "Allow public read" on activities
  for select using (true);

create policy "Allow public insert" on activities
  for insert with check (true);

create policy "Allow public update" on activities
  for update using (true);

create policy "Allow public delete" on activities
  for delete using (true);
